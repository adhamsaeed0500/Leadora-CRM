"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema } from "../schemas/auth.schema";
import type { RegisterFormValues } from "../types/auth.types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputField } from "./input-field";
import { PasswordInput } from "./password-input";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password", "");

  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score += 33;
    if (/[A-Z]/.test(pwd)) score += 33;
    if (/[0-9]/.test(pwd)) score += 34;
    return score;
  };

  const strength = calculatePasswordStrength(password);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    console.log("Register data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h2>
        <p className="text-muted font-medium text-sm leading-relaxed">
          Start your 14-day free trial. <br/> No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <InputField
            id="companyName"
            label="Company Name"
            placeholder="Acme Inc."
            {...register("companyName")}
            errorText={errors.companyName?.message}
          />
          <InputField
            id="fullName"
            label="Full Name"
            placeholder="John Doe"
            {...register("fullName")}
            errorText={errors.fullName?.message}
          />
          <InputField
            id="email"
            label="Work Email"
            placeholder="name@company.com"
            type="email"
            {...register("email")}
            errorText={errors.email?.message}
          />
          <div className="space-y-3">
            <PasswordInput
              id="password"
              label="Password"
              placeholder="••••••••"
              {...register("password")}
              errorText={errors.password?.message}
            />
            {/* 3-Segment Password Strength Indicator (Blue highlighted in design) */}
            <div className="space-y-2">
               <div className="flex h-1 gap-1.5 w-full">
                  {[33, 66, 100].map((step) => (
                     <div
                        key={step}
                        className={cn(
                           "h-full w-full rounded-full transition-all duration-500",
                           strength >= step
                              ? "bg-primary"
                              : "bg-surface-low"
                        )}
                     />
                  ))}
               </div>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted opacity-40">
                  {strength < 33 ? "Weak" : strength < 100 ? "Moderate" : "Strong"} Security
               </p>
            </div>
          </div>
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            errorText={errors.confirmPassword?.message}
          />
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-xs font-medium leading-relaxed cursor-pointer text-muted/80">
            I agree to the{" "}
            <Link href="/terms" className="text-foreground font-bold hover:text-primary transition-premium underline decoration-border-ghost underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-foreground font-bold hover:text-primary transition-premium underline decoration-border-ghost underline-offset-4">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full text-sm font-bold tracking-wide"
          isLoading={isLoading}
          disabled={!isValid || isLoading}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}
