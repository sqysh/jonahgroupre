'use server'

import { redirect } from 'next/navigation'
import PortalClient from './PortalClient'
import { auth } from '@/app/lib/auth'
import prisma from '@/prisma/client'
import { getUsers } from '@/app/lib/actions/user/getUsers'

export default async function PortalPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const [user, submissions, users] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, firstName: true, lastName: true, email: true, role: true }
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    getUsers()
  ])

  if (!user) redirect('/login')

  return <PortalClient user={user} submissions={submissions} users={users.data} />
}
