import { expect, it, describe, beforeEach } from 'vitest'
import {
  InMemoryCheckInsRepository
} from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Ckeck-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check ins history', async () => {
    await checkInsRepository.create(
      {
        gym_id: 'gym-01',
        user_id: 'user-01'
      }
    )
    await checkInsRepository.create(
      {
        gym_id: 'gym-02',
        user_id: 'user-01'
      }
    )
    await checkInsRepository.create(
      {
        gym_id: 'gym-02',
        user_id: 'user-02'
      }
    )

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' })
    ])
  })

  it('should be able to fetch paginated check ins history', async () => {
    for (let index = 1; index <= 22; index++) {
      await checkInsRepository.create(
        {
          gym_id: `gym-${index}`,
          user_id: 'user-01'
        }
      )
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ])
  })
})
