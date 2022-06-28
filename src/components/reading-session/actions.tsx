import Button, { GhostButton } from '~/components/button'

type Props = {
  isFooter?: boolean
}

export default function ReadingSessionActions({ isFooter }: Props) {
  return (
    <div className="flex space-x-4 py-12">
      <Button>Get book</Button>
      <Button>Attend</Button>
      {isFooter && <GhostButton disabled={true}>Update page</GhostButton>}
    </div>
  )
}
