import { expect, it, describe, beforeEach } from 'vitest'
import {
  InMemoryGymsRepository
} from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to find a gym by the name', async () => {
    await gymsRepository.create({
      title: 'Gym 01',
      description: 'Description of a gym',
      latitude: -22.9120102,
      longitude: -43.2299082,
      phone: '(21) 1234-5678'
    })

    await gymsRepository.create({
      title: 'Gym 02',
      description: 'Description of a gym',
      latitude: -22.9120102,
      longitude: -43.2299082,
      phone: '(21) 1234-5678'
    })

    await gymsRepository.create({
      title: 'Gym 03',
      description: 'Description of a gym',
      latitude: -22.9120102,
      longitude: -43.2299082,
      phone: '(21) 1234-5678'
    })

    const { gyms } = await sut.execute({
      query: 'Gym 01',
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 01' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create(
        {
          title: `Gym Search ${index}`,
          description: 'Description of a gym',
          latitude: -22.9120102,
          longitude: -43.2299082,
          phone: '(21) 1234-5678'
        }
      )
    }

    const { gyms } = await sut.execute({
      query: 'Gym Search',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym Search 21' }),
      expect.objectContaining({ title: 'Gym Search 22' })
    ])
  })
})
