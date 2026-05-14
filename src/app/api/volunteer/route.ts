import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // MOCK: In production with valid tokens, we would use Resend here
    console.log('[API/VOLUNTEER] Volunteer application received successfully (MOCK):', body)

    return NextResponse.json({ success: true, message: "Volunteer application received." }, { status: 200 })
    
  } catch (error) {
    console.error('[API/VOLUNTEER] Error handling request:', error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
