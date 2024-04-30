import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymsUseCase } from './search-gyms'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  it('should be able to search for gyms', async () => {
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
      latitude: -5.060131,
      longitude: -42.8335233,
    })

    const { gyms } = await sut.execute({
      query: 'create-mock-gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'create-mock-gym-01' }),
      expect.objectContaining({ title: 'create-mock-gym-02' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `create-mock-gym-${i}`,
        description: null,
        phone: null,
        latitude: -5.060131,
        longitude: -42.8335233,
      })
    }

    const { gyms } = await sut.execute({
      query: 'create-mock-gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'create-mock-gym-21' }),
      expect.objectContaining({ title: 'create-mock-gym-22' }),
    ])
  })
})
