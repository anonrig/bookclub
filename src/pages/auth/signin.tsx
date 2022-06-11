import type { GetServerSideProps, NextPage } from 'next'
import { Button } from '~/components/button'
import { getSession, signIn } from 'next-auth/react'
import { NextPageWithLayout, SiteLayout } from '~/components/layouts'

const SignIn: NextPageWithLayout = () => {
  return (
    <div className="items-center justify-center flex w-full flex-col">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-primary font-sans text-2xl font-bold xl:text-3xl">
            Book Club
          </h1>
          <p className="text-xl text-tertiary">An invite only book club</p>
        </div>
        <Button size="large" onClick={() => signIn('google')}>
          Sign in with Google
        </Button>
      </div>
    </div>
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
