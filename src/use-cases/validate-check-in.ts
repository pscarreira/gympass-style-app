import { CheckInsRepository } from './../repositories/checkins-repository'
import { CheckInData } from '../domain/checkin'
import { ResourceNotFound } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckInData
}

export class ValidateCheckinUseCase {
  constructor (
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute ({
    checkInId
  } : ValidateCheckInUseCaseRequest) : Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const maxCheckInValidationIntervalInMinutes = 20
    const distanceInMinutesFromCheckInCreation: number = dayjs(new Date())
      .diff(
        checkIn.created_at,
        'minutes'
      )

    if (distanceInMinutesFromCheckInCreation >
      maxCheckInValidationIntervalInMinutes) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)

    return {
      checkIn
    }
  }
}
