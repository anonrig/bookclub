import { Role, useUserQuery, useViewerQuery } from '~/graphql/types.generated'
import { Detail } from '~/components/list-detail/detail'
import { TitleBar } from '~/components/list-detail/title-bar'
import { useRef } from 'react'
import { NextSeo } from 'next-seo'

type Props = {
  id: string
}

function getRole(role?: Role | null) {
  switch (role) {
    case Role.Admin:
      return 'Admin'
    case Role.Blocked:
      return 'Blocked'
    case Role.Pending:
      return 'Pending User'
    default:
      return 'User'
  }
}

export default function UserDetail({ id }: Props) {
  const { data: viewer } = useViewerQuery()
  const { data, loading } = useUserQuery({
    variables: { id },
  })

  const titleRef = useRef<HTMLParagraphElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if (!data || !data?.user || loading) {
    return <Detail.Loading />
  }

  return (
    <>
      <NextSeo title={`${data.user.name}'s Profile`} />
      <Detail.Container ref={scrollContainerRef}>
        <TitleBar
          magicTitle
          title={data.user.name ?? ''}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />

        <Detail.ContentContainer>
          <Detail.Header>
            <Detail.Title ref={titleRef}>{data.user.name}</Detail.Title>
          </Detail.Header>

          <div className="divide-y divide-gray-200 py-12 dark:divide-gray-800">
            <div className="space-y-8 py-12">
              <div className="space-y-2">
                <p className="text-primary font-semibold">Name</p>

                <div className="text-primary flex space-x-2">
                  {data.user.name}
                </div>
              </div>

              {viewer?.viewer?.role === Role.Admin && (
                <div className="space-y-2">
                  <p className="text-primary font-semibold">Role</p>

                  <div className="text-primary flex space-x-2">
                    {getRole(data.user.role)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Detail.ContentContainer>
      </Detail.Container>
    </>
  )
}
