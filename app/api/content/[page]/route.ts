import { NextRequest, NextResponse } from 'next/server'
import { getContent } from '@/lib/mongodb'

export async function GET(
  _req: NextRequest,
  { params }: { params: { page: string } }
) {
  const fields = await getContent(params.page)
  return NextResponse.json(
    { fields },
    { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=300' } }
  )
}
