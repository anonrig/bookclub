import type { GetServerSideProps } from 'next'
import { Button } from '~/components/button'
import { getSession, signIn } from 'next-auth/react'
import { NextPageWithLayout, SiteLayout } from '~/components/layouts'
import { NextSeo } from 'next-seo'

const SignIn: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Sign in" />
      <section className="relative flex items-center justify-center overflow-hidden border-b border-neutral-200 px-4 pt-12 md:px-8 md:pb-24 md:pt-32">
        <div className="z-20 w-full max-w-6xl space-y-10">
          <div className="flex w-full max-w-3xl flex-col space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight dark:text-white md:text-5xl lg:text-6xl">
              book club
            </h1>
            <h3 className="text-xl text-gray-500 md:text-3xl lg:text-4xl lg:leading-[1.4]">
              a private invite-only book club.
            </h3>
          </div>
          <Button size="large" onClick={() => signIn('google')}>
            Sign in with Google
          </Button>
        </div>
      </section>
    </>
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
