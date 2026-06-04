import React from 'react';
import { 
  Phone, Clock, MapPin, CheckCircle2, ChevronRight, Star, Heart, 
  ShieldCheck, ShoppingBag, Coffee, Palette, Calendar, MessageSquare, 
  Send, Users, Award, ExternalLink, Activity, Sparkles, MessageCircle, Laptop,
  HelpCircle, GraduationCap, Check, ArrowRight
} from 'lucide-react';

export default function TemplateRenderer({ data, variant = 1 }) {
  const { 
    businessName, phone, hours, address, category, accentColor,
    heroHeadline, heroSubheadline, aboutText, ctaText, whyChooseUs,
    services, testimonials, industryDetails
  } = data;

  // Dynamic high-quality photography placeholder imagery (from Unsplash)
  const images = {
    restaurant: {
      hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
    },
    salon: {
      hero: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1522337360788-8b13edd793be?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1595959183075-c120996b914d?auto=format&fit=crop&w=400&q=80"
    },
    repair_shop: {
      hero: "https://images.unsplash.com/photo-1597740985671-2a8a3b80f02e?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80"
    },
    electronics_store: {
      hero: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=400&q=80"
    },
    gym: {
      hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80"
    },
    clinic: {
      hero: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
    },
    coaching: {
      hero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    retail_store: {
      hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    general: {
      hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      feature: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      staff: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  };

  const industryImages = images[category] || images.general;

  // Theme styling definitions for categories
  const themeConfig = {
    restaurant: {
      bg: "bg-[#fdfbf7] text-[#2d1e12]",
      headerBg: "bg-amber-900/5 border-b border-amber-900/10",
      accentText: "text-amber-800",
      accentBg: "bg-amber-700 hover:bg-amber-800 text-white",
      cardBg: "bg-white border border-amber-100 shadow-sm hover:shadow-md transition-shadow",
      iconColor: "text-amber-700 bg-amber-50",
      buttonSecondary: "border border-amber-800 text-amber-900 hover:bg-amber-50/50",
      footerBg: "bg-amber-950 text-amber-100/80 border-t border-amber-900/20",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: Coffee
    },
    salon: {
      bg: "bg-[#fffafc] text-[#3c1d29]",
      headerBg: "bg-rose-900/5 border-b border-rose-900/10",
      accentText: "text-rose-700",
      accentBg: "bg-rose-600 hover:bg-rose-750 text-white",
      cardBg: "bg-white border border-rose-100 shadow-sm hover:shadow-md transition-shadow",
      iconColor: "text-rose-750 bg-rose-50",
      buttonSecondary: "border border-rose-700 text-rose-900 hover:bg-rose-50/50",
      footerBg: "bg-rose-955 text-[#fdeff4] border-t border-rose-900/20",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: Palette
    },
    repair_shop: {
      bg: "bg-[#0b0f19] text-slate-300",
      headerBg: "bg-slate-900/60 border-b border-slate-800/80",
      accentText: "text-sky-400",
      accentBg: "bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20",
      cardBg: "bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors",
      iconColor: "text-sky-400 bg-sky-950/60",
      buttonSecondary: "border border-slate-700 text-slate-300 hover:bg-slate-800",
      footerBg: "bg-slate-950 text-slate-500 border-t border-slate-900",
      fontDisplay: "font-mono",
      fontBody: "font-sans",
      badgeIcon: Laptop
    },
    electronics_store: {
      bg: "bg-[#05070e] text-slate-300",
      headerBg: "bg-slate-950/80 border-b border-slate-900",
      accentText: "text-indigo-400",
      accentBg: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20",
      cardBg: "bg-[#0f1324] border border-slate-800 hover:border-indigo-900/50 transition-all",
      iconColor: "text-indigo-400 bg-indigo-950/80",
      buttonSecondary: "border border-slate-800 text-slate-300 hover:bg-slate-900",
      footerBg: "bg-slate-950 text-slate-500 border-t border-slate-900",
      fontDisplay: "font-sans font-extrabold tracking-tight",
      fontBody: "font-sans",
      badgeIcon: ShoppingBag
    },
    gym: {
      bg: "bg-[#09090b] text-[#f4f4f5]",
      headerBg: "bg-zinc-900/80 border-b border-zinc-800",
      accentText: "text-orange-500",
      accentBg: "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/10",
      cardBg: "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors",
      iconColor: "text-orange-500 bg-orange-950/40",
      buttonSecondary: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800",
      footerBg: "bg-zinc-950 text-zinc-500 border-t border-zinc-900",
      fontDisplay: "font-sans font-black tracking-tighter uppercase",
      fontBody: "font-sans",
      badgeIcon: Activity
    },
    clinic: {
      bg: "bg-[#f4faf8] text-[#1e3d36]",
      headerBg: "bg-teal-950/5 border-b border-teal-900/10",
      accentText: "text-teal-700",
      accentBg: "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/10",
      cardBg: "bg-white border border-teal-100 hover:border-teal-200 transition-all shadow-sm",
      iconColor: "text-teal-700 bg-teal-50",
      buttonSecondary: "border border-teal-600 text-teal-800 hover:bg-teal-50/50",
      footerBg: "bg-teal-950 text-teal-100/70 border-t border-teal-900/15",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      badgeIcon: ShieldCheck
    },
    coaching: {
      bg: "bg-[#faf9fc] text-[#2c1d3c]",
      headerBg: "bg-indigo-950/5 border-b border-indigo-900/10",
      accentText: "text-indigo-750",
      accentBg: "bg-indigo-650 hover:bg-indigo-750 text-white shadow-md shadow-indigo-500/10",
      cardBg: "bg-white border border-indigo-100 hover:border-indigo-200 transition-all shadow-sm",
      iconColor: "text-indigo-750 bg-indigo-50",
      buttonSecondary: "border border-indigo-600 text-indigo-850 hover:bg-indigo-50/50",
      footerBg: "bg-indigo-955 text-indigo-100/70 border-t border-indigo-900/15",
      fontDisplay: "font-sans font-extrabold tracking-tight",
      fontBody: "font-sans",
      badgeIcon: GraduationCap
    },
    retail_store: {
      bg: "bg-[#fafafa] text-slate-800",
      headerBg: "bg-white border-b border-slate-150 shadow-sm",
      accentText: "text-[#8b5a2b]",
      accentBg: "bg-[#8b5a2b] hover:bg-[#724820] text-white shadow-sm",
      cardBg: "bg-white border border-slate-200 hover:border-[#8b5a2b]/30 transition-all shadow-sm",
      iconColor: "text-[#8b5a2b] bg-[#fdf5ed]",
      buttonSecondary: "border border-slate-300 text-slate-700 hover:bg-slate-50",
      footerBg: "bg-slate-900 text-slate-400 border-t border-slate-800",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: ShoppingBag
    },
    general: {
      bg: "bg-slate-50 text-slate-900",
      headerBg: "bg-white border-b border-slate-200 shadow-sm",
      accentText: "text-blue-800",
      accentBg: "bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-500/15",
      cardBg: "bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow",
      iconColor: "text-blue-700 bg-blue-50",
      buttonSecondary: "border border-slate-300 text-slate-700 hover:bg-slate-100",
      footerBg: "bg-slate-900 text-slate-400 border-t border-slate-800",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      badgeIcon: ShieldCheck
    }
  };

  // Custom accent color overrides
  const colorOverrides = {
    indigo: {
      accentText: "text-indigo-600 dark:text-indigo-400",
      accentBg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10",
      iconColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40",
      buttonSecondary: "border border-indigo-600 text-indigo-850 dark:text-indigo-300 hover:bg-indigo-50/50"
    },
    amber: {
      accentText: "text-amber-850 dark:text-amber-400",
      accentBg: "bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-500/10",
      iconColor: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40",
      buttonSecondary: "border border-amber-700 text-amber-850 dark:text-amber-300 hover:bg-amber-50/50"
    },
    emerald: {
      accentText: "text-emerald-700 dark:text-emerald-400",
      accentBg: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-500/10",
      iconColor: "text-emerald-750 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
      buttonSecondary: "border border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50/50"
    },
    rose: {
      accentText: "text-rose-600 dark:text-rose-450",
      accentBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10",
      iconColor: "text-rose-600 bg-rose-50 dark:text-rose-450 dark:bg-rose-950/40",
      buttonSecondary: "border border-rose-600 text-rose-700 dark:text-rose-350 hover:bg-rose-50/50"
    },
    sky: {
      accentText: "text-sky-655 dark:text-sky-400",
      accentBg: "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10",
      iconColor: "text-sky-655 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/40",
      buttonSecondary: "border border-sky-600 text-sky-750 dark:text-sky-300 hover:bg-sky-50/50"
    }
  };

  const baseTheme = themeConfig[category] || themeConfig.general;
  const theme = accentColor && colorOverrides[accentColor] 
    ? { ...baseTheme, ...colorOverrides[accentColor] }
    : baseTheme;

  const BadgeIcon = theme.badgeIcon;

  // ----------------------------------------------------
  // CONVERSION STICKY FLOATER WIDGETS
  // ----------------------------------------------------
  const renderConversionFloaters = () => (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-auto">
      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25d366]" />
        <span className="text-xs font-bold tracking-tight">WhatsApp Chat</span>
      </a>

      {/* Call Button */}
      <a 
        href={`tel:${phone}`} 
        className="flex items-center gap-2 bg-indigo-650 hover:bg-indigo-555 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        title="Call Directly"
      >
        <Phone className="w-5 h-5 fill-white text-indigo-600" />
        <span className="text-xs font-bold tracking-tight">Call Us Now</span>
      </a>
    </div>
  );

  // ----------------------------------------------------
  // TRUST BUILDERS GRID (Ratings & Badges)
  // ----------------------------------------------------
  const renderTrustBadges = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-6 border-y border-current border-opacity-10 my-8">
      <div className="flex flex-col items-center justify-center p-2">
        <div className="flex text-amber-500 mb-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Google Rated 4.9★</p>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">100% Fully Certified</p>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <Award className="w-5 h-5 text-indigo-600 mb-1" />
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Locally Owned & Operated</p>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <CheckCircle2 className="w-5 h-5 text-purple-600 mb-1" />
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">100% Satisfaction Guarantee</p>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // INDUSTRY-SPECIFIC SECTIONS
  // ----------------------------------------------------
  const renderIndustrySections = () => {
    // 1. Restaurant
    if (category === 'restaurant') {
      const items = industryDetails?.menuItems?.length > 0 ? industryDetails.menuItems : [
        { name: "Artisanal Brew & Organic Espresso", price: "$4.99", desc: "Crafted using custom hand-selected premium beans roasted weekly." },
        { name: "Wildflower Honey Pastry", price: "$6.50", desc: "Fresh house-baked dough glazed with pure organic local honey." },
        { name: "Avocado Sourdough Board", price: "$12.00", desc: "Toasted country sourdough topped with mashed avocado, olive oil, and herbs." }
      ];
      const staff = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Chef Marcus Vance", role: "Head Culinary Artist" }
      ];

      return (
        <div className="space-y-12">
          {/* Menu Highlights */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Popular Menu Highlights</h3>
              <p className="text-xs opacity-70 mt-1">Savor our client-favorites prepared fresh daily.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <span className={`text-xs font-bold ${theme.accentText}`}>{item.price}</span>
                    </div>
                    <p className="text-[11px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/5 p-6 md:p-8 rounded-3xl">
            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-current border-opacity-10 shadow-lg">
              <img src={industryImages.staff} className="w-full h-56 object-cover" alt="Chef profile" />
            </div>
            <div className="md:col-span-8 space-y-4">
              <h4 className={`text-xl font-bold ${theme.fontDisplay}`}>Behind the Flavors</h4>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Our culinary vision is led by <span className="font-semibold">{staff[0]?.name || "Our Culinary Director"}</span>, who serves as our dedicated <span className="font-semibold">{staff[0]?.role || "Chef"}</span>. Every recipe is crafted using premium, locally-sourced ingredients to provide you with an unforgettable experience.
              </p>
            </div>
          </div>

          {/* Table Reservations Form */}
          <div className={`p-6 rounded-2xl ${theme.cardBg} space-y-4 max-w-xl mx-auto`}>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-sm uppercase tracking-wider">Book A Table Reservation</h4>
              <p className="text-[11px] opacity-70">Instantly schedule your dining experience with us.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" placeholder="Name" className="w-full bg-black/5 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-inherit focus:outline-none focus:border-indigo-500" />
              <input type="date" className="w-full bg-black/5 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-inherit focus:outline-none focus:border-indigo-500" />
              <select className="w-full bg-black/5 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-inherit focus:outline-none focus:border-indigo-500 cursor-pointer">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6+ Guests</option>
              </select>
            </div>
            <button type="button" className={`w-full py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${theme.accentBg}`}>
              Reserve Table Now
            </button>
          </div>
        </div>
      );
    }

    // 2. Salon
    if (category === 'salon') {
      const items = industryDetails?.pricingTiers?.length > 0 ? industryDetails.pricingTiers : [
        { name: "Haircut & Luxury Blowout", price: "$65", features: ["Consultation", "Scalp Massage", "Professional Styling"] },
        { name: "Signature Hair Color & Highlights", price: "$145", features: ["Full Balayage", "Custom Toning Treatment", "Deep Hydration Mask"] },
        { name: "Premium Scalp Therapy", price: "$85", features: ["Organic Scrub", "Steam Infusion", "Blowdry Style"] }
      ];
      const staff = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Elena Rostova", role: "Master Hair Stylist" }
      ];

      return (
        <div className="space-y-12">
          {/* Services Catalog */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Premium Beauty Services</h3>
              <p className="text-xs opacity-70 mt-1">Explore our highly curated beauty, cuts, and coloring services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <span className={`text-sm font-bold ${theme.accentText}`}>{item.price}</span>
                    </div>
                    <ul className="space-y-2 text-[11px] font-light opacity-75">
                      {item.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Stylist Profile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/5 p-6 md:p-8 rounded-3xl">
            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-current border-opacity-10 shadow-lg">
              <img src={industryImages.staff} className="w-full h-56 object-cover" alt="Stylist profile" />
            </div>
            <div className="md:col-span-8 space-y-4">
              <h4 className={`text-xl font-bold ${theme.fontDisplay}`}>Meet Our Master Stylist</h4>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Our luxury treatments are guided by our lead stylist, <span className="font-semibold">{staff[0]?.name || "Elena Rostova"}</span>, who specializes in modern hair design as a certified <span className="font-semibold">{staff[0]?.role || "Lead Specialist"}</span>.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 3. Mobile Repair Shop
    if (category === 'repair_shop') {
      const pricing = industryDetails?.pricingTiers?.length > 0 ? industryDetails.pricingTiers : [
        { name: "Glass/Screen Replacement", price: "Starts at $79", features: ["OEM Quality Glass", "1-Hour Turnaround", "90-Day Warranty"] },
        { name: "Premium Battery Service", price: "Starts at $49", features: ["New High-Capacity Cell", "Full Diagnostic Check", "Safe Recycle of Old Battery"] },
        { name: "Water Damage Restoration", price: "Starts at $99", features: ["Ultrasonic Board Clean", "Micro-soldering Repair", "Dry & Sealed Finish"] }
      ];
      const brands = industryDetails?.brands?.length > 0 ? industryDetails.brands : ["Apple iPhone", "Samsung Galaxy", "Google Pixel", "OnePlus"];

      return (
        <div className="space-y-12">
          {/* Supported brands */}
          <div className="p-6 bg-black/5 rounded-3xl text-center space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">Brands We Professionally Service</h4>
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-350 text-xs font-mono font-bold">
              {brands.map((brand, i) => (
                <span key={i} className="px-4 py-1.5 bg-slate-800/40 rounded-xl border border-slate-800 shadow-sm">{brand.toUpperCase()}</span>
              ))}
            </div>
          </div>

          {/* Repair Matrix */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Repair Estimates & Pricing</h3>
              <p className="text-xs opacity-70 mt-1">Transparent pricing for standard device diagnostics and replacement repairs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((tier, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm leading-tight">{tier.name}</h4>
                      <span className={`text-xs font-bold ${theme.accentText}`}>{tier.price}</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] font-light opacity-75">
                      {tier.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 4. Electronics Store
    if (category === 'electronics_store') {
      const products = industryDetails?.products?.length > 0 ? industryDetails.products : [
        { name: "Pro Sound Wireless Headphones", price: "$189.99", desc: "Active noise-cancellation with premium audio acoustics." },
        { name: "Smart Fitness Watch Sport Edition", price: "$249.00", desc: "Waterproof GPS tracker with integrated health monitoring." },
        { name: "Dual-Device Wireless Charging Mat", price: "$59.99", desc: "Elegant leather chargepad supporting dual fast QI charging." }
      ];

      return (
        <div className="space-y-12">
          {/* Products highlights */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Featured Gadgets & Tech</h3>
              <p className="text-xs opacity-70 mt-1">Check out our latest premium tech, accessories, and gadgets in stock.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{prod.name}</h4>
                    <p className="text-[11px] opacity-75 font-light leading-relaxed">{prod.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                    <span className={`text-sm font-bold ${theme.accentText}`}>{prod.price}</span>
                    <button type="button" className={`px-3 py-1 rounded-lg text-[10px] font-bold ${theme.accentBg}`}>Shop Item</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 5. Gym / Fitness
    if (category === 'gym') {
      const plans = industryDetails?.pricingTiers?.length > 0 ? industryDetails.pricingTiers : [
        { name: "General Access Membership", price: "$39/mo", features: ["Full Gym Floor Access", "Locker Room & Showers", "Free Fitness Evaluation"] },
        { name: "Elite Coaching Membership", price: "$79/mo", features: ["All Gym Floor Access", "Uncapped Fitness Classes", "1x Monthly Private Training", "Custom Diet Schedule"] }
      ];
      const trainers = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Coach Coach Vance", role: "Strength & Conditioning Specialist" },
        { name: "Coach Sarah Lin", role: "Yoga & Balance Instructor" }
      ];

      return (
        <div className="space-y-12">
          {/* Memberships */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Membership Programs</h3>
              <p className="text-xs opacity-70 mt-1">Select the membership structure tailored to your fitness objectives.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${theme.cardBg} flex flex-col justify-between border-2 ${idx === 1 ? 'border-orange-500/55' : 'border-transparent'}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm tracking-tight">{plan.name}</h4>
                      <span className={`text-lg font-bold ${theme.accentText}`}>{plan.price}</span>
                    </div>
                    <ul className="space-y-2 text-xs font-light text-zinc-400">
                      {plan.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button type="button" className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider mt-6 ${theme.accentBg}`}>Join Program</button>
                </div>
              ))}
            </div>
          </div>

          {/* Trainers profiles */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold text-center uppercase tracking-wider ${theme.fontDisplay}`}>Meet Our Coaches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              {trainers.map((train, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${theme.cardBg} flex items-center gap-4`}>
                  <img src={industryImages.staff} className="w-12 h-12 rounded-full object-cover border border-zinc-800" alt="Trainer profile" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">{train.name}</h4>
                    <p className="text-[10px] text-zinc-550 font-bold uppercase mt-0.5">{train.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 6. Medical Clinic
    if (category === 'clinic') {
      const doctors = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Dr. Catherine Howard", role: "Chief Pediatric Consultant" }
      ];

      return (
        <div className="space-y-12">
          {/* Doctor profiles */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-teal-900/5 p-6 md:p-8 rounded-3xl">
            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-current border-opacity-10 shadow-lg">
              <img src={industryImages.staff} className="w-full h-56 object-cover" alt="Doctor profile" />
            </div>
            <div className="md:col-span-8 space-y-4">
              <h4 className={`text-xl font-bold ${theme.fontDisplay}`}>Professional Healthcare</h4>
              <p className="text-sm opacity-80 leading-relaxed font-light">
                Our clinical consultation and diagnostics are led by <span className="font-semibold">{doctors[0]?.name || "Dr. Howard"}</span>, serving as our dedicated <span className="font-semibold">{doctors[0]?.role || "Clinical Director"}</span>. We are fully committed to patient safety, health, and personalized medical attention.
              </p>
            </div>
          </div>

          {/* Consultation timings */}
          <div className={`p-6 rounded-2xl ${theme.cardBg} text-center space-y-4 max-w-md mx-auto`}>
            <h4 className="font-bold text-sm uppercase tracking-wider text-teal-800">Weekly Clinical Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-teal-100/50 pb-1.5">
                <span className="font-medium text-slate-655">Monday - Friday</span>
                <span className="font-bold text-slate-800">{hours || "8:00 AM - 5:00 PM"}</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span className="font-medium text-slate-655">Saturday - Sunday</span>
                <span className="font-bold text-slate-800">Emergency Call-In Only</span>
              </div>
            </div>
            <a href={`tel:${phone}`} className={`block w-full py-2 rounded-lg text-xs font-bold text-center transition-all ${theme.accentBg}`}>
              Book Patient Consultation
            </a>
          </div>
        </div>
      );
    }

    // 7. Coaching Center
    if (category === 'coaching') {
      const courses = services?.length > 0 ? services : [
        { name: "Advanced Physics & Mechanics", desc: "Detailed breakdown of mechanics, electromagnetic theory, and concept applications." },
        { name: "Core Mathematics & Algebra", desc: "Specialized math tutoring designed to clarify foundations and speed up problems." },
        { name: "Computer Programming Foundations", desc: "Hands-on coding introduction in web development languages." }
      ];

      return (
        <div className="space-y-12">
          {/* Courses Offered */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Courses & Programs Offered</h3>
              <p className="text-xs opacity-70 mt-1">Select from our expert academic curricula tailored for student success.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm leading-tight text-slate-800 dark:text-slate-100">{course.name}</h4>
                    <p className="text-[11px] opacity-75 font-light leading-relaxed">{course.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Statistics trust builder */}
          <div className="grid grid-cols-3 gap-4 text-center bg-indigo-950/5 p-6 rounded-3xl">
            <div>
              <p className="text-2xl font-black text-indigo-700">98%</p>
              <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Success Rate</p>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-700">5000+</p>
              <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Alumni Guided</p>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-700">10+</p>
              <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Expert Mentors</p>
            </div>
          </div>
        </div>
      );
    }

    // 8. Retail Store
    if (category === 'retail_store') {
      const items = industryDetails?.products?.length > 0 ? industryDetails.products : [
        { name: "Modern Linen Summer Set", price: "$89.99", desc: "100% pure organic breathable linen, styled for comfort." },
        { name: "Artisanal Crafted Leather Boots", price: "$149.00", desc: "Hand-stitched leather boots with comfortable cushioned soles." },
        { name: "Premium Wool Designer Overcoat", price: "$199.99", desc: "Tailored classic overcoat crafted from fine virgin wool blends." }
      ];

      return (
        <div className="space-y-12">
          {/* Featured items */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>Our Curated Collections</h3>
              <p className="text-xs opacity-70 mt-1">Discover our seasonal designer catalog selections in store.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{item.name}</h4>
                    <p className="text-[11px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.price}</span>
                    <button type="button" className={`px-3 py-1 rounded-lg text-[10px] font-bold ${theme.accentBg}`}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 9. General Business (Fallback)
    return null;
  };

  // Testimonials Slider markup
  const renderTestimonials = () => {
    const list = testimonials?.length > 0 ? testimonials : [
      { name: "Sarah M.", text: "Absolutely incredible service. Friendly, fast, and exceeded all my expectations!" },
      { name: "David K.", text: "Professional staff and unbeatable quality. Highly recommend to everyone in the area." }
    ];

    return (
      <div className="space-y-6 py-6">
        <div className="text-center">
          <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>What Our Clients Say</h3>
          <div className="w-10 h-0.5 bg-current mx-auto opacity-20 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((t, idx) => (
            <div key={idx} className={`p-6 rounded-2xl ${theme.cardBg} italic relative text-xs font-light leading-relaxed text-left`}>
              <span className="absolute top-2 left-3 text-3xl opacity-10 font-serif">“</span>
              <p className="relative z-10 pt-2 opacity-90">"{t.text}"</p>
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-right mt-4 opacity-75">— {t.name}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 1: Basic & Functional (Stacked clean layout)
  // ----------------------------------------------------
  const renderBasic = () => {
    return (
      <div className={`min-h-full ${theme.bg} ${theme.fontBody} flex flex-col justify-between`}>
        <div className="space-y-12 py-8 max-w-4xl mx-auto px-6 text-left relative">
          {renderConversionFloaters()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center pb-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold tracking-tight">{businessName}</h2>
            <div className="flex gap-2">
              <a href={`tel:${phone}`} className={`px-4 py-2 rounded text-xs font-bold transition-all ${theme.accentBg}`}>
                Call Now
              </a>
            </div>
          </div>

          {/* Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${theme.fontDisplay}`}>{heroHeadline}</h1>
              <p className="text-sm opacity-80 leading-relaxed font-light">{heroSubheadline}</p>
              <div className="pt-2">
                <a href={`tel:${phone}`} className={`inline-block px-5 py-2.5 rounded text-sm font-semibold ${theme.accentBg}`}>
                  {ctaText}
                </a>
              </div>
            </div>
            <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-slate-350 dark:border-slate-800">
              <img src={industryImages.hero} className="w-full h-48 object-cover" alt="Business Hero" />
            </div>
          </div>

          {renderTrustBadges()}

          {/* Services List */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-current pl-3">Our Core Offerings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((svc, i) => (
                <div key={i} className="flex gap-3 text-left">
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme.accentText}`} />
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{svc.name}</h4>
                    <p className="text-xs opacity-75 font-light mt-0.5">{svc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry specific sections */}
          {renderIndustrySections()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* About section */}
          <div className="p-6 bg-black/5 rounded-2xl space-y-3 text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider opacity-60">About Our Company</h4>
            <p className="text-xs opacity-80 leading-relaxed font-light">{aboutText}</p>
          </div>

          {/* Essential Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
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

        {/* Footer */}
        <footer className={`py-6 text-center text-xs opacity-70 mt-12 px-6 ${theme.footerBg}`}>
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
        </footer>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 2: Professional (Corporate Split, Side Form)
  // ----------------------------------------------------
  const renderProfessional = () => {
    return (
      <div className={`min-h-full ${theme.bg} ${theme.fontBody} flex flex-col justify-between`}>
        <div className="space-y-16 py-12 max-w-5xl mx-auto px-6 text-left relative">
          {renderConversionFloaters()}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BadgeIcon className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold tracking-tight">{businessName}</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="opacity-75 hidden sm:inline">{hours}</span>
              <a href={`tel:${phone}`} className={`px-4 py-2 rounded-xl transition-all ${theme.accentBg}`}>
                Call {phone}
              </a>
            </div>
          </div>

          {/* Split Hero Column */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-50 block">Certified Local Professional</span>
              <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${theme.fontDisplay}`}>{heroHeadline}</h1>
              <p className="text-sm opacity-85 leading-relaxed font-light">{heroSubheadline}</p>
              <div className="flex gap-4">
                <a href={`tel:${phone}`} className={`px-5 py-2.5 rounded-xl font-semibold text-xs ${theme.accentBg}`}>
                  {ctaText}
                </a>
                <a href="#pro-services" className={`px-5 py-2.5 rounded-xl font-semibold text-xs ${theme.buttonSecondary}`}>
                  Our Services
                </a>
              </div>
            </div>

            {/* Quick Mock Contact Form */}
            <div className="md:col-span-5 bg-black/5 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Request Appointment Slot</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded-lg px-3 py-1.5 text-xs text-inherit focus:outline-none focus:border-indigo-500" />
                <input type="email" placeholder="Your Email" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded-lg px-3 py-1.5 text-xs text-inherit focus:outline-none focus:border-indigo-500" />
                <textarea placeholder="Tell us how we can assist you..." rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded-lg px-3 py-1.5 text-xs text-inherit resize-none focus:outline-none focus:border-indigo-500" />
                <button type="button" className={`w-full py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${theme.accentBg}`}>
                  Book Consultation Slot
                </button>
              </div>
            </div>
          </div>

          {renderTrustBadges()}

          {/* About segment */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/5 p-6 md:p-8 rounded-3xl">
            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
              <img src={industryImages.feature} className="w-full h-48 object-cover" alt="Featured details" />
            </div>
            <div className="md:col-span-8 space-y-4 text-left">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500">Our Corporate Commitment</h4>
              <p className="text-xs opacity-80 leading-relaxed font-light">{aboutText}</p>
            </div>
          </div>

          {/* Services List */}
          <div id="pro-services" className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Our Specialties & Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc, i) => (
                <div key={i} className={`p-5 rounded-xl ${theme.cardBg} text-left`}>
                  <CheckCircle2 className={`w-5 h-5 mb-3 ${theme.accentText}`} />
                  <h4 className="font-bold text-sm mb-1">{svc.name}</h4>
                  <p className="text-xs opacity-75 font-light leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industry content */}
          {renderIndustrySections()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* Address and Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-black/5 rounded-2xl text-xs text-left">
            <div className="flex gap-3">
              <MapPin className={`w-5 h-5 flex-shrink-0 ${theme.accentText}`} />
              <div>
                <h5 className="font-bold uppercase tracking-wider opacity-60">Office Location</h5>
                <p className="mt-1">{address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className={`w-5 h-5 flex-shrink-0 ${theme.accentText}`} />
              <div>
                <h5 className="font-bold uppercase tracking-wider opacity-60">Working Hours</h5>
                <p className="mt-1">{hours}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className={`w-5 h-5 flex-shrink-0 ${theme.accentText}`} />
              <div>
                <h5 className="font-bold uppercase tracking-wider opacity-60">Phone Support</h5>
                <a href={`tel:${phone}`} className={`mt-1 block font-bold hover:underline ${theme.accentText}`}>{phone}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`py-8 text-center text-xs opacity-70 mt-12 px-6 ${theme.footerBg}`}>
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
        </footer>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 3: Modern (Centered layouts, Glows, Asymmetric)
  // ----------------------------------------------------
  const renderModern = () => {
    return (
      <div className={`min-h-full ${theme.bg} ${theme.fontBody} flex flex-col justify-between relative overflow-hidden`}>
        {/* Glow circles */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative py-16 px-6 max-w-5xl mx-auto text-center space-y-16 flex-1">
          {renderConversionFloaters()}

          {/* Header */}
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${theme.accentText} bg-opacity-10 bg-current`}>
                <BadgeIcon className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-wider uppercase text-xs">{businessName}</span>
            </div>
            <a href={`tel:${phone}`} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${theme.accentBg}`}>
              Connect Now
            </a>
          </div>

          {/* Hero Area */}
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className={`text-[9px] tracking-widest font-bold uppercase px-3.5 py-1 rounded-full bg-current bg-opacity-10 ${theme.accentText}`}>
              Highly Recommended Local Business
            </span>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight leading-none ${theme.fontDisplay}`}>{heroHeadline}</h1>
            <p className="text-sm opacity-80 leading-relaxed font-light">{heroSubheadline}</p>
            <div className="pt-4 flex justify-center gap-3">
              <a href={`tel:${phone}`} className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${theme.accentBg}`}>
                Call Us: {phone}
              </a>
            </div>
          </div>

          {/* Large visual card */}
          <div className="rounded-3xl overflow-hidden border border-current border-opacity-10 shadow-2xl relative z-10">
            <img src={industryImages.hero} className="w-full h-64 object-cover" alt="Hero Details" />
          </div>

          {renderTrustBadges()}

          {/* Services Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {services.map((svc, i) => (
              <div key={i} className={`p-6 rounded-2xl transition-transform hover:-translate-y-1 duration-300 text-left ${theme.cardBg}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${theme.iconColor}`}>
                  <span className="text-xs font-bold">{i + 1}</span>
                </div>
                <h4 className="font-bold text-sm tracking-tight mb-2">{svc.name}</h4>
                <p className="text-[10px] opacity-75 leading-relaxed font-light">{svc.desc}</p>
              </div>
            ))}
          </div>

          {/* Industry sections */}
          {renderIndustrySections()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* About Section */}
          <div className="max-w-xl mx-auto text-center space-y-3 relative z-10">
            <h4 className="text-xs uppercase tracking-widest font-bold opacity-60">Who We Are</h4>
            <p className="text-xs opacity-80 font-light leading-relaxed">{aboutText}</p>
          </div>

          {/* Contact/Map Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-left p-6 bg-black/5 rounded-2xl relative z-10">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">Physical Address Location</span>
              <p className="font-medium text-sm leading-relaxed">{address}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">Hours & Contact Support</span>
              <p className="font-medium text-sm leading-relaxed">{hours}</p>
              <a href={`tel:${phone}`} className={`font-semibold block mt-1 hover:underline ${theme.accentText}`}>Call: {phone}</a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`py-8 text-center text-xs opacity-70 px-6 z-10 relative ${theme.footerBg}`}>
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
        </footer>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 4: Premium (Boutique, Serif wide editorial)
  // ----------------------------------------------------
  const renderPremium = () => {
    return (
      <div className={`min-h-full ${theme.bg} ${theme.fontDisplay} flex flex-col justify-between`}>
        <div className="py-20 px-8 max-w-4xl mx-auto space-y-16 text-center relative flex-1">
          {renderConversionFloaters()}
          
          {/* Luxury Logo */}
          <div className="space-y-2">
            <h2 className="text-3xl font-light uppercase tracking-[0.2em]">{businessName}</h2>
            <div className="w-16 h-0.5 bg-current mx-auto opacity-30" />
          </div>

          {/* Fine Tagline & Description */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl leading-tight font-light">{heroHeadline}</h1>
            <p className="text-sm font-sans tracking-wide leading-relaxed font-light opacity-75">{heroSubheadline}</p>
            <div className="pt-4 font-sans">
              <a href={`tel:${phone}`} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest ${theme.accentBg}`}>
                {ctaText}
              </a>
            </div>
          </div>

          {/* Premium visual banner */}
          <div className="rounded-2xl overflow-hidden border border-current border-opacity-10 shadow-lg max-w-xl mx-auto">
            <img src={industryImages.hero} className="w-full h-56 object-cover" alt="Boutique banner" />
          </div>

          {renderTrustBadges()}

          {/* Luxury Services list */}
          <div className="space-y-8 pt-6">
            <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-slate-500">Our Curated Offerings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left font-sans">
              {services.map((svc, i) => (
                <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-200">{svc.name}</h4>
                    <p className="text-xs opacity-60 font-light">{svc.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Industry details */}
          {renderIndustrySections()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* Elegant About block */}
          <div className="p-8 border border-current border-opacity-10 rounded-2xl max-w-xl mx-auto text-left font-sans">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Our History & Values</h4>
            <p className="text-xs opacity-75 font-light leading-relaxed">{aboutText}</p>
          </div>

          {/* Fine Details block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans tracking-wider border-t border-current border-opacity-10 pt-8 text-left max-w-2xl mx-auto">
            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-widest text-slate-500">Our Location</h5>
              <p className="opacity-80 font-light leading-relaxed">{address}</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-widest text-slate-500">Appointment Hours</h5>
              <p className="opacity-80 font-light leading-relaxed">{hours}</p>
              <p className="opacity-80 font-light mt-1">Direct support: <span className={`font-semibold ${theme.accentText}`}>{phone}</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`py-10 text-center text-xs opacity-70 px-6 font-sans ${theme.footerBg}`}>
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
        </footer>
      </div>
    );
  };

  // ----------------------------------------------------
  // VARIANT 5: Flagship (Asymmetric Layout, Large Showcase)
  // ----------------------------------------------------
  const renderFlagship = () => {
    return (
      <div className={`min-h-full ${theme.bg} ${theme.fontBody} flex flex-col justify-between`}>
        <div className="py-16 px-6 max-w-6xl mx-auto space-y-20 text-left relative flex-1">
          {renderConversionFloaters()}
          
          {/* Navigation */}
          <header className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme.accentBg}`}>
                <BadgeIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg">{businessName}</span>
            </div>
            <a href={`tel:${phone}`} className={`px-5 py-2.5 rounded-xl font-bold text-sm tracking-tight transition-transform hover:-translate-y-0.5 ${theme.accentBg}`}>
              Call: {phone}
            </a>
          </header>

          {/* Hero & Media split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-10 border border-opacity-20 text-xs font-semibold tracking-wider uppercase ${theme.accentText} bg-current border-current`}>
                <Award className="w-3.5 h-3.5" />
                Premium Local Standards
              </div>
              <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-none ${theme.fontDisplay}`}>
                {heroHeadline}
              </h1>
              <p className="text-sm opacity-85 leading-relaxed font-light">{heroSubheadline}</p>
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${phone}`} className={`px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 ${theme.accentBg}`}>
                  {ctaText}
                </a>
                <a href="#flagship-details" className={`px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 ${theme.buttonSecondary}`}>
                  Explore Offerings
                </a>
              </div>
            </div>

            {/* Graphics Showcase Block */}
            <div className="lg:col-span-5 relative">
              <div className={`p-6 rounded-3xl border border-current border-opacity-10 ${theme.cardBg} shadow-xl relative overflow-hidden`}>
                <img src={industryImages.hero} className="w-full h-44 object-cover rounded-xl border border-current border-opacity-10" alt="Showcase hero" />
                <h3 className="font-bold text-xs mt-4 uppercase tracking-wider text-slate-500 mb-2">Our Company Bio</h3>
                <p className="text-xs opacity-75 font-light">{aboutText}</p>
              </div>
            </div>
          </div>

          {renderTrustBadges()}

          {/* Flagship Services Grid */}
          <div id="flagship-details" className="space-y-8 relative z-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-black text-center">Services & Offerings</h2>
              <p className="text-xs opacity-75">Every service is crafted with high quality specifications to deliver premium results.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((svc, i) => (
                <div key={i} className={`p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                  <div className="space-y-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.iconColor}`}>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-200">{svc.name}</h4>
                    <p className="text-[11px] opacity-75 font-light leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry specific sections */}
          {renderIndustrySections()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* Contact/Map Banner details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-black/5 rounded-3xl text-xs relative z-10">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Physical Address</span>
              <p className="font-bold text-sm">{address}</p>
              <p className="text-slate-500 mt-1">Walk-in visits are fully welcomed during hours.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Operational Timings</span>
              <p className="font-bold text-sm">{hours}</p>
              <p className="text-slate-500 mt-1">Support channels are open online 24/7.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Instant Dial Connection</span>
              <a href={`tel:${phone}`} className="font-bold text-sm text-indigo-500 block hover:underline">{phone}</a>
              <p className="text-slate-500 mt-1">Call for query assistance or instant quote bookings.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`py-10 text-center text-xs opacity-70 px-6 ${theme.footerBg}`}>
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
        </footer>
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
