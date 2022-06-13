import type { GetServerSideProps } from 'next'
import { Button } from '~/components/button'
import { getSession, signIn } from 'next-auth/react'
import { NextPageWithLayout, SiteLayout } from '~/components/layouts'

const SignIn: NextPageWithLayout = () => {
  return (
    <section className="items-center relative flex justify-center px-4 pt-12 overflow-hidden border-b md:pb-24 md:pt-32 md:px-8 border-neutral-200">
      <div className="z-20 w-full max-w-6xl space-y-10">
        <div className="flex flex-col w-full max-w-3xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            nizipli.com
          </h1>
          <h3 className="text-xl text-gray-500 md:text-3xl lg:text-4xl lg:leading-[1.4]">
            a private read-only book club.
          </h3>
        </div>
        <div>
          <Button size="large" onClick={() => signIn('google')}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </section>
  )
}

SignIn.getLayout = (props) => <SiteLayout sidebar={false}>{props}</SiteLayout>

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default SignIn
