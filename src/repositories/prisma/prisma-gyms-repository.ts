import { GymData, GymCreateData } from '@/domain/gym'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById (id: string): Promise<GymData | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    return gym
  }

  async create (data: GymCreateData): Promise<GymData> {
    const gym = await prisma.gym.create({
      data
    })

    return gym
  }

  async searchMany (search: string, page?: number): Promise<GymData[]> {
    const pagination = page
      ? { take: 20, skip: (page - 1) * 20 }
      : null

    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: search
        }
      },
      ...pagination
    })

    return gyms
  }

  async findManyNearby ({
    latitude,
    longitude
  }: FindManyNearbyParams): Promise<GymData[]> {
    // const gyms = await prisma.$queryRaw<GymData[]>`
    //   SELECT * from gyms
    //   WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    // `

    // Raio máximo, em km
    const maxDistance = 10
    // Raio da Terra em km
    const earthRadius = 6371

    const distanceCalculation = `
    ${earthRadius} * ACOS(
      COS(RADIANS($1))
      * COS(RADIANS(latitude))
      * COS(RADIANS(longitude) - RADIANS($2))
      + SIN(RADIANS($1))
      * SIN(RADIANS(latitude))
    )
  `

    // Montamos a query usando o distanceCalculation e um placeholder para maxDistance
    const query = `
    SELECT *
    FROM gyms
    WHERE ${distanceCalculation} <= $3
    `
    const gyms = await prisma.$queryRawUnsafe<GymData[]>(
      query,
      latitude,
      longitude,
      maxDistance)
    return gyms
  }
}
