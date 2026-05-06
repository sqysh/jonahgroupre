import prisma from './client.ts'

async function main() {
  const users = [
    { email: 'rowgregory@gmail.com', firstName: 'Greg', lastName: 'Sqysh', role: 'SUPER_USER' },
    { email: 'jonahrealtors@gmail.com', firstName: 'Eileen', lastName: 'Jonah', role: 'ADMIN' }
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    })
  }

  console.log('Seeded users')
}

main()
