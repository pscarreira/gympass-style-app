import { GymData, GymCreateData } from './../../domain/gym'
import { randomUUID } from 'node:crypto'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: GymData[] = []

  async findById (id: string): Promise<GymData | null> {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) return null
    return gym
  }

  async create (data: GymCreateData): Promise<GymData> {
    const gym: GymData = {
      id: data.id || randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.items.push(gym)
    return gym
  }

  async searchMany (search: string, page: number): Promise<GymData[]> {
    const gyms = this.items.filter((item) => item.title.includes(search))
    if (page) {
      return gyms.slice((page - 1) * 20, page * 20)
    }
    return gyms
  }

  async findManyNearby (params: FindManyNearbyParams): Promise<GymData[]> {
    const MAX_DISTANCE_NEARBY_GYM = 10
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.latitude, longitude: item.longitude }
      )
      console.log('Distance:', distance)
      return distance < MAX_DISTANCE_NEARBY_GYM
    })
  }
}
