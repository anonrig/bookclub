import * as Sentry from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'
import { prisma } from '~/lib/prisma'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new Integrations.Prisma({ client: prisma }),
    new Integrations.GraphQL(),
    new Integrations.Apollo(),
  ],
})
