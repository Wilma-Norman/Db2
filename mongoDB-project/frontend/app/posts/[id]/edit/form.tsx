"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  postActionSchema,
  type PostPageData,
  type PostValues,
} from "@/lib/schemas";
import FormError from "@/components/FormError/formError";
import { handleServerActionError } from "@/lib/errorHandeling";
import { editPost } from "@/actions/edit-post";

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<PostPageData, "title" | "content">;
  postId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PostValues) => {
      handleServerActionError(await editPost({ data: values, postId }));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValues>({
    resolver: zodResolver(postActionSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col gap-4 bg-emerald-700"
    >
      <input
        {...register("title")}
        type="text"
        placeholder="title"
        className="input m-6 border rounded-2xl p-2"
      />
      <FormError error={errors.title?.message} />
      <textarea
        {...register("content")}
        placeholder="content"
        className="input h-30 m-6 p-2 border rounded-3xl"
      />
      <FormError error={errors.content?.message} />
      <button type="submit" className="button-primary text-lg">
        {isPending ? "saving changes..." : "save changes"}
      </button>
    </form>
  );
};
