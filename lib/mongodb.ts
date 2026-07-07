import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'ttglobalit'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  return global._mongoClientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  return client.db(dbName)
}

export type ContentField = {
  field: 'text' | 'html' | 'src' | 'href' | 'alt'
  value: string
}

export type ContentDoc = {
  _id: string
  fields: Record<string, ContentField>
  updatedAt: Date
}

export async function getContent(pageId: string): Promise<Record<string, ContentField>> {
  const db = await getDb()
  const doc = await db.collection<ContentDoc>('content').findOne({ _id: pageId })
  return doc?.fields || {}
}

// IMPORTANT: content keys are dot-path strings (e.g. "hero.heading").
// MongoDB's $set interprets dots in a path string as nested-document
// separators, so "fields.hero.heading" would silently create a nested
// {hero: {heading: ...}} structure instead of a flat "hero.heading" key.
// To avoid that, we merge in application code and replace the whole
// `fields` subdocument in one shot (a single, dot-free path segment).
export async function saveContent(
  pageId: string,
  fields: Record<string, ContentField>
): Promise<void> {
  const db = await getDb()
  const collection = db.collection<ContentDoc>('content')
  const existing = await collection.findOne({ _id: pageId })
  const merged = { ...(existing?.fields || {}), ...fields }
  await collection.updateOne(
    { _id: pageId },
    { $set: { fields: merged, updatedAt: new Date() } },
    { upsert: true }
  )
}
