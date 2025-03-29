import { CheckInData } from '../domain/checkin'
import { CheckInsRepository } from '../repositories/checkins-repository'

interface CheckInUseCaseRequest {
  userId: string,
  gymId: string,
}

interface CheckInUseCaseResponse {
  checkIn: CheckInData
}

export class CheckinUseCase {
  constructor (
    private CheckInRepository: CheckInsRepository
  ) {}

  async execute ({
    userId,
    gymId
  } : CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
    const checkIn = await this.CheckInRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return {
      checkIn
    }
  }
}
