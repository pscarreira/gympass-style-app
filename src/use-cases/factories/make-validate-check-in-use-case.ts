import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { ValidateCheckinUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase () {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckinUseCase(checkInsRepository)

  return useCase
}
