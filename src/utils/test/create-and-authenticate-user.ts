import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface UserToAuthenticate {
  name: string
  email: string
  password: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  userToAuthenticate?: UserToAuthenticate,
) {
  await request(app.server)
    .post('/users')
    .send({
      name: userToAuthenticate?.name ?? 'John Doe',
      email: userToAuthenticate?.email ?? 'johndoe@gmail.com',
      password: userToAuthenticate?.password ?? '123456',
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: userToAuthenticate?.email ?? 'johndoe@gmail.com',
      password: userToAuthenticate?.password ?? '123456',
    })

  const { token } = authResponse.body

  return { token }
}
