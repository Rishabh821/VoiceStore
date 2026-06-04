import React from 'react';
import { 
  Phone, Clock, MapPin, CheckCircle2, ChevronRight, Star, Heart, 
  ShieldCheck, ShoppingBag, Coffee, Palette, Calendar, MessageSquare, 
  Send, Users, Award, ExternalLink 
} from 'lucide-react';

export default function TemplateRenderer({ data, variant = 1 }) {
  const { businessName, description, services, phone, hours, address, category, accentColor } = data;

  // Theme styling definitions for categories
  const themeConfig = {
    eatery: {
      bg: "bg-[#fcfaf7] text-[#2c1d11]",
      headerBg: "bg-amber-900/5 border-b border-amber-900/10",
      accentText: "text-amber-800",
      accentBg: "bg-amber-700 hover:bg-amber-800 text-white",
      cardBg: "bg-white border border-amber-100 shadow-sm",
      iconColor: "text-amber-700 bg-amber-50",
      buttonSecondary: "border border-amber-800 text-amber-900 hover:bg-amber-50",
      footerBg: "bg-amber-950 text-amber-100/80",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      tagline: "Freshly Made & Handcrafted Daily",
      badgeIcon: Coffee
    },
    creative: {
      bg: "bg-[#04060c] text-slate-300",
      headerBg: "bg-slate-950/50 border-b border-slate-900",
      accentText: "text-purple-400",
      accentBg: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
      cardBg: "bg-slate-900/60 border border-slate-800 hover:border-slate-700",
      iconColor: "text-purple-400 bg-purple-950/80",
      buttonSecondary: "border border-slate-700 text-slate-300 hover:bg-slate-900",
      footerBg: "bg-slate-950 text-slate-500",
      fontDisplay: "font-display",
      fontBody: "font-sans",
      tagline: "Designing the Next Digital Frontier",
      badgeIcon: Palette
    },
    wellness: {
      bg: "bg-[#f5fbf7] text-emerald-950",
      headerBg: "bg-emerald-950/5 border-b border-emerald-950/10",
      accentText: "text-emerald-800",
      accentBg: "bg-emerald-700 hover:bg-emerald-850 text-white",
      cardBg: "bg-white border border-emerald-100 hover:border-emerald-250",
      iconColor: "text-emerald-750 bg-emerald-50",
      buttonSecondary: "border border-emerald-700 text-emerald-900 hover:bg-emerald-50",
      footerBg: "bg-emerald-950 text-emerald-100/70",
      fontDisplay: "font-sans font-semibold tracking-tight",
      fontBody: "font-sans",
      tagline: "Revitalize Your Mind, Body & Soul",
      badgeIcon: Heart
    },
    professional: {
      bg: "bg-slate-50 text-slate-900",
      headerBg: "bg-white border-b border-slate-200 shadow-sm",
      accentText: "text-blue-800",
      accentBg: "bg-blue-700 hover:bg-blue-800 text-white",
      cardBg: "bg-white border border-slate-200",
      iconColor: "text-blue-700 bg-blue-50",
      buttonSecondary: "border border-slate-350 text-slate-700 hover:bg-slate-100",
      footerBg: "bg-slate-900 text-slate-400",
      fontDisplay: "font-sans font-extrabold tracking-tight",
      fontBody: "font-sans",
      tagline: "Dependable Experts at Your Service",
      badgeIcon: ShieldCheck
    },
    general: {
      bg: "bg-[#fafafa] text-slate-800",
      headerBg: "bg-white border-b border-slate-150 shadow-sm",
      accentText: "text-indigo-700",
      accentBg: "bg-indigo-700 hover:bg-indigo-800 text-white",
      cardBg: "bg-white border border-slate-200 hover:border-indigo-150",
      iconColor: "text-indigo-700 bg-indigo-50",
      buttonSecondary: "border border-slate-355 text-slate-700 hover:bg-slate-50",
      footerBg: "bg-slate-900 text-slate-400",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      tagline: "Quality Materials & Smart Values",
      badgeIcon: ShoppingBag
    }
  };

  // Custom accent color overrides
  const colorOverrides = {
    indigo: {
      accentText: "text-indigo-700 dark:text-indigo-400",
      accentBg: "bg-indigo-700 hover:bg-indigo-800 text-white shadow-md shadow-indigo-500/10",
      iconColor: "text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40",
      buttonSecondary: "border border-indigo-700 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-50/50"
    },
    amber: {
      accentText: "text-amber-700 dark:text-amber-400",
      accentBg: "bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-500/10",
      iconColor: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40",
      buttonSecondary: "border border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-50/50"
    },
    emerald: {
      accentText: "text-emerald-700 dark:text-emerald-400",
      accentBg: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-500/10",
      iconColor: "text-emerald-750 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
      buttonSecondary: "border border-emerald-700 text-emerald-850 dark:text-emerald-300 hover:bg-emerald-50/50"
    },
    rose: {
      accentText: "text-rose-600 dark:text-rose-450",
      accentBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10",
      iconColor: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40",
      buttonSecondary: "border border-rose-600 text-rose-700 dark:text-rose-300 hover:bg-rose-50/50"
    },
    sky: {
      accentText: "text-sky-600 dark:text-sky-400",
      accentBg: "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10",
      iconColor: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/40",
      buttonSecondary: "border border-sky-600 text-sky-750 dark:text-sky-300 hover:bg-sky-50/50"
    }
  };

  const baseTheme = themeConfig[category] || themeConfig.general;
  
  // Apply overrides if accentColor is chosen, else use baseTheme styles
  const theme = accentColor && colorOverrides[accentColor] 
    ? { ...baseTheme, ...colorOverrides[accentColor] }
    : baseTheme;

  const BadgeIcon = theme.badgeIcon;

  // ----------------------------------------------------
  // VARIANT 1: Basic (Clean, Flat, Minimalist layout)
  // ----------------------------------------------------
  const renderBasic = () => {
    return (
      <div className="space-y-12 py-8 max-w-4xl mx-auto px-6 text-left">
        {/* Navigation */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-300 dark:border-slate-800">
          <h2 className="text-xl font-bold">{businessName}</h2>
          <span className="text-xs font-semibold">{phone}</span>
        </div>

        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{theme.tagline}</h1>
          <p className="text-sm opacity-80 leading-relaxed max-w-2xl">{description}</p>
          <div className="pt-2">
            <a href={`tel:${phone}`} className={`inline-block px-5 py-2.5 rounded text-sm font-semibold ${theme.accentBg}`}>
              Contact Us: {phone}
            </a>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold border-l-4 border-current pl-3">Our Offerings</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {services.map((svc, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm">
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${theme.accentText}`} />
                <span>{svc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Essential Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-300 dark:border-slate-800 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-wider opacity-60 mb-1">Our Location</h4>
            <p className="opacity-90">{address}</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider opacity-60 mb-1">Business Hours</h4>
            <p className="opacity-90">{hours}</p>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 2: Professional (Corporate Split, Quote Form)
  // ----------------------------------------------------
  const renderProfessional = () => {
    return (
      <div className="space-y-16 py-12 max-w-5xl mx-auto px-6 text-left">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BadgeIcon className="w-5 h-5" />
            <h2 className="text-lg font-bold">{businessName}</h2>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="opacity-70">{hours}</span>
            <a href={`tel:${phone}`} className={`px-4 py-2 rounded font-semibold text-xs transition-colors ${theme.accentBg}`}>
              Call {phone}
            </a>
          </div>
        </div>

        {/* Split Hero Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase opacity-60 block">Verified Local Business</span>
            <h1 className="text-4xl font-bold leading-tight">{theme.tagline}</h1>
            <p className="text-sm opacity-80 leading-relaxed">{description}</p>
            <div className="flex gap-4">
              <a href="#services-sec" className={`px-5 py-2.5 rounded font-semibold text-sm ${theme.accentBg}`}>
                View Services
              </a>
              <a href="#quote-sec" className={`px-5 py-2.5 rounded font-semibold text-sm ${theme.buttonSecondary}`}>
                Get Free Estimate
              </a>
            </div>
          </div>

          {/* Quick Mock Contact Form */}
          <div id="quote-sec" className="md:col-span-5 bg-black/5 p-6 rounded-xl border border-slate-300 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm">Request Information</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-1.5 text-xs text-inherit focus:outline-none" />
              <input type="email" placeholder="Your Email" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-1.5 text-xs text-inherit focus:outline-none" />
              <textarea placeholder="How can we help?" rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-1.5 text-xs text-inherit resize-none focus:outline-none" />
              <button type="button" className={`w-full py-2 rounded text-xs font-bold transition-all ${theme.accentBg}`}>
                Submit Request
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div id="services-sec" className="space-y-6">
          <h2 className="text-xl font-bold">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc, i) => (
              <div key={i} className={`p-5 rounded-lg ${theme.cardBg}`}>
                <CheckCircle2 className={`w-5 h-5 mb-3 ${theme.accentText}`} />
                <h4 className="font-bold text-sm mb-1">{svc}</h4>
                <p className="text-[11px] opacity-70">Dedicated professional delivery for all {svc.toLowerCase()} requirements.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-black/5 rounded-xl text-xs">
          <div className="flex gap-3">
            <MapPin className={`w-5 h-5 ${theme.accentText}`} />
            <div>
              <h5 className="font-bold uppercase tracking-wider opacity-60">Location</h5>
              <p className="mt-1">{address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className={`w-5 h-5 ${theme.accentText}`} />
            <div>
              <h5 className="font-bold uppercase tracking-wider opacity-60">Timings</h5>
              <p className="mt-1">{hours}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className={`w-5 h-5 ${theme.accentText}`} />
            <div>
              <h5 className="font-bold uppercase tracking-wider opacity-60">Phone Support</h5>
              <a href={`tel:${phone}`} className={`mt-1 block font-semibold hover:underline ${theme.accentText}`}>{phone}</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 3: Modern (Ambient Shapes, Cards, Glows)
  // ----------------------------------------------------
  const renderModern = () => {
    return (
      <div className="relative overflow-hidden py-16 px-6 max-w-5xl mx-auto text-center space-y-16">
        {/* Glow circles */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${theme.accentText} bg-opacity-10 bg-current`}>
              <BadgeIcon className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-wider uppercase text-xs">{businessName}</span>
          </div>
          <a href={`tel:${phone}`} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${theme.accentBg}`}>
            Get in touch
          </a>
        </div>

        {/* Hero Area */}
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className={`text-[10px] tracking-widest font-bold uppercase px-3 py-1 rounded-full bg-current bg-opacity-10 ${theme.accentText}`}>
            {theme.tagline}
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">{businessName}</h1>
          <p className="text-sm opacity-80 leading-relaxed font-light">{description}</p>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {services.map((svc, i) => (
            <div key={i} className={`p-6 rounded-2xl transition-transform hover:-translate-y-1 duration-300 ${theme.cardBg}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${theme.iconColor}`}>
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <h4 className="font-bold text-sm tracking-tight mb-2">{svc}</h4>
              <p className="text-[11px] opacity-70 leading-relaxed">Experience modern workflows, speedy operations, and full dedication for {svc.toLowerCase()}.</p>
            </div>
          ))}
        </div>

        {/* Contact/Map Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-left p-6 bg-black/5 rounded-2xl">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">Operating Headquarters</span>
            <p className="font-medium text-sm leading-relaxed">{address}</p>
            <p className="text-slate-400">Feel free to visit or drop by for queries.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">Reach Out</span>
            <p className="font-medium text-sm leading-relaxed">{hours}</p>
            <a href={`tel:${phone}`} className={`font-semibold block mt-1 hover:underline ${theme.accentText}`}>Direct call line: {phone}</a>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 4: Premium (Boutique, Serif wide spacing)
  // ----------------------------------------------------
  const renderPremium = () => {
    return (
      <div className={`py-20 px-8 max-w-4xl mx-auto space-y-16 text-center ${theme.fontDisplay}`}>
        {/* Luxury Logo */}
        <div className="space-y-2">
          <h2 className="text-3xl font-light uppercase tracking-[0.2em]">{businessName}</h2>
          <div className="w-16 h-0.5 bg-current mx-auto opacity-30" />
        </div>

        {/* Fine Tagline & Description */}
        <div className="space-y-6 max-w-xl mx-auto">
          <p className="italic opacity-85 text-lg">{theme.tagline}</p>
          <p className="text-sm font-sans tracking-wide leading-relaxed font-light opacity-75">{description}</p>
          <div className="pt-4 font-sans">
            <a href={`tel:${phone}`} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest ${theme.accentBg}`}>
              Secure Booking
            </a>
          </div>
        </div>

        {/* Luxury Services list */}
        <div className="space-y-8 pt-6">
          <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-slate-500">Premium Curations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left font-sans">
            {services.map((svc, i) => (
              <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-200">{svc}</h4>
                  <p className="text-xs opacity-60 font-light">Customized and calibrated luxury services.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Fine Details block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans tracking-wider border-t border-slate-200 dark:border-slate-800 pt-8 text-left max-w-2xl mx-auto">
          <div className="space-y-2">
            <h5 className="font-bold uppercase tracking-widest text-slate-500">Address Location</h5>
            <p className="opacity-80 font-light leading-relaxed">{address}</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold uppercase tracking-widest text-slate-500">Appointment Hours</h5>
            <p className="opacity-80 font-light leading-relaxed">{hours}</p>
            <p className="opacity-80 font-light">Reservations: <span className={`font-semibold ${theme.accentText}`}>{phone}</span></p>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 5: Flagship (Asymmetric, Mock Layout, Tabs)
  // ----------------------------------------------------
  const renderFlagship = () => {
    return (
      <div className="py-16 px-6 max-w-6xl mx-auto space-y-20 text-left relative">
        {/* Navigation */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme.accentBg}`}>
              <BadgeIcon className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-lg">{businessName}</span>
          </div>
          <a href={`tel:${phone}`} className={`px-5 py-2.5 rounded-xl font-bold text-sm tracking-tight ${theme.accentBg}`}>
            Contact: {phone}
          </a>
        </header>

        {/* Hero & Media split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-10 border border-opacity-20 text-xs font-semibold tracking-wider uppercase ${theme.accentText} bg-current border-current`}>
              <Award className="w-3.5 h-3.5" />
              Award Winning Standard
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
              {theme.tagline} at <span className={category === 'creative' && !accentColor ? 'bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent' : theme.accentText}>{businessName}</span>
            </h1>
            <p className="text-sm opacity-85 leading-relaxed font-light">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${phone}`} className={`px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 ${theme.accentBg}`}>
                Get Direct Support
              </a>
              <a href="#flagship-svcs" className={`px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 ${theme.buttonSecondary}`}>
                Explore Dynamic Offerings
              </a>
            </div>
          </div>

          {/* Graphics Showcase Block */}
          <div className="lg:col-span-5 relative">
            <div className={`p-6 rounded-3xl border border-slate-200 dark:border-slate-800 ${theme.cardBg} shadow-xl relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-5 rounded-full blur-xl" />
              <h3 className="font-bold text-sm mb-4">Interactive Showcase</h3>
              
              <div className="space-y-3 text-xs">
                {services.slice(0, 3).map((svc, i) => (
                  <div key={i} className="p-3 bg-black/5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.accentText} bg-current`} />
                      <span className="font-semibold">{svc}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Services Grid */}
        <div id="flagship-svcs" className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-center">Our Services Portfolio</h2>
            <p className="text-xs opacity-75">Every service is crafted with high quality specifications to deliver premium results.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div key={i} className={`p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                <div className="space-y-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.iconColor}`}>
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-bold text-sm tracking-tight">{svc}</h4>
                  <p className="text-[11px] opacity-70 leading-relaxed">Premium service package containing direct consultations, quality reviews, and reliable customer support workflows.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Map Banner details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-black/5 rounded-3xl text-xs">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Physical Address</span>
            <p className="font-bold text-sm">{address}</p>
            <p className="text-slate-500">Walk-in visits are fully welcomed during hours.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Operational Timings</span>
            <p className="font-bold text-sm">{hours}</p>
            <p className="text-slate-500">Support channels are open online 24/7.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Instant Dial Connection</span>
            <a href={`tel:${phone}`} className={`font-bold text-sm block hover:underline ${theme.accentText}`}>{phone}</a>
            <p className="text-slate-500">Call for query assistance or instant quote bookings.</p>
          </div>
        </div>
      </div>
    );
  };

  // Switch between variants
  switch (Number(variant)) {
    case 1:
      return renderBasic();
    case 2:
      return renderProfessional();
    case 3:
      return renderModern();
    case 4:
      return renderPremium();
    case 5:
      return renderFlagship();
    default:
      return renderBasic();
  }
}
