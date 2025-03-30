import { CheckInsRepository } from './../repositories/checkins-repository'
import { CheckInData } from '../domain/checkin'

interface CheckInUseCaseRequest {
  userId: string,
  gymId: string,
}

interface CheckInUseCaseResponse {
  checkIn: CheckInData
}

export class CheckinUseCase {
  constructor (
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute ({
    userId,
    gymId
  } : CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return {
      checkIn
    }
  }
}
