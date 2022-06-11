import { useGetViewerWithSettingsQuery } from '~/graphql/types.generated'
import { Detail } from '~/components/list-detail/detail'
import { TitleBar } from '~/components/list-detail/title-bar'
import { useRef } from 'react'
import EmailForm from '~/components/user-settings/email-form'
import UserSettingsFooter from '~/components/user-settings/footer'
import NameForm from '~/components/user-settings/name-form'

export default function UserSettings() {
  const { data, loading } = useGetViewerWithSettingsQuery({
    fetchPolicy: 'network-only',
  })

  const titleRef = useRef<HTMLParagraphElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if (!data?.viewer && loading) {
    return <Detail.Loading />
  }

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title="Settings"
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />
      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>Settings</Detail.Title>
        </Detail.Header>

        <div className="divide-y divide-gray-200 py-12 dark:divide-gray-800">
          <div className="space-y-8 py-12">
            <h3 className="text-primary text-lg font-bold">Account</h3>
            <NameForm viewer={data?.viewer} />
            <EmailForm viewer={data?.viewer} />
          </div>

          <UserSettingsFooter />
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
