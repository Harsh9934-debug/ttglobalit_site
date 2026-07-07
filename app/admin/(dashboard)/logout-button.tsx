'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left text-xs font-medium text-red-600 hover:text-red-700"
    >
      Log out
    </button>
  )
}
