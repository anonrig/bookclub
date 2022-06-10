import { PrismaClient } from '@prisma/client'
import { NextPageContext } from 'next'

import { prisma } from '~/lib/prisma'
import { getSession } from 'next-auth/react'

import { User } from '~/graphql/types.generated'
import { IncomingMessage } from 'http'

export type Context = {
  viewer: User | null
  prisma: PrismaClient
}

export async function getViewer(req: IncomingMessage | undefined) {
  const session = await getSession({ req })

  let user = null

  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
  }

  return user
}

export async function getContext(req: IncomingMessage | undefined) {
  const viewer = await getViewer(req)

  return {
    viewer,
    prisma,
  }
}

export default function context(ctx: NextPageContext) {
  return getContext(ctx.req)
}
