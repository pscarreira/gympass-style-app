import { UsersRepository } from '@/repositories/users-repository'
import { UserData } from '@/domain/user'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: UserData
}

export class GetUserProfileUseCase {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({
    userId
  } : GetUserProfileUseCaseRequest) : Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFound()
    }
    return {
      user
    }
  }
}
