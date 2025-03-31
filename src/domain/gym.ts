import { Decimal } from '@prisma/client/runtime/library'

export type GymData = {
  id: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number | Decimal
  longitude: number | Decimal
}

export type GymCreateData = {
  id?: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number | Decimal
  longitude: number | Decimal
}
