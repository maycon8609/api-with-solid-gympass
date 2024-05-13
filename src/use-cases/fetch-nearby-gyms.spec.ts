import { beforeEach, describe, expect, it } from 'vitest'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'create-mock-gym-01',
      description: null,
      phone: null,
      latitude: -5.060131,
      longitude: -42.8335233,
    })

    await gymRepository.create({
      title: 'create-mock-gym-02',
      description: null,
      phone: null,
      latitude: -25.060131,
      longitude: -48.8335233,
    })

    const { gyms } = await sut.execute({
      userLatitude: -5.060131,
      userLongitude: -42.8335233,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'create-mock-gym-01' }),
    ])
  })
})
