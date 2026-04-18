"use client";

import Link from "next/link";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { SignUpFormData, signUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export function SignUpFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setApiError("");
      setSuccessMessage("");
      setIsLoading(true);

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await authService.register(payload);

      setSuccessMessage(
        "Account created successfully. Redirecting to login...",
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
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
      <h2 className="mb-2 text-3xl font-bold text-slate-900">Create Account</h2>
      <p className="mb-6 text-sm text-slate-500">
        Register to start managing your tasks.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              onChange: () => {
                setApiError("");
                setSuccessMessage("");
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              onChange: () => {
                setApiError("");
                setSuccessMessage("");
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Create password"
            {...register("password", {
              onChange: () => {
                setApiError("");
                setSuccessMessage("");
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              onChange: () => {
                setApiError("");
                setSuccessMessage("");
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {apiError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {apiError}
          </p>
        )}

        {successMessage && (
          <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-600">
            {successMessage}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
