import { RegisterForm } from "@/modules/auth/components/register-form";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Create Account | Leadora CRM",
   description: "Join Leadora and start architecting your conversion flows.",
};

export default function RegisterPage() {
   return (
      <main className="min-h-screen w-full flex flex-col bg-[#F8F9FA] font-sans selection:bg-primary/10">
         <header className="sticky top-0 w-full bg-white z-50 border-b border-border-ghost/30 shadow-sm px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
               <div className="relative h-10 w-10 transition-premium group-hover:scale-110">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                     {/* The logo is an 'L' + House + Arrow */}
                     <path d="M25 20 V80 H80 V65 H40 V20 Z" fill="#1e293b" /> {/* Abstract L */}
                     <path d="M45 50 L65 30 L85 50 V80 H45 Z" fill="#d4af37" /> {/* House Shape */}
                     <path d="M45 50 L65 30 L85 50" fill="none" stroke="#d4af37" strokeWidth="8" strokeLinecap="round" />
                     <path d="M20 85 Q40 85 60 45" fill="none" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" /> {/* Arrow curve */}
                     <path d="M60 45 L52 48 L62 40 L65 52 Z" fill="#d4af37" /> {/* Arrow head */}
                  </svg>
               </div>
               <div className="flex flex-col -space-y-1">
                  <span className="text-xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-premium uppercase">
                     Leadora
                  </span>
                  <span className="text-[8px] font-black tracking-[0.4em] text-primary self-start pl-1 opacity-80">
                     CRM
                  </span>
               </div>
            </Link>
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted opacity-60">
               ALREADY HAVE AN ACCOUNT?{" "}
               <Link href="/login" className="text-foreground hover:text-primary transition-premium">
                  LOG IN
               </Link>
            </p>
         </header>

         <div className="flex flex-1">
            {/* Left Column: Marketing / Brand (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 flex-col justify-start pt-16 px-12 xl:px-24">
               <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="space-y-2 mb-10">
                     <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
                        Architecting Success
                     </span>
                     <h1 className="text-6xl font-black leading-[1.1] tracking-tight text-foreground">
                        From <span className="text-primary italic">Lead</span> to{" "}
                        <span className="text-primary italic">Deal.</span>
                     </h1>
                  </div>

                  <p className="text-lg text-muted/80 leading-relaxed mb-12 max-w-md font-medium">
                     Experience the fluid architect of conversion. Build, manage, and
                     scale your sales pipeline with editorial precision.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                     {/* Feature Card 1 */}
                     <div className="p-6 rounded-xl bg-white/50 border border-border-ghost/10 transition-premium hover:bg-white hover:shadow-premium group">
                        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center mb-4 transition-premium group-hover:scale-110">
                           <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                           >
                              <rect x="3" y="12" width="18" height="9" rx="2" />
                              <path d="M7 8v4M12 4v8M17 6v6" />
                           </svg>
                        </div>
                        <h3 className="font-bold text-foreground mb-1">Precision Data</h3>
                        <p className="text-xs text-muted/70 font-medium leading-normal">
                           Architect-grade analytics for every stage.
                        </p>
                     </div>
                     {/* Feature Card 2 */}
                     <div className="p-6 rounded-xl bg-white/50 border border-border-ghost/10 transition-premium hover:bg-white hover:shadow-premium group">
                        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center mb-4 transition-premium group-hover:scale-110">
                           <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                           >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                           </svg>
                        </div>
                        <h3 className="font-bold text-foreground mb-1">Fluid Motion</h3>
                        <p className="text-xs text-muted/70 font-medium leading-normal">
                           Seamless transitions between lead states.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start pt-0 p-8 md:p-16 lg:p-24 relative overflow-hidden">
               {/* Subtle Background Glow for the Form side */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/[0.02] blur-[120px] pointer-events-none" />

               <Card className="max-w-[440px] mx-auto w-full p-8 md:p-10 border-none shadow-premium relative z-10 bg-white animate-in fade-in slide-in-from-bottom-8 duration-1000 lg:mt-[-2rem]">
                  <RegisterForm />
               </Card>
            </div>
         </div>

         <footer className="bottom-0 w-full bg-white z-50 border-t border-border-ghost/30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-6 h-16 flex items-center justify-center">
            <p className="text-[10px] font-bold tracking-[0.3em] text-muted opacity-60 uppercase">
               © 2024 THE FLUID ARCHITECT. PRECISION IN MOTION.
            </p>
         </footer>
      </main>
   );
}
