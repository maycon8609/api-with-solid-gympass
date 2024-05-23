import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const checkInUseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return checkInUseCase
}
