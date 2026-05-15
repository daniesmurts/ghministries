import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET)
    
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const type = body?._type
    if (!type) return NextResponse.json({ message: 'Bad Request' }, { status: 400 })

    // Revalidate relevant paths based on document type
    if (type === 'sermon') revalidatePath('/media')
    if (type === 'event') revalidatePath('/events')
    if (type === 'leader') revalidatePath('/leadership')
    if (type === 'homeGroup') revalidatePath('/home-groups')
    if (type === 'siteSettings') revalidatePath('/')
    if (type === 'page') revalidatePath('/[slug]', 'layout')
    if (type === 'testimonial') revalidatePath('/')
    if (type === 'globalLocation') revalidatePath('/global')
    if (type === 'storeProduct') revalidatePath('/store')
    if (type === 'volunteerOpportunity') revalidatePath('/volunteering')
    if (type === 'jobOpportunity') revalidatePath('/opportunities')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    const error = err as Error
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
