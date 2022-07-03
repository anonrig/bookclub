import { PrismaClient } from '@prisma/client'

let client: PrismaClient

if (process.env.NODE_ENV === 'production') {
  const { PrismaClient } = await import('@prisma/client/edge')
  client = new PrismaClient()
} else {
  client = global.prisma || new PrismaClient()
}

export const prisma = global.prisma || client

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
