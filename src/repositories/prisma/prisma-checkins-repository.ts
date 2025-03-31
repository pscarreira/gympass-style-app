import { CheckInCreateData } from '@/domain/checkin'
import { CheckInsRepository } from '../checkins-repository'
import { CheckIn } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create (data: CheckInCreateData): Promise<CheckIn> {
    const checkIn = prisma.checkIn.create({
      data
    })

    return checkIn
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId (userId: string, page?: number): Promise<CheckIn[]> {
    const pagination = page
      ? { take: 20, skip: (page - 1) * 20 }
      : null

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      ...pagination
    })

    return checkIns
  }

  async countByUserId (userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }

  async findById (id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }

  async save (data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }
}
