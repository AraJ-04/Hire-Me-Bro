// src/app/pricing/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PricingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Handle header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to your plan until the end of your current billing period."
    },
    {
      question: "How does the AI apply for me?",
      answer: "Our proprietary autonomous engine identifies roles matching your verified skills and GitHub portfolio. It tailors your CV for each specific role and handles the submission process, keeping you updated in a real-time dashboard."
    },
    {
      question: "Is my GitHub data secure?",
      answer: "Security is our priority. We only use read-only access to analyze your public contributions and code structure to build your skill profile. Your source code is never stored or used for training external models."
    }
  ];

  return (
    <div className="bg-[#fbf8ff] text-[#1b1b21] min-h-screen selection:bg-[#bdc2ff]">
      {/* Top Navigation */}
      <header
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-[#fbf8ff]/80 backdrop-blur-md border-b border-[#c6c5d4] transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
        <img src="/screen.png" alt="Hire Me Bro Logo" className="h-16 w-auto object-contain mix-blend-multiply scale-[1.8] ml-6" />
        </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/#features" className="text-sm text-[#464651] hover:text-[#ae2f34] transition-all duration-200">
              Features
            </Link>
            <Link href="/#stories" className="text-sm text-[#464651] hover:text-[#ae2f34] transition-all duration-200">
              Success Stories
            </Link>
            <Link href="/pricing" className="text-sm text-[#ae2f34] font-bold border-b-2 border-[#ae2f34]">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-[#464651] hover:text-[#ae2f34] transition-colors px-4 py-2">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-[#000666] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-all shadow-md"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-6 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_rgba(76,86,175,0.08)_0%,_transparent_70%)]">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-xs font-semibold text-[#ae2f34] uppercase tracking-widest mb-4 block">
              Elevate Your Career
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#000666] to-[#4c56af] text-transparent bg-clip-text">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-[#464651] max-w-2xl mx-auto">
              Invest in your career growth with AI-powered tools designed to get you hired faster. No hidden fees, just intelligent guidance.
            </p>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#bdc2ff]/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/4 w-64 h-64 bg-[#ffdad8]/20 blur-3xl rounded-full"></div>
        </section>

        {/* Pricing Grid */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-[#fbf8ff]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              
              {/* Starter Plan */}
              <div className="bg-white border border-[#c6c5d4] rounded-xl p-8 flex flex-col shadow-[0_4px_12px_rgba(0,6,102,0.05)] hover:shadow-[0_12px_24px_rgba(0,6,102,0.1)] transition-all duration-300">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Starter</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold">$0</span>
                    <span className="text-[#464651] text-sm font-semibold">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">check_circle</span>
                    <span className="text-sm">1 Resume Analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">check_circle</span>
                    <span className="text-sm">Basic GitHub Insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">check_circle</span>
                    <span className="text-sm">Manual Job Discovery</span>
                  </li>
                </ul>
                <Link href="/signup" className="w-full block text-center border border-black text-black text-sm font-semibold py-3 rounded-full hover:bg-[#efecf5] transition-colors">
                  Get Started Free
                </Link>
              </div>

              {/* Pro Plan (Featured) */}
              <div className="bg-white border-2 border-[#000666] rounded-xl p-8 flex flex-col shadow-[0_4px_12px_rgba(0,6,102,0.05)] hover:shadow-[0_12px_24px_rgba(0,6,102,0.1)] transition-all duration-300 relative scale-100 md:scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ae2f34] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2 text-[#000666]">Pro</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-[#000666]">$29</span>
                    <span className="text-[#464651] text-sm font-semibold">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#ae2f34] text-[20px]">verified</span>
                    <span className="text-sm font-semibold">Unlimited Resume Analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#ae2f34] text-[20px]">verified</span>
                    <span className="text-sm">Deep GitHub Intelligence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#ae2f34] text-[20px]">verified</span>
                    <span className="text-sm">50 Autonomous Applications/mo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#ae2f34] text-[20px]">verified</span>
                    <span className="text-sm">Dynamic Career Roadmap</span>
                  </li>
                </ul>
                <Link href="/signup?plan=pro" className="w-full block text-center bg-[#000666] text-white text-sm font-semibold py-4 rounded-full hover:opacity-90 shadow-md transition-all">
                  Start Pro Trial
                </Link>
              </div>

              {/* Elite Plan */}
              <div className="bg-white border border-[#c6c5d4] rounded-xl p-8 flex flex-col shadow-[0_4px_12px_rgba(0,6,102,0.05)] hover:shadow-[0_12px_24px_rgba(0,6,102,0.1)] transition-all duration-300">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Elite</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold">$79</span>
                    <span className="text-[#464651] text-sm font-semibold">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">rocket_launch</span>
                    <span className="text-sm">Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">rocket_launch</span>
                    <span className="text-sm font-semibold">Unlimited Autonomous Applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">rocket_launch</span>
                    <span className="text-sm">1:1 AI Interview Coaching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-[20px]">rocket_launch</span>
                    <span className="text-sm">Priority Support</span>
                  </li>
                </ul>
                <Link href="/signup?plan=elite" className="w-full block text-center bg-[#1b1b21] text-white text-sm font-semibold py-3 rounded-full hover:opacity-90 transition-all">
                  Get Elite Access
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#f5f2fb] py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-[#c6c5d4] overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold">{faq.question}</span>
                    <span
                      className={`material-symbols-outlined transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#464651] text-sm">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-[#000666] text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to land your dream role?</h2>
            <p className="text-[#747cd3] mb-8 text-lg">
              Join 10,000+ engineers using Hire Me Bro to bypass the application grind.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="bg-[#ae2f34] text-white px-8 py-4 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform text-center">
                Start Your Free Trial
              </Link>
              <Link href="/contact" className="bg-[#010766] text-[#747cd3] border border-[#010766] px-8 py-4 rounded-full text-sm font-semibold hover:bg-opacity-80 transition-colors text-center">
                Talk to Career Coach
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"></div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-white border-t border-[#c6c5d4]">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="text-xl font-bold text-black">Hire Me Bro</span>
          <p className="text-sm font-semibold text-[#464651] opacity-80">
            © 2026 Hire Me Bro. AI-powered career advancement.
          </p>
        </div>
        <div className="flex gap-6 items-center flex-wrap justify-center">
          <Link href="/about" className="text-sm font-semibold text-[#767683] hover:text-[#ae2f34] transition-all opacity-80 hover:opacity-100">
            About Us
          </Link>
          <Link href="/privacy" className="text-sm font-semibold text-[#767683] hover:text-[#ae2f34] transition-all opacity-80 hover:opacity-100">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm font-semibold text-[#767683] hover:text-[#ae2f34] transition-all opacity-80 hover:opacity-100">
            Terms of Service
          </Link>
          <Link href="/support" className="text-sm font-semibold text-[#767683] hover:text-[#ae2f34] transition-all opacity-80 hover:opacity-100">
            Contact Support
          </Link>
        </div>
      </footer>
    </div>
  );
}