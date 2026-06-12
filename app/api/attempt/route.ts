import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { email, attempt_type } = body as { email?: string; attempt_type?: string }

  try {
    await fetch('https://www.syncedsys.com/api/gate/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gate-Secret': process.env.GATE_SECRET ?? '',
      },
      body: JSON.stringify({ email, attempt_type }),
    })
  } catch {
    // swallow silently
  }

  return NextResponse.json({})
}
