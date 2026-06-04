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
    heroHeadline: rawHeroHeadline, 
    heroSubheadline: rawHeroSubheadline, 
    aboutText: rawAboutText, 
    ctaText: rawCtaText, 
    whyChooseUs: rawWhyChooseUs,
    services, testimonials, industryDetails
  } = data;

  // Dynamically resolve copywriting based on variant conversion strategy (v1 to v5)
  const variantKey = `v${variant}`;
  const variantCopy = data.variantsCopy?.[variantKey] || {};

  const heroHeadline = variantCopy.heroHeadline || rawHeroHeadline || "Premium Local Services";
  const heroSubheadline = variantCopy.heroSubheadline || rawHeroSubheadline || "Dedicated quality and reliable support crafted exactly around your requirements.";
  const aboutText = variantCopy.aboutText || rawAboutText || "We are a locally owned service committed to bringing you the highest standard of excellence.";
  const ctaText = variantCopy.ctaText || rawCtaText || "Get In Touch";
  const whyChooseUs = Array.isArray(variantCopy.whyChooseUs) ? variantCopy.whyChooseUs : rawWhyChooseUs || ["Experienced Professionals", "Customer-Centric Care", "100% Satisfaction Guarantee"];

  // Form interactive state tracking
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [bookingSubmitted, setBookingSubmitted] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("");


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
      footerBg: "bg-amber-955 text-amber-100/80 border-t border-amber-900/20",
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
      footerBg: "bg-teal-955 text-teal-100/70 border-t border-teal-900/15",
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
      buttonSecondary: "border border-indigo-600 text-indigo-855 hover:bg-indigo-50/50",
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
      accentText: "text-indigo-655 dark:text-indigo-400",
      accentBg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10",
      iconColor: "text-indigo-655 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40",
      buttonSecondary: "border border-indigo-600 text-indigo-855 dark:text-indigo-300 hover:bg-indigo-50/50"
    },
    amber: {
      accentText: "text-amber-850 dark:text-amber-400",
      accentBg: "bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-500/10",
      iconColor: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-955/40",
      buttonSecondary: "border border-amber-700 text-amber-855 dark:text-amber-300 hover:bg-amber-50/50"
    },
    emerald: {
      accentText: "text-emerald-700 dark:text-emerald-400",
      accentBg: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-500/10",
      iconColor: "text-emerald-750 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-955/40",
      buttonSecondary: "border border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50/50"
    },
    rose: {
      accentText: "text-rose-600 dark:text-rose-450",
      accentBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10",
      iconColor: "text-rose-600 bg-rose-50 dark:text-rose-455 dark:bg-rose-955/40",
      buttonSecondary: "border border-rose-600 text-rose-750 dark:text-rose-350 hover:bg-rose-50/50"
    },
    sky: {
      accentText: "text-sky-655 dark:text-sky-400",
      accentBg: "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10",
      iconColor: "text-sky-655 bg-sky-50 dark:text-sky-400 dark:bg-sky-955/40",
      buttonSecondary: "border border-sky-600 text-sky-750 dark:text-sky-300 hover:bg-sky-50/50"
    }
  };

  const baseTheme = themeConfig[category] || themeConfig.general;
  const theme = accentColor && colorOverrides[accentColor] 
    ? { ...baseTheme, ...colorOverrides[accentColor] }
    : baseTheme;

  const BadgeIcon = theme.badgeIcon;

  // ----------------------------------------------------
  // AUTOMATIC OVERFLOW DETECTOR & RESOLVER HOOK
  // ----------------------------------------------------
  React.useEffect(() => {
    const auditAndFixOverflow = () => {
      // Find the element containing our website layout
      const containers = document.querySelectorAll('.overflow-x-hidden');
      containers.forEach(container => {
        const maxWidth = container.clientWidth;
        if (!maxWidth) return;

        const allChildren = container.querySelectorAll('*');
        allChildren.forEach(el => {
          // If child exceeds container client width, restrict it to prevent horizontal scroll
          if (el.offsetWidth > maxWidth) {
            console.warn('[Responsiveness Audit] Overflowing element detected & auto-fixed:', el, `Width: ${el.offsetWidth}px, Max: ${maxWidth}px`);
            el.style.maxWidth = '100%';
            el.style.boxSizing = 'border-box';
            el.style.overflowX = 'hidden';
          }
        });
      });
    };

    // Perform check after render cycle settles
    const timer = setTimeout(auditAndFixOverflow, 600);
    return () => clearTimeout(timer);
  }, [data, variant]);

  // ----------------------------------------------------
  // CONVERSION STICKY FLOATER WIDGETS
  // ----------------------------------------------------
  const renderConversionFloaters = () => (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-auto max-w-[calc(100%-2rem)]">
      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white px-4 py-3 min-h-[44px] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25d366]" />
        <span className="text-xs font-bold tracking-tight">WhatsApp Chat</span>
      </a>

      {/* Call Button */}
      <a 
        href={`tel:${phone}`} 
        className="flex items-center gap-2 bg-indigo-650 hover:bg-indigo-555 text-white px-4 py-3 min-h-[44px] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center py-6 border-y border-current border-opacity-10 my-8 break-words">
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
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Locally Owned</p>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <CheckCircle2 className="w-5 h-5 text-purple-600 mb-1" />
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Satisfaction Guarantee</p>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // INDUSTRY-SPECIFIC SECTIONS
  // ----------------------------------------------------
  const renderIndustrySections = () => {
    // ----------------------------------------------------
    // 1. RESTAURANT CATEGORY
    // ----------------------------------------------------
    if (category === 'restaurant') {
      const items = industryDetails?.menuItems?.length > 0 ? industryDetails.menuItems : [
        { name: "Artisanal Brew & Organic Espresso", price: "$4.99", desc: "Crafted using custom hand-selected premium beans roasted weekly." },
        { name: "Wildflower Honey Pastry", price: "$6.50", desc: "Fresh house-baked dough glazed with pure organic local honey." },
        { name: "Avocado Sourdough Board", price: "$12.00", desc: "Toasted country sourdough topped with mashed avocado, olive oil, and herbs." }
      ];
      const staff = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Chef Marcus Vance", role: "Head Culinary Artist" }
      ];

      // Variant 1: Trust-focused Local (badges, stars, local ticks)
      if (variant === 1) {
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-left border-l-4 border-amber-700 pl-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-700">Verified Guest Favorites</span>
                <h3 className={`text-xl font-bold uppercase tracking-tight ${theme.fontDisplay}`}>Popular Menu Highlights</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-3 relative`}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-xs sm:text-sm">{item.name}</h4>
                      <span className={`text-xs font-bold ${theme.accentText} bg-amber-50 px-2 py-0.5 rounded`}>{item.price}</span>
                    </div>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                    <div className="flex items-center gap-1 text-[9px] text-amber-500 font-bold pt-2 border-t border-slate-100">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>4.9★ Local Favorite</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Chef Profile (Trust variant) */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-black/5 rounded-2xl items-center text-left">
              <img src={industryImages.staff} className="w-16 h-16 rounded-full object-cover border border-amber-900/10 flex-shrink-0" alt="Chef Marcus" />
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-slate-800">{staff[0]?.name || "Chef Marcus"} — {staff[0]?.role || "Head Chef"}</h5>
                <p className="text-[10px] opacity-75 leading-relaxed font-light">"Our culinary team prepares every recipe from scratch using locally sourced, fresh organic ingredients. We guarantee a delicious local taste every single visit."</p>
              </div>
            </div>
          </div>
        );
      }

      // Variant 2: Conversion-focused Lead Gen (form + book buttons)
      if (variant === 2) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-tight text-slate-700">Order & Reservation Highlights</h3>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme.cardBg} flex justify-between items-center gap-4`}>
                    <div>
                      <h4 className="font-bold text-xs">{item.name}</h4>
                      <p className="text-[10px] opacity-70 mt-0.5 line-clamp-1">{item.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`block text-xs font-bold ${theme.accentText} mb-1`}>{item.price}</span>
                      <button 
                        onClick={() => {
                          setSelectedService(`Pre-order: ${item.name}`);
                          document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-2 py-1 min-h-[30px] rounded text-[9px] font-bold text-white ${theme.accentBg}`}
                      >
                        Order Table Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 bg-black/5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Book A Table Slot</h4>
              {bookingSubmitted ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-center text-xs font-bold animate-pulse">
                  Reservation slot confirmed! We will text you.
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-[11px] text-inherit focus:outline-none focus:border-indigo-500" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-[11px] text-inherit focus:outline-none" />
                    <select className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2 text-[11px] text-inherit focus:outline-none">
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6+ Guests</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => setBookingSubmitted(true)}
                    className={`w-full py-2 min-h-[38px] rounded text-xs font-bold text-white ${theme.accentBg}`}
                  >
                    Confirm Table Slot
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      // Variant 3: Storytelling & Brand (Asymmetric, Chef quote, food story description)
      if (variant === 3) {
        return (
          <div className="space-y-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/5 p-6 rounded-3xl">
              <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-lg w-full max-w-xs mx-auto">
                <img src={industryImages.staff} className="w-full h-48 object-cover" alt="Chef Marcus" />
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-[9px] tracking-widest font-semibold uppercase text-slate-500 block">Chef's Culinary Philosophy</span>
                <h3 className="text-xl font-bold">"Flavors Inspired by Heritage"</h3>
                <p className="text-xs font-sans opacity-80 leading-relaxed font-light">
                  Led by <span className="font-bold">{staff[0]?.name || "Chef Marcus"}</span>, our kitchen honors local culinary roots. We roast our coffee using single-origin beans and bake pastries fresh every morning to bring true passion to your table.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg uppercase tracking-wider font-light">Featured Culinary Creations</h3>
                <p className="text-[10px] opacity-60">A detailed glimpse into the inspiration behind our favorites.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                {items.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wide border-b border-current pb-1 border-opacity-10">{item.name}</h4>
                    <p className="text-[10px] opacity-75 leading-relaxed font-light">{item.desc}</p>
                    <span className="block text-xs font-serif italic mt-1">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Variant 4: Premium/Luxury (classic serif menu, thin lines, dotted leaders, clean)
      if (variant === 4) {
        return (
          <div className="space-y-8 font-serif max-w-2xl mx-auto text-left">
            <div className="text-center space-y-2">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Bespoke Dining Selection</span>
              <h3 className="text-xl font-light">La Carte Du Jour</h3>
            </div>
            <div className="space-y-6 font-serif">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-slate-800 dark:text-slate-200">{item.name}</h4>
                    <div className="flex-1 border-b border-dotted border-slate-300 dark:border-slate-800 mx-2" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 font-sans font-light">{item.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-sans font-light leading-normal pr-12">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-4 font-sans">
              <a href={`tel:${phone}`} className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500 border-b border-current pb-1 hover:opacity-85">Private Dining Reservations</a>
            </div>
          </div>
        );
      }

      // Variant 5: Modern High-Impact (Dark styled, active special pills, bold price tags)
      if (variant === 5) {
        return (
          <div className="space-y-8 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-indigo-400 font-bold">Fresh Daily Crafts</span>
              <h3 className="text-2xl font-black mt-1">The Signature Eats</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-block bg-indigo-500/10 text-indigo-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">Signature</span>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200">{item.price}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{item.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 2. SALON CATEGORY
    // ----------------------------------------------------
    if (category === 'salon') {
      const items = industryDetails?.pricingTiers?.length > 0 ? industryDetails.pricingTiers : [
        { name: "Haircut & Luxury Blowout", price: "$65", features: ["Consultation & Guide", "Scalp Conditioning", "Professional Styling"] },
        { name: "Signature Hair Color & Highlights", price: "$145", features: ["Full Balayage", "Custom Toning Treatment", "Deep Hydration Mask"] },
        { name: "Premium Scalp Therapy", price: "$85", features: ["Organic Scrub", "Steam Infusion", "Blowdry Style"] }
      ];
      const staff = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Elena Rostova", role: "Master Hair Stylist" }
      ];

      // Variant 1: Trust
      if (variant === 1) {
        return (
          <div className="space-y-6">
            <div className="text-left border-l-4 border-rose-655 pl-3">
              <span className="text-[9px] uppercase tracking-wider font-bold text-rose-655">Satisfaction Guaranteed Services</span>
              <h3 className={`text-xl font-bold uppercase tracking-tight ${theme.fontDisplay}`}>Premium Beauty Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-3`}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-bold text-xs sm:text-sm">{item.name}</h4>
                    <span className={`text-xs font-bold ${theme.accentText}`}>{item.price}</span>
                  </div>
                  <ul className="space-y-1 text-[10px] font-light opacity-75">
                    {item.features?.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[9px] text-slate-550 border-t border-slate-100 pt-2 flex justify-between">
                    <span>100% Satisfaction Ticks</span>
                    <span>5.0 ★ Star Reviewed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // Variant 2: Conversion
      if (variant === 2) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold uppercase text-slate-700">Select Beauty Treatment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-bold text-xs">{item.name}</h4>
                      <span className={`text-sm font-bold ${theme.accentText}`}>{item.price}</span>
                    </div>
                    <ul className="space-y-1 text-[10px] font-light opacity-75">
                      {item.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-indigo-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedService(item.name);
                      document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-1.5 min-h-[36px] rounded text-[10px] font-bold text-white mt-4 ${theme.accentBg}`}
                  >
                    Book Treatment Slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // Variant 3: Storytelling
      if (variant === 3) {
        return (
          <div className="space-y-8 text-left">
            <div className="flex flex-col sm:flex-row gap-6 p-6 bg-black/5 rounded-2xl items-center">
              <img src={industryImages.staff} className="w-24 h-24 rounded-full object-cover border border-rose-900/10 flex-shrink-0" alt="Elena" />
              <div className="space-y-3">
                <span className="text-[9px] tracking-widest font-semibold uppercase text-slate-500 block">Master Hair Stylist</span>
                <h3 className="text-xl font-bold">Meet Elena Rostova</h3>
                <p className="text-xs font-sans opacity-85 leading-relaxed font-light">
                  Our luxury treatments are guided by our lead stylist, <span className="font-semibold">{staff[0]?.name || "Elena Rostova"}</span>. Elena specializes in modern hair design and coloring, creating holistic styling rituals tailored for your unique persona.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg uppercase tracking-wider font-light text-center">Styling Rituals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                {items.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wide border-b border-current pb-1 border-opacity-10">{item.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">A custom session designed around scalp diagnostics, conditioning, and finished with styled blowdry.</p>
                    <span className="block text-xs font-serif italic">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Variant 4: Premium/Luxury
      if (variant === 4) {
        return (
          <div className="space-y-8 font-serif max-w-2xl mx-auto text-left">
            <div className="text-center space-y-2">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Curated Treatments & Tariffs</span>
              <h3 className="text-xl font-light">Aesthetic Services</h3>
            </div>
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline gap-4">
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-slate-800 dark:text-slate-200">{item.name}</h4>
                    <div className="flex-1 border-b border-dotted border-slate-350 dark:border-slate-850 mx-2" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 font-sans font-light">{item.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-550 font-sans font-light leading-normal">{item.features.join(" • ")}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // Variant 5: Modern High-Impact
      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-rose-500 font-bold">Hair & Color Catalog</span>
              <h3 className="text-2xl font-black mt-1">Specialty Styling</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-block bg-rose-500/10 text-rose-500 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">Salon Session</span>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200">{item.price}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{item.name}</h4>
                    <ul className="space-y-1 text-[9px] opacity-75 mt-2">
                      {item.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 3. REPAIR SHOP CATEGORY
    // ----------------------------------------------------
    if (category === 'repair_shop') {
      const pricing = industryDetails?.pricingTiers?.length > 0 ? industryDetails.pricingTiers : [
        { name: "Glass/Screen Replacement", price: "Starts at $79", features: ["OEM Quality Glass", "1-Hour Turnaround", "90-Day Warranty"] },
        { name: "Premium Battery Service", price: "Starts at $49", features: ["New High-Capacity Cell", "Full Diagnostic Check", "Safe Battery Recycle"] },
        { name: "Water Damage Restoration", price: "Starts at $99", features: ["Ultrasonic Board Clean", "Micro-soldering Repair", "Dry & Sealed Finish"] }
      ];
      const brands = industryDetails?.brands?.length > 0 ? industryDetails.brands : ["Apple iPhone", "Samsung Galaxy", "Google Pixel", "OnePlus"];

      // Variant 1: Trust
      if (variant === 1) {
        return (
          <div className="space-y-8">
            <div className="p-4 bg-slate-800/20 border border-slate-800 rounded-2xl text-center space-y-3">
              <span className="text-[9px] tracking-[0.2em] text-sky-400 font-bold uppercase block">Professionally Serviced Brands</span>
              <div className="flex flex-wrap justify-center gap-2 text-xs font-bold text-slate-300">
                {brands.map((b, i) => <span key={i} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg">{b}</span>)}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase text-left border-l-4 border-sky-400 pl-3">Diagnostics & Estimate Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pricing.map((tier, idx) => (
                  <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-3`}>
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-bold text-xs sm:text-sm">{tier.name}</h4>
                      <span className={`text-xs font-bold ${theme.accentText}`}>{tier.price}</span>
                    </div>
                    <p className="text-[10px] opacity-75">All replacements use certified components with strict safety tests.</p>
                    <div className="text-[9px] text-sky-400 font-semibold border-t border-slate-800 pt-2 flex justify-between">
                      <span>90-Day Guarantee</span>
                      <span>OEM Glass Specs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Variant 2: Conversion
      if (variant === 2) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-bold uppercase text-slate-350">Quick Repair Estimates</h3>
              <div className="space-y-3">
                {pricing.map((tier, idx) => (
                  <div key={idx} className={`p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center gap-4`}>
                    <div>
                      <h4 className="font-bold text-xs">{tier.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tier.features.join(" • ")}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="block text-xs font-bold text-sky-400 mb-1">{tier.price}</span>
                      <button 
                        onClick={() => {
                          setSelectedService(tier.name);
                          document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-2 py-1 min-h-[30px] rounded text-[9px] font-bold text-white bg-sky-600 hover:bg-sky-500`}
                      >
                        Book Repair Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Request Repair Booking</h4>
              {bookingSubmitted ? (
                <div className="p-3 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded text-center text-xs font-bold">
                  Diagnostic appointment booked! We will text you a confirmation.
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="text" placeholder="Your Device Model" className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-[11px] text-inherit focus:outline-none" />
                  <textarea placeholder="Describe the issue..." rows={2} className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-[11px] text-inherit resize-none focus:outline-none" />
                  <button 
                    onClick={() => setBookingSubmitted(true)}
                    className="w-full py-2 min-h-[38px] rounded text-xs font-bold text-white bg-sky-600 hover:bg-sky-500"
                  >
                    Confirm Repair Slot
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      // Variant 3: Storytelling
      if (variant === 3) {
        return (
          <div className="space-y-8 text-left font-mono text-xs">
            <h3 className="text-lg font-bold tracking-wider text-center uppercase font-sans text-slate-300">How We Restore Devices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
              <div className="space-y-2 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-sky-400 font-bold uppercase text-[10px]">01 / Diagnostic Check</span>
                <p className="text-[11px] opacity-75 font-light leading-relaxed">We perform ultrasonic mapping and physical board diagnostics to pin-point screen/circuit decay before replacing components.</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-sky-400 font-bold uppercase text-[10px]">02 / Clean-Room Fix</span>
                <p className="text-[11px] opacity-75 font-light leading-relaxed">Repairs occur in dust-filtered clean benches. Screens are pressurized and batteries balanced to original factory specs.</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-sky-400 font-bold uppercase text-[10px]">03 / Seal & Warranty</span>
                <p className="text-[11px] opacity-75 font-light leading-relaxed">Devices are resealed with custom water-resistant adhesives and undergo a 12-point quality check before release.</p>
              </div>
            </div>
          </div>
        );
      }

      // Variant 4: Premium/Luxury
      if (variant === 4) {
        return (
          <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Fine Technical Restoration</span>
              <h3 className="text-lg font-light">Service Guide</h3>
            </div>
            <div className="space-y-4">
              {pricing.map((tier, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-slate-300">{tier.name}</h4>
                    <p className="text-[10px] text-slate-500 font-sans font-light leading-normal">{tier.features.join(" • ")}</p>
                  </div>
                  <span className="text-xs text-sky-400 font-sans">{tier.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // Variant 5: Modern High-Impact
      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-sky-400 font-bold">Standard Hardware Fixes</span>
              <h3 className="text-xl font-bold mt-1 font-sans text-white">Repair Catalog</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
              {pricing.map((tier, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-sky-500/10 text-sky-400 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">1-Hr Speed</span>
                      <span className="text-xs font-black text-slate-200">{tier.price}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-100">{tier.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">Quality parts serviced with premium ESD safety procedures.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 4. ELECTRONICS STORE CATEGORY
    // ----------------------------------------------------
    if (category === 'electronics_store') {
      const products = industryDetails?.products?.length > 0 ? industryDetails.products : [
        { name: "Pro Sound Wireless Headphones", price: "$189.99", desc: "Active noise-cancellation with premium audio acoustics." },
        { name: "Smart Fitness Watch Sport Edition", price: "$249.00", desc: "Waterproof GPS tracker with integrated health monitoring." },
        { name: "Dual-Device Wireless Charging Mat", price: "$59.99", desc: "Elegant leather chargepad supporting dual fast QI charging." }
      ];

      // Variants
      if (variant === 1) {
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase text-left border-l-4 border-indigo-400 pl-3">Popular Gadgets In Stock</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map((prod, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-3`}>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-100">{prod.name}</h4>
                  <p className="text-[10px] opacity-75 leading-relaxed">{prod.desc}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-xs font-bold text-indigo-400">{prod.price}</span>
                    <span className="text-[9px] text-slate-500 font-semibold">100% Certified / Brand Warranty</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 2) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold uppercase text-slate-350">Secure Product Stock Slot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map((prod, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-100">{prod.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-normal">{prod.desc}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400">{prod.price}</span>
                    <button 
                      onClick={() => {
                        setSelectedService(`Reserve: ${prod.name}`);
                        document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2 py-1 min-h-[30px] rounded text-[9px] font-bold text-white bg-indigo-650 hover:bg-indigo-555"
                    >
                      Reserve Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-8 text-left">
            <div className="text-center space-y-2">
              <h3 className="text-lg uppercase tracking-wider font-light text-slate-300">Why We Curated These Gadgets</h3>
              <p className="text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed">We select products designed to improve modern work-from-home focus and health monitoring metrics.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {products.map((prod, idx) => (
                <div key={idx} className="space-y-2 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-xs uppercase text-slate-200">{prod.name}</h4>
                  <p className="text-[10px] opacity-75 font-light leading-relaxed">{prod.desc}</p>
                  <span className="block text-xs font-serif italic text-indigo-400">{prod.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Fine Hardware Catalog</span>
              <h3 className="text-lg font-light text-slate-300">Curated Hardware</h3>
            </div>
            <div className="space-y-4">
              {products.map((prod, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-slate-850 pb-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-slate-300">{prod.name}</h4>
                    <p className="text-[10px] text-slate-500 font-sans font-light leading-normal">{prod.desc}</p>
                  </div>
                  <span className="text-xs text-indigo-400 font-sans">{prod.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold font-sans text-white">Specials Grid</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
              {products.map((prod, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">In Stock</span>
                      <span className="text-xs font-black text-slate-200">{prod.price}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-100">{prod.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{prod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 5. GYM / FITNESS CATEGORY
    // ----------------------------------------------------
    if (category === 'gym') {
      const plans = industryDetails?.pricingTiers?.length > 0 ? industryDetails.pricingTiers : [
        { name: "General Access Membership", price: "$39/mo", features: ["Full Gym Floor Access", "Locker Room & Showers", "Free Fitness Evaluation"] },
        { name: "Elite Coaching Membership", price: "$79/mo", features: ["All Gym Floor Access", "Uncapped Fitness Classes", "1x Monthly Private Training", "Custom Diet Schedule"] }
      ];
      const trainers = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Coach Coach Vance", role: "Strength Specialist" },
        { name: "Coach Sarah Lin", role: "Yoga Instructor" }
      ];

      // Variants
      if (variant === 1) {
        return (
          <div className="space-y-8">
            <div className="text-left border-l-4 border-orange-555 pl-3">
              <span className="text-[9px] uppercase tracking-wider font-bold text-orange-555">Guaranteed No long-term contracts</span>
              <h3 className={`text-xl font-bold uppercase tracking-tight ${theme.fontDisplay}`}>Membership Programs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-4 border ${idx === 1 ? 'border-orange-500/50' : 'border-transparent'}`}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-xs sm:text-sm">{plan.name}</h4>
                    <span className="text-sm font-bold text-orange-555">{plan.price}</span>
                  </div>
                  <ul className="space-y-1 text-[11px] font-light opacity-75">
                    {plan.features?.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-orange-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[9px] text-zinc-500 border-t border-zinc-800 pt-2 text-center">
                    <span>100% Satisfaction Trial Guarantee Included</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 2) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold uppercase text-slate-400">Join a Program Slot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-bold text-xs">{plan.name}</h4>
                      <span className="text-sm font-bold text-orange-500">{plan.price}</span>
                    </div>
                    <ul className="space-y-1 text-[11px] font-light opacity-75">
                      {plan.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-orange-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedService(`Join: ${plan.name}`);
                      document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2 min-h-[38px] rounded text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 mt-4"
                  >
                    Activate Pass
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-8 text-left">
            <h3 className="text-lg font-bold text-center uppercase tracking-wider text-slate-300">Meet Our Trainers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto font-sans">
              {trainers.map((train, idx) => (
                <div key={idx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-4">
                  <img src={industryImages.staff} className="w-12 h-12 rounded-full object-cover border border-zinc-800 flex-shrink-0" alt="Trainer" />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-100">{train.name}</h4>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase mt-0.5">{train.role}</p>
                    <p className="text-[10px] opacity-70 mt-1 font-light leading-relaxed">"Dedicated to making fitness simple and habit-based."</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Elite Personal Training & Access</span>
              <h3 className="text-lg font-light text-zinc-350">Membership Tariff</h3>
            </div>
            <div className="space-y-4">
              {plans.map((plan, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-zinc-800 pb-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-zinc-200">{plan.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-sans font-light leading-normal">{plan.features.join(" • ")}</p>
                  </div>
                  <span className="text-xs text-orange-500 font-sans">{plan.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold font-sans text-white">Class Passes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-orange-500/10 text-orange-500 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">Best Value</span>
                      <span className="text-xs font-black text-slate-200">{plan.price}</span>
                    </div>
                    <h4 className="font-bold text-xs text-zinc-100">{plan.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">Full floor access, modern group workouts, and biometric tests.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 6. CLINIC CATEGORY
    // ----------------------------------------------------
    if (category === 'clinic') {
      const doctors = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: "Dr. Catherine Howard", role: "Chief Pediatric Consultant" }
      ];

      if (variant === 1) {
        return (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 p-6 bg-teal-900/5 border border-teal-100/50 rounded-2xl items-center text-left">
              <img src={industryImages.staff} className="w-20 h-20 rounded-full object-cover border border-teal-900/10 flex-shrink-0" alt="Doctor" />
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-wider font-bold text-teal-700">Board Certified Pediatrician</span>
                <h3 className="text-lg font-bold text-slate-800">{doctors[0]?.name || "Dr. Catherine Howard"}</h3>
                <p className="text-xs opacity-75 leading-relaxed font-light">"Our clinic provides professional pediatric diagnostics and guidance. We are fully committed to medical board safety regulations, child comfort, and direct doctor communication."</p>
              </div>
            </div>
          </div>
        );
      }

      if (variant === 2) {
        return (
          <div className="space-y-6 text-left max-w-xl mx-auto bg-white p-6 rounded-2xl border border-teal-100 shadow-sm">
            <h3 className="text-base font-bold uppercase tracking-wider text-teal-800 text-center">Schedule Clinic Consultation Slot</h3>
            {bookingSubmitted ? (
              <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-600 rounded text-center text-xs font-bold">
                Consultation appointment submitted! We will call to confirm.
              </div>
            ) : (
              <div className="space-y-3">
                <input type="text" placeholder="Patient Name" className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none focus:border-teal-500" />
                <input type="tel" placeholder="Contact Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none focus:border-teal-500" />
                <button 
                  onClick={() => setBookingSubmitted(true)}
                  className="w-full py-2 min-h-[38px] rounded text-xs font-bold text-white bg-teal-600 hover:bg-teal-700"
                >
                  Book Patient Slot Now
                </button>
              </div>
            )}
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg uppercase tracking-wider font-light text-center">Clinical Hours & Timings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-teal-905/5 p-6 rounded-2xl max-w-xl mx-auto font-sans">
              <div>
                <h4 className="font-bold text-xs uppercase text-teal-850">Pediatric Consulting</h4>
                <p className="text-[11px] opacity-75 mt-1 font-light leading-relaxed">Appointments scheduled Mon-Fri from 9:00 AM to 5:00 PM. Call to verify child history requirements.</p>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase text-teal-850">Emergency Diagnostics</h4>
                <p className="text-[11px] opacity-75 mt-1 font-light leading-relaxed">On-call diagnostic consultation available for active family clients during weekend hours.</p>
              </div>
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Premium Healthcare Consulting</span>
              <h3 className="text-lg font-light text-teal-950">Specialty Consultations</h3>
            </div>
            <div className="space-y-4 font-sans text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>General Pediatric Diagnostics</span>
                <span className="font-bold text-teal-700">Mon - Fri Consultation</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Chronic Child Health Reviews</span>
                <span className="font-bold text-teal-700">Specialist Scheduling</span>
              </div>
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold font-sans text-slate-800">Healthcare Departments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl space-y-2">
                <span className="bg-teal-500/10 text-teal-700 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">Active Clinic</span>
                <h4 className="font-bold text-xs text-slate-800">Pediatric Primary Care</h4>
                <p className="text-[10px] text-slate-550">General growth reviews, diagnostic immunization tests, and child counseling.</p>
              </div>
              <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl space-y-2">
                <span className="bg-teal-500/10 text-teal-700 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">Specialist</span>
                <h4 className="font-bold text-xs text-slate-800">Diagnostic Consultations</h4>
                <p className="text-[10px] text-teal-550">Complex medical checks, specialized pediatric care plans, and second opinions.</p>
              </div>
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 7. COACHING CATEGORY
    // ----------------------------------------------------
    if (category === 'coaching') {
      const courses = services?.length > 0 ? services : [
        { name: "Advanced Physics & Mechanics", desc: "Detailed breakdown of mechanics, electromagnetic theory, and concept applications." },
        { name: "Core Mathematics & Algebra", desc: "Specialized math tutoring designed to clarify foundations and speed up problems." },
        { name: "Computer Programming Foundations", desc: "Hands-on coding introduction in web development languages." }
      ];

      // Variants
      if (variant === 1) {
        return (
          <div className="space-y-8 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-indigo-950/5 p-4 sm:p-6 rounded-3xl max-w-2xl mx-auto">
              <div className="p-2 border-r border-slate-200">
                <p className="text-2xl font-black text-indigo-700">98%</p>
                <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Board Success Rate</p>
              </div>
              <div className="p-2 border-r border-slate-200">
                <p className="text-2xl font-black text-indigo-700">5000+</p>
                <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Students Mentored</p>
              </div>
              <div className="p-2">
                <p className="text-2xl font-black text-indigo-700">10+</p>
                <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Certified Teachers</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg uppercase pl-3 border-l-4 border-indigo-700">Curricula & Modules</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {courses.map((course, idx) => (
                  <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-2`}>
                    <h4 className="font-bold text-xs text-slate-800">{course.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{course.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (variant === 2) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-bold uppercase text-indigo-900">Academic Tutoring</h3>
              <div className="space-y-3">
                {courses.map((course, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme.cardBg} flex justify-between items-center gap-4`}>
                    <div>
                      <h4 className="font-bold text-xs">{course.name}</h4>
                      <p className="text-[10px] opacity-70 mt-0.5">{course.desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedService(`Trial: ${course.name}`);
                        document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 min-h-[30px] rounded text-[9px] font-bold text-white bg-indigo-650 hover:bg-indigo-750 flex-shrink-0"
                    >
                      Book Trial Class
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 bg-black/5 p-4 rounded-xl border border-indigo-100 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Register For A Trial Class</h4>
              {bookingSubmitted ? (
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 rounded text-center text-xs font-bold">
                  Class seat booked! We will email you.
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="text" placeholder="Student Name" className="w-full bg-white border border-indigo-100 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
                  <select className="w-full bg-white border border-indigo-100 rounded px-2 text-xs text-inherit focus:outline-none">
                    <option>Physics Trial Class</option>
                    <option>Mathematics Trial Class</option>
                    <option>Coding Trial Class</option>
                  </select>
                  <button 
                    onClick={() => setBookingSubmitted(true)}
                    className="w-full py-2 min-h-[38px] rounded text-xs font-bold text-white bg-indigo-650 hover:bg-indigo-750"
                  >
                    Confirm Registration Slot
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-8 text-left font-sans text-xs">
            <h3 className="text-lg font-bold tracking-wider text-center uppercase text-indigo-900">Teaching Vision & Methodology</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <span className="text-indigo-700 font-bold uppercase text-[9px]">Concept Clarity</span>
                <p className="text-[10px] opacity-75 font-light leading-relaxed">We skip simple rote memorization. Tutors prioritize root formulas and diagnostic steps to make math and physics intuitive.</p>
              </div>
              <div className="space-y-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <span className="text-indigo-700 font-bold uppercase text-[9px]">Bi-Weekly Tests</span>
                <p className="text-[10px] opacity-75 font-light leading-relaxed">Regular mock tests and performance matrices help track students' exam preparedness and speed-solving habits.</p>
              </div>
              <div className="space-y-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <span className="text-indigo-700 font-bold uppercase text-[9px]">Personal Reviews</span>
                <p className="text-[10px] opacity-75 font-light leading-relaxed">Small batch sizes guarantee that each student receives direct feedback, personalized homework checks, and concept drills.</p>
              </div>
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Premium Academic Curricula</span>
              <h3 className="text-lg font-light text-indigo-950">Study Modules</h3>
            </div>
            <div className="space-y-4">
              {courses.map((c, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-indigo-100 pb-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-indigo-900">{c.name}</h4>
                    <p className="text-[10px] text-slate-500 font-sans font-light leading-normal">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold font-sans text-indigo-955">Curriculum Catalog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
              {courses.map((c, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-indigo-500/10 text-indigo-700 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">Active Course</span>
                    </div>
                    <h4 className="font-bold text-xs text-indigo-900">{c.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 8. RETAIL STORE CATEGORY
    // ----------------------------------------------------
    if (category === 'retail_store') {
      const items = industryDetails?.products?.length > 0 ? industryDetails.products : [
        { name: "Modern Linen Summer Set", price: "$89.99", desc: "100% pure organic breathable linen, styled for comfort." },
        { name: "Artisanal Crafted Leather Boots", price: "$149.00", desc: "Hand-stitched leather boots with comfortable cushioned soles." },
        { name: "Premium Wool Designer Overcoat", price: "$199.99", desc: "Tailored classic overcoat crafted from fine virgin wool blends." }
      ];

      // Variants
      if (variant === 1) {
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase text-left border-l-4 border-[#8b5a2b] pl-3">Our Curated Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-3`}>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">{item.name}</h4>
                  <p className="text-[10px] opacity-75 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold text-[#8b5a2b]">{item.price}</span>
                    <span className="text-[9px] text-slate-500 font-semibold">100% Cotton / Wool / Leather</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 2) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold uppercase text-slate-700">Pre-order From Catalog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-850">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-250 flex justify-between items-center">
                    <span className="text-xs font-bold text-[#8b5a2b]">{item.price}</span>
                    <button 
                      onClick={() => {
                        setSelectedService(`Retail: ${item.name}`);
                        document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2 py-1 min-h-[30px] rounded text-[9px] font-bold text-white bg-[#8b5a2b] hover:bg-[#724820]"
                    >
                      Reserve Size
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-8 text-left">
            <div className="text-center space-y-2">
              <h3 className="text-lg uppercase tracking-wider font-light text-slate-800">The Design Philosophy</h3>
              <p className="text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed">We select products designed for seasonal comfort, choosing fabrics like organic cotton, pure linen, and virgin wool blends.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-2 p-4 bg-slate-100 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-xs uppercase text-slate-800">{item.name}</h4>
                  <p className="text-[10px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                  <span className="block text-xs font-serif italic text-[#8b5a2b]">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Designer Lookbook selections</span>
              <h3 className="text-lg font-light text-slate-900">Aesthetic Catalog</h3>
            </div>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide text-slate-900">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 font-sans font-light leading-normal">{item.desc}</p>
                  </div>
                  <span className="text-xs text-[#8b5a2b] font-sans">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-xl font-bold font-sans text-slate-800">Summer Catalog Selection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#8b5a2b]/10 text-[#8b5a2b] text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">New In</span>
                      <span className="text-xs font-black text-slate-800">{item.price}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800">{item.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 9. GENERAL BUSINESS / FALLBACK
    // ----------------------------------------------------
    // We render standard capabilities matching the variant concept
    if (variant === 1) {
      return (
        <div className="space-y-4 text-left">
          <div className="border-l-4 border-blue-700 pl-3">
            <span className="text-[9px] uppercase tracking-wider font-bold text-blue-700">Certified local team</span>
            <h3 className={`text-xl font-bold uppercase tracking-tight ${theme.fontDisplay}`}>Our Standard Assurances</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${theme.cardBg} space-y-2`}>
              <h4 className="font-bold text-xs text-slate-800">100% Fully Licensed</h4>
              <p className="text-[10px] opacity-75 leading-relaxed">Our local business holds all required municipal permits and liability coverage for on-site services.</p>
            </div>
            <div className={`p-4 rounded-xl ${theme.cardBg} space-y-2`}>
              <h4 className="font-bold text-xs text-slate-800">Quality Assured</h4>
              <p className="text-[10px] opacity-75 leading-relaxed">Every client project undergoes diagnostics review to ensure robust performance metrics are met.</p>
            </div>
            <div className={`p-4 rounded-xl ${theme.cardBg} space-y-2`}>
              <h4 className="font-bold text-xs text-slate-800">Locally Supported</h4>
              <p className="text-[10px] opacity-75 leading-relaxed">Operated directly in the Noida/regional area, providing fast post-completion support for any questions.</p>
            </div>
          </div>
        </div>
      );
    }

    if (variant === 2) {
      return (
        <div className="p-5 bg-black/5 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl mx-auto text-left space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 text-center">Request A Callback</h4>
          {bookingSubmitted ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-center text-xs font-bold">
              Callback slot registered! We will dial you within 15 minutes.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
              </div>
              <button 
                onClick={() => setBookingSubmitted(true)}
                className={`w-full py-2 min-h-[38px] rounded text-xs font-bold text-white ${theme.accentBg}`}
              >
                Call Me Back
              </button>
            </div>
          )}
        </div>
      );
    }

    if (variant === 3) {
      return (
        <div className="p-6 bg-black/5 rounded-2xl max-w-xl mx-auto text-left space-y-4">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block text-center">Our Commitment</span>
          <h4 className="font-bold text-sm text-slate-800 text-center">"Crafting Values, Supporting Noida"</h4>
          <p className="text-xs opacity-75 leading-relaxed font-light font-sans text-center">We believe business should serve a community. From choosing sustainable suppliers to training apprentice teams, we work every day to deliver positive local impact.</p>
        </div>
      );
    }

    if (variant === 4) {
      return (
        <div className="space-y-6 font-serif max-w-xl mx-auto text-left">
          <div className="text-center space-y-1">
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Fine Corporate Standards</span>
            <h3 className="text-lg font-light text-slate-800">Our Pillars</h3>
          </div>
          <div className="space-y-4 font-sans text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span>Bespoke Customer Consultations</span>
              <span className="font-bold">Tailored To Specifications</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span>Post-Service Technical Validation</span>
              <span className="font-bold">Certified Standard Reviews</span>
            </div>
          </div>
        </div>
      );
    }

    // Variant 5
    return (
      <div className="space-y-6 text-left font-sans">
        <h3 className="text-xl font-bold font-sans text-slate-800">Dynamic Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-slate-800">Fast Agile Turnarounds</h4>
            <p className="text-[10px] text-slate-550">We deploy rapid methodologies and modern digital tools to complete client scopes ahead of timeline parameters.</p>
          </div>
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-slate-800">Certified Professional Experts</h4>
            <p className="text-[10px] text-slate-550">Our diagnostic technicians hold key certifications, ensuring premium results across all client requirements.</p>
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
