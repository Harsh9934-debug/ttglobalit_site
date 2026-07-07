'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type ContentField = {
  field: 'text' | 'html' | 'src' | 'href' | 'alt'
  value: string
}

const FIELD_LABELS: Record<ContentField['field'], string> = {
  text: 'Text',
  html: 'Rich text (HTML)',
  src: 'Image URL',
  href: 'Link URL',
  alt: 'Image alt text',
}

export default function PageEditor() {
  const params = useParams<{ page: string }>()
  const pageId = params.page

  const [fields, setFields] = useState<Record<string, ContentField>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`/api/admin/content/${pageId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed to load')
        return res.json()
      })
      .then((data) => setFields(data.fields || {}))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [pageId])

  function updateValue(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: { ...prev[key], value } }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    const res = await fetch(`/api/admin/content/${pageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
    })
    setSaving(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Save failed')
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const entries = Object.entries(fields).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold capitalize">{pageId.replace(/-/g, ' ')}</h1>
        <button
          onClick={handleSave}
          disabled={saving || loading || entries.length === 0}
          className="rounded-md bg-gray-900 text-white text-sm font-medium px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500 mt-6">Loading content…</p>}
      {error && <p className="text-sm text-red-600 mt-6">{error}</p>}

      {!loading && !error && entries.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">
          No editable content found for this page yet. Run the content seed script after tagging
          this page's HTML with data-cms attributes.
        </p>
      )}

      <div className="mt-6 space-y-5">
        {entries.map(([key, f]) => (
          <div key={key} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-800 break-all">{key}</label>
              <span className="text-[11px] uppercase tracking-wide text-gray-400">
                {FIELD_LABELS[f.field]}
              </span>
            </div>

            {f.field === 'src' && f.value && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={f.value}
                alt=""
                className="h-24 w-auto object-contain border border-gray-100 rounded mb-2 bg-gray-50"
              />
            )}

            {f.field === 'text' || f.field === 'html' ? (
              <textarea
                value={f.value}
                onChange={(e) => updateValue(key, e.target.value)}
                rows={f.field === 'html' ? 5 : 2}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            ) : (
              <input
                type="text"
                value={f.value}
                onChange={(e) => updateValue(key, e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            )}
          </div>
        ))}
      </div>

      {entries.length > 0 && (
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="mt-6 rounded-md bg-gray-900 text-white text-sm font-medium px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
        </button>
      )}
    </div>
  )
}
