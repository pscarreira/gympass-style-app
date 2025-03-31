import { CheckInCreateData, CheckInData } from '@/domain/checkin'

export interface CheckInsRepository {
  create(data: CheckInCreateData): Promise<CheckInData>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckInData | null>
  findManyByUserId(userId: string, page?: number): Promise<CheckInData[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckInData | null>
  save(checkIn: CheckInData): Promise<CheckInData>
}
