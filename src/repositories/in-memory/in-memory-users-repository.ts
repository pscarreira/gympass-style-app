import { UserData } from '@/domain/user'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserData[] = []

  async findByEmail (email: string): Promise<UserData | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async create (data: UserData): Promise<UserData> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }
    this.items.push(user)
    return user
  }

  async findById (id: string): Promise<UserData | null> {
    const user = this.items.find((item) => item.id === id)
    if (!user) return null
    return user
  }
}
