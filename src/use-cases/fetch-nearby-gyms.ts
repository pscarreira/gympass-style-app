import { GymsRepository } from '@/repositories/gyms-repository'
import { GymData } from '@/domain/gym'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number,
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: GymData[]
}
export class FetchNearbyGymsUseCase {
  constructor (
    private gymsRepository: GymsRepository
  ) {}

  async execute ({
    userLatitude,
    userLongitude
  } : FetchNearbyGymsUseCaseRequest) : Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })
    return { gyms }
  }
}
