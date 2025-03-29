export interface CheckInData {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

export interface CheckInCreateData {
  user_id: string
  gym_id: string
  validated_at?: Date | null
}
