import { CheckInData } from '@/domain/checkin'
import { CheckInsRepository } from '@/repositories/checkins-repository'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string,
  page?: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckInData[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor (
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute ({
    userId,
    page
  } : FetchUserCheckInsHistoryUseCaseRequest)
    : Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
    return { checkIns }
  }
}
