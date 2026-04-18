"use client";

import Link from "next/link";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function LoginFormComponent() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError("");
      setIsLoading(true);

      const response = await authService.login(data);

      setAuth({
        user: response.user,
        authAccessToken: response.authAccessToken,
        refreshToken: response.refreshToken,
      });
      router.push("/dashboard");
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-2 text-3xl font-bold text-slate-900">Welcome Back!</h2>
      <p className="mb-6 text-sm text-slate-500">
        Sign in to continue managing your tasks.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              onChange: () => setApiError(""),
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        {apiError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {apiError}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In" : "Sign In"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
