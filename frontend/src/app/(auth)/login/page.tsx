import { AuthCard } from "@/modules/auth/components/auth-card";
import { LoginForm } from "@/modules/auth/components/login-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Leadora CRM",
  description: "Sign in to your architectural sales dashboard.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8F9FA] p-6 lg:bg-[#F8F9FA]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/[0.01] blur-[120px] pointer-events-none" />

      <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-500 relative z-10">
        <AuthCard
          title="From Lead to Deal"
          subtitle="The Fluid Architect of Conversion"
        >
          <LoginForm />
        </AuthCard>
      </div>
    </main>
  );
}
