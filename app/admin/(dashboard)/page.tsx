import Link from 'next/link'
import { PAGES_MANIFEST } from '@/lib/pages-manifest'

export default function AdminHome() {
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold">Pages</h1>
      <p className="text-sm text-gray-500 mt-1">
        Pick a page to edit its content. Layout and design stay the same — only text, images
        and links change.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {PAGES_MANIFEST.map((p) => (
          <Link
            key={p.id}
            href={`/admin/${p.id}`}
            className="rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-400 hover:shadow-sm transition"
          >
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-gray-500 mt-1">{p.file}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
