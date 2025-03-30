import { CheckInCreateData, CheckInData } from '@/domain/checkin'

export interface CheckInsRepository {
  create(data: CheckInCreateData): Promise<CheckInData>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckInData | null>
}
