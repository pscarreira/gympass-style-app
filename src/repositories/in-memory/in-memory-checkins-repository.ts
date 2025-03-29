import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../checkins-repository'
import { CheckInCreateData, CheckInData } from '@/domain/checkin'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckInData[] = []

  async create (data: CheckInCreateData): Promise<CheckInData> {
    const checkIn: CheckInData = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }
    this.items.push(checkIn)
    return checkIn
  }
}
