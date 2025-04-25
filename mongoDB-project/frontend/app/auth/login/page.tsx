"use client";
import Link from "next/link";
import LogInForm from "./loginForm";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LogInForm />
      <Link className="text-black p-2.5" href="/auth/signup">Dont have an account? Sign up here</Link>
    </div>
  );
};

export default Login;
