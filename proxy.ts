import { NextRequest, NextResponse } from 'next/server'
import { auth } from './app/lib/auth'
import { Role } from '@prisma/client'

const publicRoutes = ['/login']
const protectedRoutes = ['/portal']
const superUserRoutes = ['/super']

export async function proxy(req: NextRequest) {
  const { nextUrl } = req

  // ── Skip middleware for static assets ────────────────────────────────────
  if (
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.includes('.') ||
    nextUrl.pathname.startsWith('/icon') ||
    nextUrl.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  const session = await auth()
  const isLoggedIn = !!session?.user
  const role = session?.user?.role as Role

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isProtectedRoute = protectedRoutes.some((r) => nextUrl.pathname.startsWith(r))
  const isSuperUserRoute = superUserRoutes.some((r) => nextUrl.pathname.startsWith(r))

  // ── Logged-in user hitting login → redirect to portal ────────────────────
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/portal', nextUrl))
  }

  // ── Protected route → send to login ──────────────────────────────────────
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', nextUrl)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── Protected route → wrong role ─────────────────────────────────────────
  if (isProtectedRoute && isLoggedIn && !['SUPER_USER', 'ADMIN'].includes(role ?? '')) {
    return NextResponse.redirect(new URL('/login?error=AccessDenied', nextUrl))
  }

  // ── Super user route → must be SUPER_USER ────────────────────────────────
  if (isSuperUserRoute && role !== 'SUPER_USER') {
    return NextResponse.redirect(new URL('/portal', nextUrl))
  }

  return NextResponse.next()
}
