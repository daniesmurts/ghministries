import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // MOCK: In production with valid tokens, we would use Resend here
    console.log('[API/PRAYER] Prayer request received successfully (MOCK):', body)

    return NextResponse.json({ success: true, message: "Prayer request received." }, { status: 200 })
    
  } catch (error) {
    console.error('[API/PRAYER] Error handling request:', error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
