// src/app/page.js
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const animateItems = document.querySelectorAll(
      ".grid > div, section h2, section p"
    );
    animateItems.forEach((item) => {
      item.classList.add(
        "transition-all",
        "duration-700",
        "opacity-0",
        "translate-y-10"
      );
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#fbf8ff] text-[#1b1b21] overflow-x-hidden min-h-screen">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#c6c5d4]">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
          <div className="flex items-center gap-4">
           <Link href="/" className="flex items-center">
           <img src="/screen.png" alt="Hire Me Bro Logo" className="h-16 w-auto object-contain mix-blend-multiply scale-[1.8] ml-6" />
           </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-base text-[#ae2f34] font-bold border-b-2 border-[#ae2f34] pb-1">
              Features
            </a>
            <a href="#stories" className="text-base text-[#464651] hover:text-[#ae2f34] transition-colors">
              Success Stories
            </a>
            <Link href="/pricing" className="text-base text-[#464651] hover:text-[#ae2f34] transition-colors">
            Pricing
            </Link>
            <Link href="/login" className="text-base text-[#464651] hover:text-[#ae2f34] transition-colors">
              Login
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="pt-24">
        {/* Section 1: Hero */}
        <section className="relative px-6 py-12 md:py-32 flex flex-col items-center text-center max-w-7xl mx-auto">
          {/* Hero Glow */}
          <div className="absolute -top-24 -z-10 w-full h-[600px] rounded-full blur-[120px] opacity-15 bg-[radial-gradient(circle,_#ae2f34_0%,_#000666_100%)]" />

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#efecf5] border border-[#c6c5d3]">
            <span className="w-2 h-2 rounded-full bg-[#ff6b6b] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#464651]">
              AI-Powered Career Tracking
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 max-w-3xl leading-tight">
            Your AI-Native <span className="text-[#ae2f34]">Career Accelerator.</span>
          </h1>

          <p className="text-lg text-[#464651] mb-8 max-w-2xl">
            From students to pros: automate your resume, bridge skill gaps, and land your dream job with autonomous AI. Built for the modern tech landscape.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/signup"
              className="bg-[#ae2f34] text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
            >
              Start Your Journey
              <span className="material-symbols-outlined">trending_flat</span>
            </Link>
            <button className="bg-white text-black border border-[#c6c5d4] px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#efecf5] transition-all">
              <span className="material-symbols-outlined">play_circle</span>
              Watch How It Works
            </button>
          </div>

          {/* UI Mockup */}
          <div className="w-full max-w-5xl mt-8 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-[#c6c5d3] bg-white">
              <div className="h-8 bg-[#efecf5] flex items-center px-4 gap-2 border-b border-[#c6c5d3]">
                <div className="w-3 h-3 rounded-full bg-[#ba1a1a]" />
                <div className="w-3 h-3 rounded-full bg-[#FF9800]" />
                <div className="w-3 h-3 rounded-full bg-[#4c56af]" />
              </div>
              <img
                className="w-full aspect-video object-cover"
                alt="Dashboard Mockup"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfap9FATx8ZmlXTmdEfVmlCCVSIE9CSktCY0RjqrwGO0Q63mpowBq1E_5kWa90rdM1CCDfPzrOnazsgEGAnqN2d8qAiCttBlPvZwGelY1YD8jyhdPmJ9cUk8Qrxfx01Jai0jZahlRl6dscsXFYbNlNGoVnGFxVMO5InjNmK7I29kyRJ8fuZy3cY1VgTzzu6phYXF23wkB1Qow2Q5BNDshK9LY-gMu42rmqmiDmzMe6dilp6iyat2P4UvBsTzmw8PWJACBhGBBrE0u7"
              />
            </div>

            {/* Floating Glass Card - BLUR FIXED HERE */}
            <div
              className="absolute -right-8 -bottom-8 hidden lg:block w-64 bg-white p-5 rounded-xl border border-[#c6c5d4] shadow-xl animate-bounce"
              style={{ animationDuration: "5s" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-black">AI Agent</p>
                  <p className="text-[11px] text-[#464651]">Applying to 12 jobs...</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-[#efecf5] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#000666] to-[#4c56af] w-[65%]" />
                </div>
                <p className="text-[10px] text-right text-[#464651]">Processing Google SDE II</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Ecosystem */}
        <section id="features" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-2">The Core Ecosystem</h2>
            <p className="text-[#464651] max-w-xl mx-auto">
              Everything you need to outpace the competition and streamline your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-white p-6 rounded-xl border border-[#c6c5d4] hover:border-[#ae2f34] transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-[#efecf5] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-black text-2xl">description</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Resume AI</h3>
              <p className="text-[#464651] text-sm mb-4">
                ATS optimization and automated keyword injection tailored for specific job descriptions in milliseconds.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#464651]">
                  <span className="material-symbols-outlined text-[#4c56af] text-sm">check_circle</span>
                  Bullet-point refinement
                </li>
                <li className="flex items-center gap-2 text-xs text-[#464651]">
                  <span className="material-symbols-outlined text-[#4c56af] text-sm">check_circle</span>
                  Industry keyword mapping
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-6 rounded-xl border border-[#c6c5d4] hover:border-[#ae2f34] transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-[#efecf5] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-black text-2xl">terminal</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">GitHub Intelligence</h3>
              <p className="text-[#464651] text-sm mb-4">
                Extract and verify your technical skills directly from your code commits and repository architecture.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#464651]">
                  <span className="material-symbols-outlined text-[#4c56af] text-sm">check_circle</span>
                  Repo-to-Resume mapping
                </li>
                <li className="flex items-center gap-2 text-xs text-[#464651]">
                  <span className="material-symbols-outlined text-[#4c56af] text-sm">check_circle</span>
                  Skill density visualization
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-6 rounded-xl border border-[#c6c5d4] hover:border-[#ae2f34] transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-[#efecf5] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-black text-2xl">rocket_launch</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Autonomous Apply</h3>
              <p className="text-[#464651] text-sm mb-4">
                A set-and-forget system that finds and applies to relevant jobs for you while you sleep.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#464651]">
                  <span className="material-symbols-outlined text-[#4c56af] text-sm">check_circle</span>
                  Smart filter automation
                </li>
                <li className="flex items-center gap-2 text-xs text-[#464651]">
                  <span className="material-symbols-outlined text-[#4c56af] text-sm">check_circle</span>
                  Daily application reports
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Skill Gap & Roadmaps */}
        <section className="py-16 bg-[#f5f2fb] px-6 md:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black mb-4">
                Don't Just Search. <br />
                <span className="text-[#ae2f34]">Upskill.</span>
              </h2>
              <p className="text-base text-[#464651] mb-6">
                Visualize your path to top tech roles with AI-curated learning paths. Our platform identifies the gap between your current profile and market demand.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-[#c6c5d4] flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#010766] text-white rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined">map</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-black">Dynamic Career Roadmap</h4>
                    <p className="text-xs text-[#464651]">Adaptive paths based on hiring trends.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c6c5d4] flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#ffdad8] text-[#410006] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-black">Market Demand Tracking</h4>
                    <p className="text-xs text-[#464651]">Know exactly which skills pay more today.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Bars Card */}
            <div className="flex-1 w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border border-[#c6c5d3]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-black">Your Growth Map</h3>
                <span className="text-xs px-2.5 py-1 bg-[#efecf5] rounded text-[#464651]">
                  L5 Senior Engineer
                </span>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>System Design</span>
                    <span className="text-[#ae2f34]">92%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#efecf5] rounded-full">
                    <div className="h-full bg-gradient-to-r from-[#000666] to-[#4c56af] w-[92%] rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Distributed Systems</span>
                    <span className="text-[#ae2f34]">64%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#efecf5] rounded-full">
                    <div className="h-full bg-gradient-to-r from-[#000666] to-[#4c56af] w-[64%] rounded-full" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#8c151f] bg-[#ffdad8] px-2 py-0.5 rounded w-fit mt-1">
                    <span className="material-symbols-outlined text-[12px]">bolt</span>
                    Priority: High Gap
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Kubernetes / Cloud</span>
                    <span className="text-[#ae2f34]">45%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#efecf5] rounded-full">
                    <div className="h-full bg-gradient-to-r from-[#000666] to-[#4c56af] w-[45%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Stats */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold mb-2">10k+</div>
              <div className="text-[#bdc2ff] text-xs tracking-widest uppercase font-semibold">
                Careers Accelerated
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">45%</div>
              <div className="text-[#bdc2ff] text-xs tracking-widest uppercase font-semibold">
                Faster Hiring
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">92%</div>
              <div className="text-[#bdc2ff] text-xs tracking-widest uppercase font-semibold">
                ATS Pass Rate
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto bg-[#e4e1ea] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Ready to Maximize Your Career?
            </h2>
            <p className="text-base text-[#464651] mb-8 max-w-xl mx-auto">
              Join thousands of professionals who have used Hire Me Bro to automate their search and land high-paying tech roles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Get Started for Free
              </Link>
              <a
                href="#stories"
                className="bg-white border border-[#c6c5d4] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#efecf5] transition-colors"
              >
                View Success Stories
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white border-t border-[#c6c5d4]">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-lg font-bold text-black">Hire Me Bro</span>
          <p className="text-xs text-[#464651]">© 2026 Hire Me Bro. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#464651]">
          <a href="#" className="hover:text-[#ae2f34]">About Us</a>
          <a href="#" className="hover:text-[#ae2f34]">Careers</a>
          <a href="#" className="hover:text-[#ae2f34]">Privacy Policy</a>
          <a href="#" className="hover:text-[#ae2f34]">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}