import React from 'react';
import { Sparkles, ArrowRight, Monitor, Laptop, Smartphone, Wand2 } from 'lucide-react';

export default function LandingPage({ onCreateClick }) {
  return (
    <div className="relative min-height-screen bg-[#0b0f19] text-white flex flex-col justify-between overflow-hidden">
      {/* Decorative gradient background glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            VoiceStore
          </span>
        </div>
        <button 
          onClick={onCreateClick}
          className="glass-light hover:bg-white/10 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 active:scale-95"
        >
          Launch App
        </button>
      </header>

      {/* Main Hero Body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 py-12 lg:py-24 relative z-10">
        {/* Left Hero Column */}
        <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Wand2 className="w-3.5 h-3.5" />
            AI-Powered Site Generation
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-left">
            Describe your business. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Instantly get a website.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed text-left">
            Just type or speak a description of your business, services, and details. VoiceStore instantly drafts, structures, and styles a beautiful, premium website preview tailored exactly to your brand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-start">
            <button
              onClick={onCreateClick}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span>Create Website</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                onCreateClick();
              }}
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold hover:bg-slate-800/40 transition-all duration-300 active:scale-95"
            >
              Try Mock Demo
            </a>
          </div>

          {/* Social Proof Features */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 text-left">
            <div>
              <p className="font-display text-2xl font-bold text-white">Zero</p>
              <p className="text-slate-500 text-xs mt-1">Code Required</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">4 Themes</p>
              <p className="text-slate-500 text-xs mt-1">Dynamic Styling</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">Instant</p>
              <p className="text-slate-500 text-xs mt-1">Interactive Preview</p>
            </div>
          </div>
        </div>

        {/* Right Hero Column: Premium Interactive Mockup */}
        <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
          <div className="relative mx-auto w-full aspect-[4/3] rounded-2xl glass p-3 border border-slate-700/50 shadow-2xl">
            {/* Window bar */}
            <div className="flex justify-between items-center px-3 pb-3 border-b border-slate-800/60 mb-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="glass-light rounded-md text-[10px] px-8 py-0.5 text-slate-500 tracking-wider">
                voicestore.ai/preview
              </div>
              <div className="flex gap-1 text-slate-600">
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <Laptop className="w-3.5 h-3.5" />
                <Smartphone className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Inner frame mock content */}
            <div className="h-[calc(100%-40px)] w-full rounded-lg bg-[#0e1321] p-6 flex flex-col justify-between relative overflow-hidden group/frame">
              {/* Decorative light elements inside preview */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl" />
              
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/40">
                <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
                <div className="flex gap-3">
                  <div className="h-3 w-10 bg-slate-850 rounded" />
                  <div className="h-3 w-10 bg-slate-850 rounded" />
                  <div className="h-3 w-12 bg-indigo-900/40 rounded-full" />
                </div>
              </div>

              {/* Mock Hero Area */}
              <div className="space-y-4 my-auto py-4">
                <div className="h-8 w-[70%] bg-gradient-to-r from-slate-200 to-slate-400 rounded-md animate-pulse" />
                <div className="h-3 w-[90%] bg-slate-800 rounded" />
                <div className="h-3 w-[80%] bg-slate-800 rounded" />
                <div className="h-3 w-[50%] bg-slate-800 rounded" />
                <div className="h-8 w-28 bg-indigo-600/80 rounded-md mt-6 shadow-lg shadow-indigo-500/10" />
              </div>

              {/* Service Cards Grid Mockup */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#141b2e] p-3 rounded-lg border border-slate-800/60 flex flex-col justify-between h-20">
                  <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <div className="h-2 w-12 bg-slate-700 rounded" />
                </div>
                <div className="bg-[#141b2e] p-3 rounded-lg border border-slate-800/60 flex flex-col justify-between h-20">
                  <div className="w-5 h-5 rounded bg-pink-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-pink-400" />
                  </div>
                  <div className="h-2 w-12 bg-slate-700 rounded" />
                </div>
                <div className="bg-[#141b2e] p-3 rounded-lg border border-slate-800/60 flex flex-col justify-between h-20">
                  <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div className="h-2 w-12 bg-slate-700 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Side Floating Badge */}
          <div className="absolute top-10 left-[-30px] sm:left-[-40px] bg-[#1a233a] border border-slate-700/80 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Instant Render</p>
              <p className="text-sm font-bold text-white">&lt; 1 Second</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 relative z-10">
        <div>
          © {new Date().getFullYear()} VoiceStore Inc. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
