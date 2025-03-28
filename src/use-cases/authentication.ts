import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credential-error'
import { compare } from 'bcryptjs'
import { UserData } from '@/domain/user'

interface AuthenticationUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticationUseCaseResponse {
  user: UserData
}

export class AuthenticationUseCase {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({
    email,
    password
  } : AuthenticationUseCaseRequest) : Promise<AuthenticationUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}
