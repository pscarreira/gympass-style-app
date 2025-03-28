interface UserData {
  id?: string
  name: string
  email: string
  password_hash: string
}

export interface UsersRepository {
  create(data: UserData): Promise<UserData>
  findByEmail(email: string): Promise<UserData | null>
}
