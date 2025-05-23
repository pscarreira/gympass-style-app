import { CheckInsRepository } from './../repositories/checkins-repository'
import { CheckInData } from '../domain/checkin'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

interface CheckInUseCaseRequest {
  userId: string,
  gymId: string,
  userLatitude: number,
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckInData
}

export class CheckinUseCase {
  constructor (
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute ({
    userId,
    gymId,
    userLatitude,
    userLongitude
  } : CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
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
