import { GymsRepository } from '@/repositories/gyms-repository'
import { GymCreateData, GymData } from '@/domain/gym'

interface CreateGymUseCaseRequest extends GymCreateData {}

interface CreateGymUseCaseResponse {
  gym: GymData
}
export class CreateGymUseCase {
  constructor (
    private gymRepository: GymsRepository
  ) {}

  async execute ({
    title,
    description,
    phone,
    latitude,
    longitude,
  } : CreateGymUseCaseRequest) : Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}
