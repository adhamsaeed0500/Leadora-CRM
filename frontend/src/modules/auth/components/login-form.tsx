"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema } from "../schemas/auth.schema";
import type { LoginFormValues } from "../types/auth.types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputField } from "./input-field";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    console.log("Login data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <InputField
          id="email"
          label="Email"
          placeholder="name@company.com"
          type="email"
          {...register("email")}
          errorText={errors.email?.message}
        />
        <div className="space-y-1">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            {...register("password")}
            errorText={errors.password?.message}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary hover:opacity-80 transition-premium"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="rememberMe" {...register("rememberMe")} />
        <Label htmlFor="rememberMe" className="text-xs font-medium cursor-pointer">
          Remember this session
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        disabled={!isValid || isLoading}
      >
        Sign In to Dashboard
      </Button>

      <p className="text-center text-sm font-medium text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:opacity-80 transition-premium underline underline-offset-4"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}
