"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Zap, Mail, Lock } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-12 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.7_0.2_200_/_0.05)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_oklch(0.22_0.02_260_/_0.2)_1px,_transparent_1px)] bg-[size:48px_48px]" />

      <FadeIn direction="scale" className="relative w-full max-w-sm">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_0_60px_oklch(0_0_0_/_0.4)]">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-1">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm text-center mb-8">
              Sign in to your GadgetHub account
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="pl-9 bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-9 bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_oklch(0.7_0.2_200_/_0.2)]"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              No account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </FadeIn>
    </main>
  );
}
