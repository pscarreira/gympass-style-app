import { Decimal } from '@prisma/client/runtime/library'

export interface Coordinate {
  latitude: number | Decimal,
  longitude: number | Decimal
}

interface NumberCoordinate {
  latitude: number
  longitude: number
}

function convertCoordinateToNumberCoordinate (
  coordinate: Coordinate
) : NumberCoordinate {
  const newCoordinate: NumberCoordinate = {
    latitude: coordinate.latitude instanceof Decimal
      ? coordinate.latitude.toNumber()
      : coordinate.latitude,
    longitude: coordinate.longitude instanceof Decimal
      ? coordinate.longitude.toNumber()
      : coordinate.longitude
  }
  return newCoordinate
}

export function getDistanceBetweenCoordinates (
  paramFrom: Coordinate,
  paramTo: Coordinate
) {
  const from = convertCoordinateToNumberCoordinate(paramFrom)
  const to = convertCoordinateToNumberCoordinate(paramTo)

  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
