"use client";

import { useMutation } from "@tanstack/react-query";
import { handleServerActionError } from "@/lib/errorHandeling";
import { deleteComment } from "@/actions/delete-comment";

export const DeleteCommentButton = ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deleteComment(postId, commentId));
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className="absolute right-3 top-3 rounded bg-[#C86E7A] p-1 text-sm text-white hover:bg-rose-300"
    >
      Delete Comment
    </button>
  );
};
