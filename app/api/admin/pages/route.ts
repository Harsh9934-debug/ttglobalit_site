import { NextResponse } from 'next/server'
import { PAGES_MANIFEST } from '@/lib/pages-manifest'

export async function GET() {
  return NextResponse.json({ pages: PAGES_MANIFEST })
}
