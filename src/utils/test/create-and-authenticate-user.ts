import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

interface UserData {
  email: string
  name: string
  password: string
  role: 'ADMIN' | 'MEMBER'
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  userData?: Partial<UserData>,
) {
  await prisma.user.create({
    data: {
      name: userData?.name ?? 'John Doe',
      email: userData?.email ?? 'johndoe@gmail.com',
      password_hash: await hash(userData?.password ?? '123456', 6),
      role: userData?.role ?? 'MEMBER',
    },
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: userData?.email ?? 'johndoe@gmail.com',
      password: userData?.password ?? '123456',
    })

  const { token } = authResponse.body

  return { token }
}
