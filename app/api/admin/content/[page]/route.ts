import { NextRequest, NextResponse } from 'next/server'
import { getContent, saveContent, type ContentField } from '@/lib/mongodb'
import { getPageEntry } from '@/lib/pages-manifest'

export async function GET(
  _req: NextRequest,
  { params }: { params: { page: string } }
) {
  if (!getPageEntry(params.page)) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  }
  const fields = await getContent(params.page)
  return NextResponse.json({ fields })
}

const VALID_FIELD_TYPES = new Set(['text', 'html', 'src', 'href', 'alt'])

export async function PUT(
  req: NextRequest,
  { params }: { params: { page: string } }
) {
  if (!getPageEntry(params.page)) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body.fields !== 'object' || body.fields === null) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const fields: Record<string, ContentField> = {}
  for (const [key, raw] of Object.entries(body.fields as Record<string, unknown>)) {
    const f = raw as { field?: unknown; value?: unknown }
    const fieldType = VALID_FIELD_TYPES.has(f?.field as string) ? (f.field as ContentField['field']) : 'text'
    const value = typeof f?.value === 'string' ? f.value : ''
    fields[key] = { field: fieldType, value }
  }

  await saveContent(params.page, fields)
  return NextResponse.json({ ok: true })
}
