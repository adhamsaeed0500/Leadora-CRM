import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-[440px] border-none", className)}>
      <CardHeader className="space-y-4 pb-8 text-center">
        <div className="relative h-16 w-16 mb-6 mx-auto transition-premium hover:scale-110">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* The logo is an 'L' + House + Arrow */}
            <path d="M25 20 V80 H80 V65 H40 V20 Z" fill="#1e293b" /> {/* Abstract L */}
            <path d="M45 50 L65 30 L85 50 V80 H45 Z" fill="#d4af37" /> {/* House Shape */}
            <path d="M45 50 L65 30 L85 50" fill="none" stroke="#d4af37" strokeWidth="8" strokeLinecap="round" />
            <path d="M20 85 Q40 85 60 45" fill="none" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" /> {/* Arrow curve */}
            <path d="M60 45 L52 48 L62 40 L65 52 Z" fill="#d4af37" /> {/* Arrow head */}
          </svg>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted opacity-60">
              {subtitle}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
