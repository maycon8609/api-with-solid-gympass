import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository)

  return getUserProfileUseCase
}
