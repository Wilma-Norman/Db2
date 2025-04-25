"use client";

import { LogInValues, logInSchema } from "../../../lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "@/actions/logIn";
import { handleServerActionError } from "@/lib/errorHandeling";
import FormError from "@/components/FormError/formError";

const LogInForm = () => {
  const { mutate } = useMutation({
    mutationFn: async (values: LogInValues) => {
      handleServerActionError(await LogIn(values));
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex flex-col justify-center items-center gap-12 my-8 p-5"
    >
      <div className='md:w-3xl md:bg-emerald-900 bg-emerald-900 w-full md:rounded rounded'>
      <p className="text-lg justify-center flex mt-3">Enter your details!</p>
      <div className='justify-center flex items-center flex-col h-90'>
      <input
        {...register("username")}
        className="input p-3 border md:w-2xl w-fit"
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
        Log In
      </button>
      </div>
      </div>
    </form>
  );
};

export default LogInForm;
