import { LoadingSpinner } from '~/components/loading-spinner'
import { CommentType, useGetCommentsQuery } from '~/graphql/types.generated'

import { Comment } from './comment'
import { ChatIcon } from '@heroicons/react/outline'
import { useEffect, useRef } from 'react'
import { useIdle } from 'react-use'
import { CommentForm } from '~/components/comments/comment-form'

type Props = {
  refId: string
  type: CommentType
}

export function Comments({ refId, type }: Props) {
  const isIdle = useIdle()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { data, loading, error, refetch } = useGetCommentsQuery({
    variables: { refId, type },
  })

  useEffect(() => {
    if (!isIdle) {
      refetch()
    }
  }, [isIdle, refetch])

  if (loading || !data) {
    return (
      <div className="relative flex flex-1 flex-col border-t border-gray-150 dark:border-gray-800">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col space-y-3 px-4 py-8 md:px-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    )
  }

  if (error || !data.comments) return <p>Error loading comments...</p>

  const { comments } = data

  return (
    <div className="relative flex flex-1 flex-col border-t border-gray-150 dark:border-gray-800">
      <div className="text-quaternary absolute left-1/2 -top-5 -translate-x-1/2 transform bg-white px-8 py-2 dark:bg-black">
        <ChatIcon className="w-4 h-4" />
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col space-y-3 px-4 pt-8 pb-4 md:px-8">
        <div className="flex flex-col space-y-3">
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              refId={refId}
              type={type}
              comment={comment as never}
            />
          ))}
          {comments?.length === 0 && (
            <p className="text-quaternary block pt-12 pb-16 text-center">
              No comments yet...
            </p>
          )}
        </div>
      </div>
      <div ref={messagesEndRef} />

      <CommentForm refId={refId} type={type} />
    </div>
  )
}
