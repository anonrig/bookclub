import { PrismaClient } from '@prisma/client'

import { prisma } from '~/lib/prisma'

import { User } from '~/graphql/types.generated'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'

export type Context = {
  viewer: User | null
  prisma: PrismaClient
}

export async function getContext(
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res']
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  return {
    viewer: session?.user ?? null,
    prisma,
  }
}
