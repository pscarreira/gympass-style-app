import { GymCreateData, GymData } from '@/domain/gym'

export interface GymsRepository {
  findById(id: string): Promise<GymData | null>
  create(data: GymCreateData): Promise<GymData | null>
}
