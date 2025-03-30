import { expect, it, describe, beforeEach } from 'vitest'
import {
  InMemoryGymsRepository
} from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: 'Description of a gym',
      latitude: -22.9120102,
      longitude: -43.2299082,
      phone: '(21) 1234-5678'
    })

    expect(gym.id).toEqual(expect.any(String))
    expect(gym).toHaveProperty('id')
  })
})
