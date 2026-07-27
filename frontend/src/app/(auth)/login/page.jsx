// src/app/login/page.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive subtle background movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock network delay, then redirect to Dashboard
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="bg-[#fbf8ff] font-sans text-[#1b1b21] min-h-screen flex flex-col selection:bg-[#bdc2ff]">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-[#fbf8ff]/80 backdrop-blur-md border-b border-[#c6c5d4]">
        <Link href="/" className="flex items-center">
        <img src="/screen.png" alt="Hire Me Bro Logo" className="h-16 w-auto object-contain mix-blend-multiply scale-[1.8] ml-6" />
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-[#464651]">
            Don't have an account?
          </span>
          <Link
            href="/signup"
            className="text-sm font-semibold px-6 py-2.5 rounded-full bg-[#efecf5] hover:bg-[#eae7ef] text-[#000000] transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
        {/* Animated Background Blurs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#e0e0ff]/30 rounded-full blur-[120px] transition-transform duration-75 ease-out"
            style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#ffdad8]/30 rounded-full blur-[120px] transition-transform duration-75 ease-out"
            style={{ transform: `translate(${-mousePos.x * 30}px, ${-mousePos.y * 30}px)` }}
          />
        </div>

        {/* Login Card */}
        <section className="relative z-10 w-full max-w-[480px] bg-white rounded-xl border border-[#c6c5d4] shadow-[0px_4px_12px_rgba(0,6,102,0.05)] p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1b1b21] mb-2">Welcome Back</h1>
            <p className="text-base text-[#464651]">Login to your career accelerator</p>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 px-6 border border-[#c6c5d4] rounded-lg hover:bg-[#f5f2fb] transition-colors duration-200 group">
            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm font-semibold text-[#1b1b21]">Continue with Google</span>
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 py-3.5 px-6 border border-[#c6c5d4] rounded-lg hover:bg-[#f5f2fb] transition-colors duration-200 group mt-3">
            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm font-semibold text-[#1b1b21]">Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#c6c5d4]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-xs font-semibold text-[#464651]">
                or login with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                required
                className="peer w-full h-14 px-4 pt-4 pb-1 bg-white border border-[#c6c5d4] rounded-lg focus:ring-2 focus:ring-[#010766] focus:border-[#010766] transition-all outline-none text-[#1b1b21]"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-[#767683] text-sm transition-all duration-200 pointer-events-none 
                           peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:bg-white peer-focus:px-1 peer-focus:text-[#4e56ab] 
                           peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder=" "
                required
                className="peer w-full h-14 px-4 pt-4 pb-1 bg-white border border-[#c6c5d4] rounded-lg focus:ring-2 focus:ring-[#010766] focus:border-[#010766] transition-all outline-none text-[#1b1b21]"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-[#767683] text-sm transition-all duration-200 pointer-events-none 
                           peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[11px] peer-focus:bg-white peer-focus:px-1 peer-focus:text-[#4e56ab] 
                           peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
              >
                Password
              </label>
            </div>

            <div className="flex items-center justify-end">
              <Link href="#" className="text-sm font-semibold text-[#010766] hover:text-[#4c56af] transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#010766] text-white rounded-full text-sm font-semibold hover:bg-[#000666] transition-all duration-200 shadow-lg shadow-[#010766]/10 flex items-center justify-center disabled:opacity-80"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[#464651] text-sm">
            By logging in, you agree to our{" "}
            <Link href="#" className="underline hover:text-black">Terms of Service</Link> and{" "}
            <Link href="#" className="underline hover:text-black">Privacy Policy</Link>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#c6c5d4] bg-white">
        <div className="text-sm font-semibold text-[#464651]">
          © 2026 Hire Me Bro. AI-powered career advancement.
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-sm font-semibold text-[#464651] hover:text-[#ae2f34] transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm font-semibold text-[#464651] hover:text-[#ae2f34] transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm font-semibold text-[#464651] hover:text-[#ae2f34] transition-colors">
            Contact Support
          </Link>
        </div>
      </footer>
    </div>
  );
}