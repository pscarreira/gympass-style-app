import { CheckInData, CheckInCreateData } from './../../domain/checkin'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../checkins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckInData[] = []

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckInData | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(
      (checkIn: CheckInData) => {
        const checkInDate = dayjs(checkIn.created_at)
        const isOnSameDate =
          checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
        return checkIn.user_id === userId && isOnSameDate
      }
    )

    if (!checkInOnSameDate) { return null }
    return checkInOnSameDate
  }

  async create (data: CheckInCreateData): Promise<CheckInData> {
    const checkIn: CheckInData = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }
    this.items.push(checkIn)
    return checkIn
  }

  async findManyByUserId (
    userId: string,
    page?: number): Promise<CheckInData[]> {
    const result = this.items.filter(item => item.user_id === userId)

    if (page) {
      return result.slice((page - 1) * 20, page * 20)
    }
    return result
  }

  async countByUserId (userId: string): Promise<number> {
    return this.items.filter(item => item.user_id === userId).length
  }

  async findById (id: string) : Promise<CheckInData | null> {
    const checkIn = this.items.find(item => item.id === id)
    if (!checkIn) { return null }
    return checkIn
  }

  async save (checkIn: CheckInData): Promise<CheckInData> {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
