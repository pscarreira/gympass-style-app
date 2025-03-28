import { UserData } from '@/domain/user'

export interface UsersRepository {
  create(data: UserData): Promise<UserData>
  findByEmail(email: string): Promise<UserData | null>
  findById(id: string): Promise<UserData | null>
}
