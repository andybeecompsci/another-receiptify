import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (code) {
    // Redirect to dashboard with the code
    return redirect(`/dashboard?code=${code}`)
  }

  return NextResponse.redirect('/error')
}

