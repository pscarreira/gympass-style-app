import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import {
  InMemoryCheckInsRepository
} from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckinUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Ckeck-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01'
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-01'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
