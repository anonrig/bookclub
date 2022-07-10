import Link from 'next/link'

import { Avatar } from '~/components/avatar'
import Button, { PrimaryButton } from '~/components/button'
import { Textarea } from '~/components/input'
import { LoadingSpinner } from '~/components/loading-spinner'
import {
  Comment as CommentProp,
  CommentType,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} from '~/graphql/types.generated'
import { timestampToCleanTime } from '~/lib/transformers'

import { MarkdownRenderer } from '../markdown-renderer'
import { memo, useState } from 'react'
import { GET_COMMENTS } from '~/graphql/queries/comment'
import { CommentMenu } from '~/components/comments/comment-menu'

type Props = {
  comment: CommentProp
  refId: string
  type: CommentType
}

export const Comment = memo(function MemoComment({
  comment,
  refId,
  type,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const [isSavingEdit, setIsSavingEdit] = useState(false)

  const [removeComment] = useRemoveCommentMutation({
    variables: { id: comment.id },
    optimisticResponse: {
      __typename: 'Mutation',
      removeComment: true,
    },
    update(cache: any) {
      const { comments } = cache.readQuery({
        query: GET_COMMENTS,
        variables: { refId, type },
      })

      cache.writeQuery({
        query: GET_COMMENTS,
        variables: { refId, type },
        data: {
          comments: comments.filter((o: any) => o.id !== comment.id),
        },
      })
    },
  })

  const [updateComment] = useUpdateCommentMutation({
    variables: { id: comment.id, text: editText },
    optimisticResponse: {
      __typename: 'Mutation',
      updateComment: {
        __typename: 'Comment',
        ...comment,
        text: editText,
        author: {
          ...comment.author,
          __typename: 'User',
        },
      },
    },
    onCompleted() {
      setIsSavingEdit(false)
      setIsEditing(false)
    },
  })

  function handleDelete() {
    removeComment()
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function onKeyDown(e: any) {
    if (e.keyCode === 13 && e.metaKey) {
      if (editText.trim().length === 0 || isSavingEdit) return
      return handleSaveEdit()
    }
    if (e.keyCode === 27 || e.key === 'Escape') {
      setIsEditing(false)
      setEditText(comment.text)
    }
  }

  function handleSaveEdit() {
    setIsSavingEdit(true)
    updateComment()
  }

  const createdAt = timestampToCleanTime({
    month: 'short',
    timestamp: comment.createdAt,
  })

  return (
    <div className="group flex flex-col space-y-0">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Link href={`/u/${comment.author.id}`}>
            <a className="inline-flex">
              <Avatar
                user={{ name: comment.author.name ?? '' }}
                src={comment.author.image ?? ''}
                width={32}
                height={32}
                quality={100}
                className="rounded-full"
              />
            </a>
          </Link>

          <div className="flex space-x-1">
            <Link href={`/u/${comment.author.id}`}>
              <a className="text-primary font-semibold leading-snug">
                <div className="flex break-all line-clamp-1">
                  {comment.author.name}
                </div>
              </a>
            </Link>
            <p className="text-quaternary leading-snug">·</p>
            <p className="text-quaternary leading-snug line-clamp-1">
              {createdAt.formatted}
            </p>
          </div>
        </div>

        {(comment.viewerCanUpdate || comment.viewerCanDelete) && (
          <CommentMenu
            comment={comment}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col space-y-3 pl-14">
          <Textarea
            onChange={(e: any) => setEditText(e.target.value)}
            value={editText}
            onKeyDown={onKeyDown}
          />
          <div className="flex justify-between">
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <PrimaryButton
              disabled={editText.trim().length === 0 || isSavingEdit}
              onClick={handleSaveEdit}
            >
              {isSavingEdit ? <LoadingSpinner /> : 'Save'}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <MarkdownRenderer
          className="comment prose flex-grow pl-14 leading-normal"
          variant="comment"
        >
          {comment.text}
        </MarkdownRenderer>
      )}
    </div>
  )
})
