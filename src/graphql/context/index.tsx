import { PrismaClient } from '@prisma/client'

import { prisma } from '~/lib/prisma'
import { getSession } from 'next-auth/react'

import { User } from '~/graphql/types.generated'
import { IncomingMessage } from 'http'

export type Context = {
  viewer: User | null
  prisma: PrismaClient
}

export async function getContext(req: IncomingMessage | undefined) {
  const viewer = await getSession({ req })

  return {
    viewer: viewer?.user ?? null,
    prisma,
  }
}
