import { GymData, GymCreateData } from './../../domain/gym'
import { randomUUID } from 'node:crypto'
import { GymsRepository } from '../gyms-repository'

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
}
