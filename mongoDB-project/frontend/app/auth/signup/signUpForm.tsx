"use client";

import { signUpSchema, SignUpValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignUp } from "@/actions/signUp";
import { handleServerActionError } from "@/lib/errorHandeling";
import FormError from "@/components/FormError/formError";

const SignUpForm = () => {
  const { mutate } = useMutation({
    mutationFn: async (values: SignUpValues) => {
      handleServerActionError(await SignUp(values));
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values: SignUpValues) => mutate(values))}
      className="flex flex-col justify-center items-center gap-12 my-8 p-5"
    >
      <div className='md:w-3xl md:bg-emerald-900 bg-emerald-900 w-full md:rounded rounded'>
      <p className="text-lg justify-center flex mt-3">Enter your details!</p>
      <div className='justify-center flex items-center flex-col h-90'>
      <input
        {...register("username")}
        className="input  p-3 border md:w-2xl w-fit"
        placeholder="username"
      />
      <FormError error={errors.username?.message} />
      <input
        {...register("password")}
        className="input p-3 border md:w-2xl w-fit mt-10"
        placeholder="password"
      />
      <FormError error={errors.password?.message} />
      <button type="submit" className="button mt-8">
        Create
      </button>
      </div>
      </div>
    </form>
  );
};

export default SignUpForm;
