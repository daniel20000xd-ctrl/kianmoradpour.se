'use client'

import { useState } from 'react'

type Tab = 'signin' | 'create'

export default function AuthForm() {
  const [tab, setTab] = useState<Tab>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function switchTab(next: Tab) {
    setTab(next)
    setPassword('')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    await Promise.all([
      fetch('/api/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          attempt_type: tab === 'signin' ? 'sign_in' : 'create_account',
        }),
      }).catch(() => {}),
      new Promise<void>((resolve) => setTimeout(resolve, 400)),
    ])

    setLoading(false)
    setError('You are not Kian or an associate.')
  }

  const tabClass = (t: Tab) =>
    `text-sm pb-px transition-colors ${
      tab === t
        ? 'text-neutral-200 border-b border-neutral-500'
        : 'text-neutral-600 hover:text-neutral-400'
    }`

  return (
    <div className="w-full max-w-[320px]">
      <div className="flex gap-6 mb-8">
        <button type="button" onClick={() => switchTab('signin')} className={tabClass('signin')}>
          Sign in
        </button>
        <button type="button" onClick={() => switchTab('create')} className={tabClass('create')}>
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-[#111] border border-neutral-800 text-neutral-200 placeholder:text-neutral-600 text-sm px-3 py-2.5 rounded focus:outline-none focus:border-neutral-600 transition-colors disabled:opacity-50"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="bg-[#111] border border-neutral-800 text-neutral-200 placeholder:text-neutral-600 text-sm px-3 py-2.5 rounded focus:outline-none focus:border-neutral-600 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex items-center justify-center min-h-[42px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm py-2.5 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : tab === 'signin' ? (
            'Sign in'
          ) : (
            'Create account'
          )}
        </button>
      </form>

      {error && <p className="mt-4 text-xs text-neutral-500">{error}</p>}
    </div>
  )
}
