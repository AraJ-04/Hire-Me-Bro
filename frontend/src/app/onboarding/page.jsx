// src/app/onboarding/page.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  
  // React State for selections
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [workPreference, setWorkPreference] = useState("Hybrid Preferred");
  
  // City Input State
  const [cityInput, setCityInput] = useState("");
  const [targetCities, setTargetCities] = useState(["San Francisco, CA", "New York, NY", "London, UK"]);

  // Search State
  const [industrySearch, setIndustrySearch] = useState("");

  const canvasRef = useRef(null);

  // Background Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles = [];
    let animationFrameId;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: 20 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000666";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Data Collections
  const roles = [
    "Software Engineer", "Product Manager", "Data Scientist", 
    "Frontend Architect", "Engineering Manager", 
    "Cloud Solutions Architect", "UX Researcher"
  ];

  const allIndustries = [
    { name: "Fintech", icon: "account_balance" },
    { name: "AI & ML", icon: "psychology" },
    { name: "SaaS", icon: "cloud" },
    { name: "Healthtech", icon: "medical_services" },
    { name: "Clean Energy", icon: "bolt" },
    { name: "E-commerce", icon: "shopping_cart" },
    { name: "Cybersecurity", icon: "security" },
    { name: "EdTech", icon: "school" },
    { name: "Web3 & Crypto", icon: "currency_bitcoin" },
    { name: "Gaming", icon: "sports_esports" },
    { name: "Aerospace", icon: "rocket_launch" },
    { name: "Automotive", icon: "directions_car" }
  ];

  // Filter logic for the search bar
  const filteredIndustries = allIndustries.filter(ind => 
    ind.name.toLowerCase().includes(industrySearch.toLowerCase())
  );

  // Handlers
  const toggleRole = (role) => {
    setSelectedRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const toggleIndustry = (industry) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const handleAddCity = (e) => {
    if (e.key === "Enter" && cityInput.trim() !== "") {
      if (!targetCities.includes(cityInput.trim())) {
        setTargetCities([...targetCities, cityInput.trim()]);
      }
      setCityInput("");
    }
  };

  const removeCity = (cityToRemove) => {
    setTargetCities(targetCities.filter(city => city !== cityToRemove));
  };

  return (
    <div className="bg-[#fbf8ff] text-[#1b1b21] font-sans min-h-screen flex overflow-hidden selection:bg-[#bdc2ff]">
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />

      {/* SideNavBar Anchor */}
      <aside className="fixed h-screen w-[280px] left-0 top-0 bg-[#f5f2fb] border-r border-[#c6c5d3] flex flex-col gap-2 p-6 z-40 shadow-sm">
        
        {/* Adjusted Logo */}
        <div className="mb-12 px-2">
          <Link href="/" className="block">
            <img src="/screen.png" alt="Hire Me Bro Logo" className="h-16 w-auto object-contain mix-blend-multiply scale-[1.8] origin-left ml-2" />
          </Link>
        </div>
        
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e0e0ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#353e91] text-[32px]">account_circle</span>
          </div>
          <div>
            <p className="text-sm font-bold text-black">Onboarding</p>
            <p className="text-[12px] text-[#464651]">Step 2 of 4</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-grow">
          <div className="flex items-center gap-3 px-4 py-3 text-[#464651] opacity-70 rounded-xl cursor-default">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-medium">Profile Details</span>
            <span className="ml-auto material-symbols-outlined text-[#000000] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 bg-[#e0e0ff] text-[#353e91] font-bold rounded-xl shadow-sm cursor-default">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>target</span>
            <span className="text-sm">Career Goals</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 text-[#464651] hover:bg-[#eae7ef] transition-all rounded-xl group cursor-pointer">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">share</span>
            <span className="text-sm font-medium">Data Connection</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 text-[#464651] hover:bg-[#eae7ef] transition-all rounded-xl group cursor-pointer">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">fact_check</span>
            <span className="text-sm font-medium">Review</span>
          </div>
        </nav>

        <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-[#000666] to-[#4c56af] text-white">
          <p className="text-[11px] font-semibold mb-2 opacity-80">PRO FEATURE</p>
          <p className="text-sm font-bold mb-4">Unlimited AI Interview Simulations</p>
          <button className="w-full py-2 bg-[#ae2f34] text-white rounded-full text-sm font-medium hover:brightness-110 transition-all shadow-md">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="ml-[280px] flex-grow min-h-screen overflow-y-auto px-6 md:px-12 py-12 relative z-10">
        
        {/* TopAppBar */}
        <header className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-black">Define Your Trajectory</h2>
            <p className="text-base text-[#464651]">Tell us where you want to go next. We'll tailor your path accordingly.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-[#c6c5d3] flex items-center justify-center hover:bg-[#efecf5] transition-colors bg-white">
              <span className="material-symbols-outlined text-[#464651]">help</span>
            </button>
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-black uppercase">Step 2 of 4</span>
              <div className="w-32 h-2 bg-[#efecf5] rounded-full mt-1 border border-[#c6c5d4]">
                <div className="h-full w-1/2 bg-gradient-to-r from-[#000666] to-[#4c56af] rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Column: Roles & Industries */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Target Roles */}
            <section className="p-8 rounded-xl bg-white border border-[#c6c5d4] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-black">work_history</span>
                <h3 className="text-xl font-bold text-black">Target Roles</h3>
              </div>
              <p className="text-[#464651] mb-6 text-sm">Which positions are you currently targeting? Select all that apply.</p>
              
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2 
                      ${selectedRoles.includes(role) 
                        ? 'bg-[#010766] text-white border-[#010766]' 
                        : 'bg-white border-[#c6c5d3] text-[#1b1b21] hover:border-black'}`}
                  >
                    {role}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-full border border-dashed border-[#767683] text-[#767683] text-sm font-medium hover:bg-[#f5f2fb] transition-all">
                  + Add Custom Role
                </button>
              </div>
            </section>

            {/* Preferred Industries with Search */}
            <section className="p-8 rounded-xl bg-white border border-[#c6c5d4] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-black">domain</span>
                  <h3 className="text-xl font-bold text-black">Preferred Industries</h3>
                </div>
                
                {/* Industry Search Bar */}
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#767683] text-[18px]">search</span>
                  <input 
                    type="text" 
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    placeholder="Search industries..." 
                    className="w-full pl-9 pr-4 py-2 bg-[#f5f2fb] border border-[#c6c5d3] rounded-lg focus:ring-2 focus:ring-[#010766] focus:border-[#010766] outline-none transition-all text-sm"
                  />
                </div>
              </div>
              
              {/* Scrollable Grid Container */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[260px] overflow-y-auto pr-2 pb-2">
                {filteredIndustries.length > 0 ? (
                  filteredIndustries.map((ind) => (
                    <div 
                      key={ind.name}
                      onClick={() => toggleIndustry(ind.name)}
                      className="relative group cursor-pointer h-24"
                    >
                      <div className={`w-full h-full p-3 rounded-xl border bg-white transition-all hover:shadow-md flex flex-col items-center justify-center text-center gap-1 
                        ${selectedIndustries.includes(ind.name) ? 'border-[#010766] ring-1 ring-[#010766] bg-[#f8f9ff]' : 'border-[#c6c5d3]'}`}
                      >
                        <span className="material-symbols-outlined text-[#ae2f34] text-2xl">{ind.icon}</span>
                        <span className="text-sm font-bold">{ind.name}</span>
                      </div>
                      
                      {selectedIndustries.includes(ind.name) && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#010766] text-white rounded-full flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-[#c6c5d3] text-4xl">search_off</span>
                    <p className="text-[#464651] text-sm">No industries found matching &quot;{industrySearch}&quot;</p>
                    <button className="mt-2 text-sm text-[#010766] font-semibold hover:underline">
                      + Add Custom Industry
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Column: Geography */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-xl bg-white border border-[#c6c5d4] shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-black">location_on</span>
                <h3 className="text-xl font-bold text-black">Geography</h3>
              </div>

              {/* Work Preferences */}
              <div className="space-y-3 mb-6">
                {['Remote Only', 'Hybrid Preferred', 'In-Office Only'].map((pref) => (
                  <label key={pref} className="flex items-center justify-between p-3 rounded-lg border border-[#c6c5d3] hover:bg-[#f5f2fb] transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#464651]">
                        {pref === 'Remote Only' ? 'distance' : pref === 'Hybrid Preferred' ? 'home_work' : 'corporate_fare'}
                      </span>
                      <span className="text-sm font-medium text-black">{pref}</span>
                    </div>
                    <input 
                      type="radio" 
                      name="workPreference"
                      value={pref}
                      checked={workPreference === pref}
                      onChange={(e) => setWorkPreference(e.target.value)}
                      className="w-4 h-4 text-[#010766] focus:ring-[#010766]" 
                    />
                  </label>
                ))}
              </div>

              {/* Target Cities */}
              <div className="space-y-2 flex-grow">
                <p className="text-[11px] font-bold text-[#464651] uppercase tracking-wide">Target Cities</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#767683]">search</span>
                  <input 
                    type="text" 
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={handleAddCity}
                    placeholder="Press Enter to add..." 
                    className="w-full pl-10 pr-4 py-2 bg-[#f5f2fb] border border-[#c6c5d3] rounded-lg focus:ring-2 focus:ring-[#010766] focus:border-[#010766] outline-none transition-all text-sm"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {targetCities.map((city) => (
                    <span key={city} className="flex items-center gap-1 px-2 py-1 bg-[#efecf5] text-[12px] font-bold text-black rounded-md border border-[#c6c5d4]">
                      {city} 
                      <button onClick={() => removeCity(city)} className="material-symbols-outlined text-[14px] hover:text-[#ae2f34]">close</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Map */}
              <div className="mt-8 relative h-32 w-full rounded-xl overflow-hidden border border-[#c6c5d3]">
                <div 
                  className="w-full h-full bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYdJ3A8msV6AiX5vcO1V5cC73THFFxTZStko4PAaWE4LD33NK8CKfzGoAkkoXTRFL2UvBHUsWRDybFg4YHjallcBtRyySvr5moY1ZBjHO2LPunhraElM83629udE80bo-JCkQrUYTL8w7FZBHwxvtszXH-7xD6JTobUtcbloPWEhpbJIl25MXnvFSWKCEnyAuPTos99X8NepymJ-75gn_7x_TAQTD8H95jf_A4mcR2T951RZ2dQfHcyg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
              </div>
            </div>
          </aside>
        </div>

        {/* Sticky Footer Navigation */}
        <footer className="mt-12 flex items-center justify-between p-4 bg-white border border-[#c6c5d4] rounded-xl shadow-lg sticky bottom-6 z-20">
          <Link href="/signup" className="flex items-center gap-2 px-6 py-2 border border-[#767683] text-[#464651] rounded-full text-sm font-medium hover:bg-[#f5f2fb] transition-all">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-[#464651] text-sm italic hidden md:block">Saving progress...</span>
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-8 py-2.5 bg-[#000000] text-white rounded-full text-sm font-bold hover:shadow-xl active:scale-95 transition-all shadow-md group"
            >
              Next Step
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}