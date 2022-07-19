import { Prisma } from '@prisma/client'
import { Context } from '~/graphql/context'
import {
  BookFilterType,
  QueryBookArgs,
  QueryBooksArgs,
} from '~/graphql/types.generated'

export async function books(
  _: unknown,
  { data }: QueryBooksArgs,
  { prisma }: Context
) {
  const filter: Prisma.BookFindManyArgs = {
    include: {
      _count: {
        select: {
          recommendations: true,
        },
      },
    },
  }

  switch (data?.filter) {
    case BookFilterType.PageCount: {
      filter.orderBy = { pageCount: 'desc' }
      break
    }
    case BookFilterType.RecommendationCount: {
      filter.orderBy = {
        recommendations: {
          _count: 'desc',
        },
      }
      break
    }
    default: {
      filter.orderBy = {
        createdAt: 'desc',
      }
      break
    }
  }

  return prisma.book.findMany(filter)
}

export function book(_: unknown, { id }: QueryBookArgs, ctx: Context) {
  return ctx.prisma.book.findFirst({
    where: { id },
    include: {
      _count: {
        select: {
          recommendations: true,
        },
      },
    },
  })
}
