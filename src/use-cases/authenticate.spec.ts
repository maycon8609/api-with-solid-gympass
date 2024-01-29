import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalideCredentialsError } from './errors/invalide-credentials-error'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const userData = {
      email: 'johndoe@email.com',
      password: '123456',
    }

    await expect(() =>
      authenticateUseCase.execute(userData),
    ).rejects.toBeInstanceOf(InvalideCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const userData = {
      email: 'johndoe@email.com',
      password: '12345',
    }

    await expect(() =>
      authenticateUseCase.execute(userData),
    ).rejects.toBeInstanceOf(InvalideCredentialsError)
  })
})
