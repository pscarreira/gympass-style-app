import { GymsRepository } from '@/repositories/gyms-repository'
import { GymData } from '@/domain/gym'

interface SearchGymsUseCaseRequest {
  query: string,
  page?: number
}

interface SearchGymsUseCaseResponse {
  gyms: GymData[]
}
export class SearchGymsUseCase {
  constructor (
    private gymsRepository: GymsRepository
  ) {}

  async execute ({
    query,
    page
  } : SearchGymsUseCaseRequest) : Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
