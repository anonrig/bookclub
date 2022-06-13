import { ErrorAlert } from '~/components/alert'
import { CommentButton } from '~/components/button'
import { Textarea } from '~/components/input'
import {
  CommentType,
  useViewerQuery,
  useAddCommentMutation,
} from '~/graphql/types.generated'
import { useCallback, useState } from 'react'
import { GET_COMMENTS } from '~/graphql/queries/comment'

type Props = {
  refId: string
  type: CommentType
}

export function CommentForm({ refId, type }: Props) {
  const { data } = useViewerQuery()
  const [text, setText] = useState('')

  const [handleAddComment, addCommentResponse] = useAddCommentMutation({
    optimisticResponse: {
      __typename: 'Mutation',
      addComment: {
        __typename: 'Comment',
        id: Date.now().toString(),
        text,
        author: {
          __typename: 'User',
          id: Date.now().toString(),
          name: data?.viewer?.name,
          image: data?.viewer?.image,
          role: data?.viewer?.role,
        },
      },
    },
    update(cache: any, { data: { addComment } }: any) {
      const { comments } = cache.readQuery({
        query: GET_COMMENTS,
        variables: { refId, type },
      })

      cache.writeQuery({
        query: GET_COMMENTS,
        variables: { refId, type },
        data: {
          comments: [...comments, addComment],
        },
      })
    },
  })

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault()

      setText('')
      return handleAddComment({
        variables: { refId, type, text },
      })
    },
    [handleAddComment, refId, text, type]
  )

  return (
    <div className="filter-blur sticky bottom-0 flex flex-col border-t border-gray-150 bg-white bg-opacity-90 pb-10 dark:border-gray-800 dark:bg-gray-900 sm:pb-0">
      <form
        className="mx-auto flex w-full max-w-3xl flex-none items-center space-x-4 px-4 py-4 md:px-6"
        onSubmit={onSubmit}
      >
        <div className="relative flex w-full flex-none">
          <Textarea
            data-cy="comment-form-textarea"
            placeholder="Write a comment..."
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13 && e.metaKey) {
                return onSubmit(e)
              }
            }}
            style={{ paddingRight: '48px' }}
          />

          <div className="absolute bottom-1 right-1">
            <CommentButton
              data-cy="submit-comment-button"
              type="submit"
              disabled={text.trim().length === 0}
              size="small-square"
            >
              ↑
            </CommentButton>
          </div>
        </div>
        {addCommentResponse.error && (
          <ErrorAlert>{addCommentResponse.error.message}</ErrorAlert>
        )}
      </form>
    </div>
  )
}
