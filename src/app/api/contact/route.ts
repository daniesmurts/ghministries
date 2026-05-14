import { NextResponse } from 'next/server'
import { z } from 'zod'

// Shared schema for server-side validation
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate request body
    const validatedData = contactSchema.parse(body)
    
    // MOCK: In production with valid tokens, we would use Resend here
    // Example: await resend.emails.send({ ... })
    console.log('[API/CONTACT] Form received successfully (MOCK):', validatedData)

    return NextResponse.json({ success: true, message: "Contact request received." }, { status: 200 })
    
  } catch (error) {
    console.error('[API/CONTACT] Error handling request:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
