import LoginClient from './LoginClient'

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error: string }>
}) {
  const { error } = await searchParams
  const accessDenied = error === 'AccessDenied'
  return <LoginClient accessDenied={accessDenied} />
}
