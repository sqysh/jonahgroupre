'use client'

import Logo from '@/app/components/common/Logo'
import { signIn } from 'next-auth/react'

export default function LoginClient({ accessDenied }: { accessDenied: boolean }) {
  return (
    <main
      className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center px-4 py-12"
      aria-label="Login page"
    >
      {/* Card */}
      <div className="w-full max-w-105 min-w-75 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-8 sm:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo width="w-48" src="/images/logo-removebg.png" />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold uppercase text-text-light dark:text-text-dark mb-2 tracking-tight">
            Portal Login
          </h1>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-12 h-1 bg-primary-light dark:bg-primary-dark mx-auto mb-8"
          aria-hidden="true"
        />

        {/* Access Denied Notice */}
        {accessDenied && (
          <div role="alert" className="mb-6 border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-xs text-red-500 font-medium text-center leading-relaxed">
              Your Google account doesn&apos;t have access to this portal. Contact Eileen to request
              access.
            </p>
          </div>
        )}

        {/* Google Sign In */}
        <form
          action={async () => {
            await signIn('google', { redirectTo: '/portal' })
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-surface2-light dark:bg-surface2-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-semibold text-sm uppercase tracking-wide hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light dark:focus-visible:ring-offset-surface-dark"
            aria-label="Sign in with Google"
          >
            {/* Google SVG */}
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-light dark:text-muted-dark mt-8 leading-relaxed">
          Access is restricted to authorized users only.
          <br />
          Contact{' '}
          <a
            href="mailto:ejonah@c21ne.com"
            className="text-primary-light dark:text-primary-dark hover:underline focus-visible:outline-none focus-visible:underline"
          >
            Eileen
          </a>{' '}
          if you need access.
        </p>
      </div>

      {/* Sqysh credit */}
      <p className="mt-6 text-xs text-muted-light dark:text-muted-dark uppercase">
        &copy; {new Date().getFullYear()} -{' '}
        <span
          onClick={() => window.open('https://sqysh.io', '_blank')}
          className="text-primary-light dark:text-primary-dark cursor-pointer hover:underline"
        >
          Sqysh
        </span>
      </p>
    </main>
  )
}
