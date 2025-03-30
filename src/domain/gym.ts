export type GymData = {
  id: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

export type GymCreateData = {
  id?: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}
