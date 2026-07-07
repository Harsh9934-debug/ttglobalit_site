import Link from 'next/link'
import { PAGES_MANIFEST } from '@/lib/pages-manifest'
import LogoutButton from './logout-button'

export const metadata = {
  title: 'Admin - TT Global IT',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex min-h-screen">
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col">
          <div className="px-5 py-5 border-b border-gray-200">
            <Link href="/admin" className="font-semibold text-lg">
              TT Global IT
            </Link>
            <p className="text-xs text-gray-500 mt-0.5">Content Admin</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-3">
            {PAGES_MANIFEST.map((p) => (
              <Link
                key={p.id}
                href={`/admin/${p.id}`}
                className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {p.title}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="block text-xs text-gray-500 hover:text-gray-800"
            >
              View live site ↗
            </a>
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
