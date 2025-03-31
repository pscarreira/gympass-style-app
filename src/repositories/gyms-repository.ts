import { GymCreateData, GymData } from '@/domain/gym'

export interface FindManyNearbyParams {
  latitude: number,
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<GymData | null>
  create(data: GymCreateData): Promise<GymData>
  searchMany(search: string, page?: number): Promise<GymData[]>
  findManyNearby(params: FindManyNearbyParams): Promise<GymData[]>
}
