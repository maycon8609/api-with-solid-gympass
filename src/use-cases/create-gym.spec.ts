import { beforeEach, describe, expect, it } from 'vitest'

import { CreateGymUseCase } from './create-gym'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'create-mock-gym',
      description: null,
      phone: null,
      latitude: -5.060131,
      longitude: -42.8335233,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
