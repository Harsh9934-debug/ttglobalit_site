// Parses public/*.html for [data-cms] elements and seeds MongoDB with their
// current values. Only inserts fields that don't already exist in the DB so
// re-running this after admin edits never clobbers saved changes.
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env.local'), quiet: true })

const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'ttglobalit'

const VALID_FIELDS = new Set(['text', 'html', 'src', 'href', 'alt'])

function extractValue($, el, fieldType) {
  const $el = $(el)
  if (fieldType === 'src' || fieldType === 'href' || fieldType === 'alt') {
    return ($el.attr(fieldType) || '').trim()
  }
  if (fieldType === 'html') {
    return ($el.html() || '').trim()
  }
  return $el.text().trim()
}

async function main() {
  const files = (await readdir(PUBLIC_DIR)).filter((f) => f.endsWith('.html') && !f.endsWith('.bak'))

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection('content')

  // scope -> { key: {field, value} }
  const scopes = new Map()

  for (const file of files) {
    const full = path.join(PUBLIC_DIR, file)
    const html = await readFile(full, 'utf8')
    const $ = cheerio.load(html, { decodeEntities: false })

    const pageId = path.basename(file, '.html')

    $('[data-cms]').each((_, el) => {
      const key = $(el).attr('data-cms')
      if (!key) return
      let fieldType = $(el).attr('data-cms-field') || 'text'
      if (!VALID_FIELDS.has(fieldType)) fieldType = 'text'

      const scopeId = key.startsWith('global.') ? 'global' : pageId
      const value = extractValue($, el, fieldType)

      if (!scopes.has(scopeId)) scopes.set(scopeId, {})
      const scopeFields = scopes.get(scopeId)
      if (!scopeFields[key]) {
        scopeFields[key] = { field: fieldType, value }
      }
    })
  }

  let inserted = 0
  let skipped = 0

  // NOTE: keys are dot-path strings (e.g. "hero.heading"). MongoDB's $set
  // treats dots in a path string as nested-document separators, so we never
  // address into `fields` with a dotted path — we merge in JS and replace
  // the whole `fields` subdocument in one shot instead.
  for (const [scopeId, fields] of scopes.entries()) {
    const existing = await collection.findOne({ _id: scopeId })
    const existingFields = existing?.fields || {}
    const merged = { ...existingFields }
    let newCount = 0
    for (const [k, v] of Object.entries(fields)) {
      if (!(k in existingFields)) {
        merged[k] = v
        newCount++
      }
    }
    if (newCount > 0) {
      await collection.updateOne(
        { _id: scopeId },
        { $set: { fields: merged, updatedAt: new Date() } },
        { upsert: true }
      )
      inserted += newCount
    }
    skipped += Object.keys(fields).length - newCount
    console.log(`${scopeId}: ${Object.keys(fields).length} fields`)
  }

  console.log(`\nDone. ${inserted} fields inserted/updated, ${skipped} already existed and were left alone.`)
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
