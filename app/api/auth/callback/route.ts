import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (code) {
    // Here you would exchange the code for an access token
    // For now, we'll just redirect to the dashboard with the code as a query parameter
    return NextResponse.redirect(new URL(`/dashboard?code=${code}`, request.url))
  } else {
    // Handle error
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

