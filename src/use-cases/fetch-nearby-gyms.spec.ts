import { expect, it, describe, beforeEach } from 'vitest'
import {
  InMemoryGymsRepository
} from '@/repositories/in-memory/in-memory-gyms-repository'
import { } from './search-gyms'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { title } from 'process'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to find a near gym', async () => {
    // Gym Maracanã (<10km)
    await gymsRepository.create({
      title: 'Gym 01',
      description: 'Description of a gym',
      latitude: -22.912107567318504,
      longitude: -43.22998681646008,
      phone: '(21) 1234-5678'
    })

    // Gym Museu Nacional (<10km)
    await gymsRepository.create({
      title: 'Gym 02',
      description: 'Description of a gym',
      latitude: -22.90520132357043,
      longitude: -43.22634186196574,
      phone: '(21) 1234-5678'
    })

    // User Estação Maracanã
    const { gyms } = await sut.execute({
      userLatitude: -22.909121587509844,
      userLongitude: -43.23342916285459
    })

    console.log(gyms)
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 01' }),
      expect.objectContaining({ title: 'Gym 02' })
    ])
  })

  it('should not be able to find far gyms', async () => {
    // Gym Maracanã (<10km)
    await gymsRepository.create({
      title: 'Gym 01',
      description: 'Description of a gym',
      latitude: -22.912107567318504,
      longitude: -43.22998681646008,
      phone: '(21) 1234-5678'
    })

    // Gym Museu de Arte Contemporânea (>10km)
    await gymsRepository.create({
      title: 'Gym 02',
      description: 'Description of a gym',
      latitude: -22.905730890991364,
      longitude: -43.12575787325333,
      phone: '(21) 1234-5678'
    })

    // User Estação Maracanã
    const { gyms } = await sut.execute({
      userLatitude: -22.909121587509844,
      userLongitude: -43.23342916285459
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 01' }),
    ])
  })
})
