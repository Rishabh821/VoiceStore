import React from 'react';
import { 
  Phone, Clock, MapPin, CheckCircle2, ChevronRight, Star, Heart, 
  ShieldCheck, ShoppingBag, Coffee, Palette, Calendar, MessageSquare, 
  Send, Users, Award, ExternalLink, Activity, Sparkles, MessageCircle, Laptop,
  HelpCircle, GraduationCap, Check, ArrowRight, Wrench, Zap, Wind, Home, Briefcase
} from 'lucide-react';

export default function TemplateRenderer({ data, variant = 1 }) {
  const { 
    businessName, phone, hours, address, category, accentColor,
    services, testimonials, industryDetails
  } = data;

  // Dynamically resolve copywriting based on variant conversion strategy (v1 to v5)
  const variantKey = `v${variant}`;
  const variantCopy = data.variantsCopy?.[variantKey] || {};

  const heroHeadline = variantCopy.heroHeadline || data.heroHeadline || "Premium Local Services";
  const heroSubheadline = variantCopy.heroSubheadline || data.heroSubheadline || "Dedicated quality and reliable support crafted exactly around your requirements.";
  const aboutText = variantCopy.aboutText || data.aboutText || "We are a locally owned service committed to bringing you the highest standard of excellence.";
  const ctaText = variantCopy.ctaText || data.ctaText || "Get In Touch";
  const whyChooseUs = Array.isArray(variantCopy.whyChooseUs) ? variantCopy.whyChooseUs : data.whyChooseUs || ["Experienced Professionals", "Customer-Centric Care", "100% Satisfaction Guarantee"];

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

  const resolvedCategory = (() => {
    if (category === 'coaching') return 'coaching_center';
    if (category === 'repair_shop') return 'mobile_repair';
    return category;
  })();

  const baseIndustryImages = images[resolvedCategory] || images.general;
  const uploadedImages = data.uploadedImages || {};

  // Prioritize uploaded storefront/product images over industry placeholders
  const industryImages = {
    hero: uploadedImages.storefront || baseIndustryImages.hero,
    feature: uploadedImages.products?.[0] || uploadedImages.storefront || baseIndustryImages.feature,
    staff: uploadedImages.products?.[1] || baseIndustryImages.staff
  };

  const renderLogoAndName = (className = "text-xl font-bold tracking-tight truncate", containerClassName = "flex items-center gap-2 min-w-0") => (
    <div className={containerClassName}>
      {uploadedImages.logo && (
        <img src={uploadedImages.logo} className="h-7 w-7 rounded-full object-cover flex-shrink-0 border border-current border-opacity-10 shadow-sm" alt="Logo" />
      )}
      <span className={className}>{businessName}</span>
    </div>
  );

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
      footerBg: "bg-amber-905 text-amber-100/80 border-t border-amber-900/20",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: Coffee
    },
    cafe: {
      bg: "bg-[#fcf8f2] text-[#3e2723]",
      headerBg: "bg-amber-950/5 border-b border-amber-900/10",
      accentText: "text-amber-900",
      accentBg: "bg-amber-800 hover:bg-amber-900 text-white",
      cardBg: "bg-white border border-amber-100 shadow-sm hover:shadow-md transition-shadow",
      iconColor: "text-amber-800 bg-amber-50",
      buttonSecondary: "border border-amber-800 text-amber-900 hover:bg-amber-50/50",
      footerBg: "bg-[#1b100a] text-amber-100/70 border-t border-amber-900/40",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: Coffee
    },
    salon: {
      bg: "bg-[#fffafc] text-[#3c1d29]",
      headerBg: "bg-rose-900/5 border-b border-rose-900/10",
      accentText: "text-rose-700",
      accentBg: "bg-rose-600 hover:bg-rose-700 text-white",
      cardBg: "bg-white border border-rose-100 shadow-sm hover:shadow-md transition-shadow",
      iconColor: "text-rose-700 bg-rose-50",
      buttonSecondary: "border border-rose-700 text-rose-900 hover:bg-rose-50/50",
      footerBg: "bg-rose-950 text-[#fdeff4] border-t border-rose-900/20",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: Palette
    },
    gym: {
      bg: "bg-[#09090b] text-[#f4f4f5]",
      headerBg: "bg-zinc-900/80 border-b border-zinc-800",
      accentText: "text-orange-500",
      accentBg: "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/10",
      cardBg: "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors",
      iconColor: "text-orange-500 bg-orange-950/40",
      buttonSecondary: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800",
      footerBg: "bg-zinc-900 text-zinc-500 border-t border-zinc-800",
      fontDisplay: "font-sans font-black tracking-tighter uppercase",
      fontBody: "font-sans",
      badgeIcon: Activity
    },
    clinic: {
      bg: "bg-[#f4faf8] text-[#1e3d36]",
      headerBg: "bg-teal-900/5 border-b border-teal-900/10",
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
    coaching_center: {
      bg: "bg-[#faf9fc] text-[#2c1d3c]",
      headerBg: "bg-indigo-950/5 border-b border-indigo-900/10",
      accentText: "text-indigo-700",
      accentBg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10",
      cardBg: "bg-white border border-indigo-100 hover:border-indigo-200 transition-all shadow-sm",
      iconColor: "text-indigo-700 bg-indigo-50",
      buttonSecondary: "border border-indigo-600 text-indigo-800 hover:bg-indigo-50/50",
      footerBg: "bg-indigo-950 text-indigo-100/70 border-t border-indigo-900/15",
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
    mobile_repair: {
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
      headerBg: "bg-slate-900/80 border-b border-slate-900",
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
    plumbing: {
      bg: "bg-[#f4f7fc] text-slate-850",
      headerBg: "bg-blue-900/5 border-b border-blue-900/10",
      accentText: "text-blue-700",
      accentBg: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10",
      cardBg: "bg-white border border-blue-100 hover:border-blue-200 transition-all shadow-sm",
      iconColor: "text-blue-700 bg-blue-50",
      buttonSecondary: "border border-blue-600 text-blue-800 hover:bg-blue-50/50",
      footerBg: "bg-blue-950 text-blue-100/80 border-t border-blue-900/20",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      badgeIcon: Wrench
    },
    electrician: {
      bg: "bg-[#09090b] text-[#f4f4f5]",
      headerBg: "bg-zinc-900/80 border-b border-zinc-800",
      accentText: "text-amber-500",
      accentBg: "bg-amber-600 hover:bg-amber-500 text-black shadow-lg shadow-amber-500/10",
      cardBg: "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors",
      iconColor: "text-amber-500 bg-amber-950/40",
      buttonSecondary: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800",
      footerBg: "bg-zinc-950 text-zinc-500 border-t border-zinc-900",
      fontDisplay: "font-sans font-black tracking-tighter uppercase",
      fontBody: "font-sans",
      badgeIcon: Zap
    },
    hvac: {
      bg: "bg-[#f5fbfd] text-slate-850",
      headerBg: "bg-sky-900/5 border-b border-sky-900/10",
      accentText: "text-sky-700",
      accentBg: "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10",
      cardBg: "bg-white border border-sky-100 hover:border-sky-200 transition-all shadow-sm",
      iconColor: "text-sky-700 bg-sky-50",
      buttonSecondary: "border border-sky-600 text-sky-800 hover:bg-sky-50/50",
      footerBg: "bg-sky-950 text-sky-100/70 border-t border-sky-900/15",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      badgeIcon: Wind
    },
    home_services: {
      bg: "bg-[#f7faf6] text-[#223e1e]",
      headerBg: "bg-emerald-900/5 border-b border-emerald-900/10",
      accentText: "text-emerald-700",
      accentBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10",
      cardBg: "bg-white border border-emerald-100 hover:border-emerald-200 transition-all shadow-sm",
      iconColor: "text-emerald-700 bg-emerald-50",
      buttonSecondary: "border border-emerald-600 text-emerald-800 hover:bg-emerald-50/50",
      footerBg: "bg-emerald-950 text-emerald-100/70 border-t border-emerald-900/15",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      badgeIcon: Home
    },
    professional_services: {
      bg: "bg-[#fafafc] text-slate-900",
      headerBg: "bg-slate-950/5 border-b border-slate-900/10",
      accentText: "text-slate-800",
      accentBg: "bg-slate-800 hover:bg-slate-900 text-white shadow-md",
      cardBg: "bg-white border border-slate-200 hover:border-slate-350 transition-all shadow-sm",
      iconColor: "text-slate-800 bg-slate-50",
      buttonSecondary: "border border-slate-850 text-slate-900 hover:bg-slate-50",
      footerBg: "bg-slate-900 text-slate-300 border-t border-slate-850",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      badgeIcon: Briefcase
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
      buttonSecondary: "border border-indigo-600 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-50/50"
    },
    amber: {
      accentText: "text-amber-700 dark:text-amber-400",
      accentBg: "bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-500/10",
      iconColor: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/40",
      buttonSecondary: "border border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-50/50"
    },
    emerald: {
      accentText: "text-emerald-700 dark:text-emerald-400",
      accentBg: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-500/10",
      iconColor: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/40",
      buttonSecondary: "border border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50/50"
    },
    rose: {
      accentText: "text-rose-600 dark:text-rose-400",
      accentBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10",
      iconColor: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/40",
      buttonSecondary: "border border-rose-600 text-rose-700 dark:text-rose-300 hover:bg-rose-50/50"
    },
    sky: {
      accentText: "text-sky-600 dark:text-sky-400",
      accentBg: "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10",
      iconColor: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-900/40",
      buttonSecondary: "border border-sky-600 text-sky-700 dark:text-sky-300 hover:bg-sky-50/50"
    }
  };

  const baseTheme = themeConfig[resolvedCategory] || themeConfig.general;
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
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 min-h-[44px] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
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
  const renderIndustrySections = () => {
    // ----------------------------------------------------
    // 1. RESTAURANT CATEGORY
    // ----------------------------------------------------
    if (resolvedCategory === 'restaurant' || resolvedCategory === 'cafe') {
      const items = industryDetails?.menuItems?.length > 0 ? industryDetails.menuItems : [
        { name: "Artisanal Brew & Organic Espresso", price: "$4.99", desc: "Crafted using custom hand-selected premium beans roasted weekly." },
        { name: "Wildflower Honey Pastry", price: "$6.50", desc: "Fresh house-baked dough glazed with pure organic local honey." },
        { name: "Avocado Sourdough Board", price: "$12.00", desc: "Toasted country sourdough topped with mashed avocado, olive oil, and herbs." }
      ];
      const staff = industryDetails?.teamMembers?.length > 0 ? industryDetails.teamMembers : [
        { name: resolvedCategory === 'cafe' ? "Alex Rivera" : "Chef Marcus Vance", role: resolvedCategory === 'cafe' ? "Master Barista" : "Head Culinary Artist" }
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
    if (resolvedCategory === 'salon') {
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
            <div className="text-left border-l-4 border-rose-600 pl-3">
              <span className="text-[9px] uppercase tracking-wider font-bold text-rose-600">Satisfaction Guaranteed Services</span>
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
    if (resolvedCategory === 'mobile_repair') {
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
              <h3 className="text-lg font-bold uppercase text-slate-355">Quick Repair Estimates</h3>
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
                    <p className="text-[10px] text-slate-550 font-sans font-light leading-normal">{tier.features.join(" • ")}</p>
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
    if (resolvedCategory === 'electronics_store') {
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
                    <span className="text-[9px] text-slate-555 font-semibold">100% Certified / Brand Warranty</span>
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
            <h3 className="text-lg font-bold uppercase text-slate-355">Secure Product Stock Slot</h3>
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
                      className="px-2 py-1 min-h-[30px] rounded text-[9px] font-bold text-white bg-indigo-600 hover:bg-indigo-700"
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
                    <p className="text-[10px] text-slate-550 font-sans font-light leading-normal">{prod.desc}</p>
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
    if (resolvedCategory === 'gym') {
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
              <h3 className="text-lg font-light text-zinc-355">Membership Tariff</h3>
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
    if (resolvedCategory === 'clinic') {
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
                <p className="text-[10px] text-slate-550">Complex medical checks, specialized pediatric care plans, and second opinions.</p>
              </div>
            </div>
          </div>
        );
      }
    }

    // ----------------------------------------------------
    // 7. COACHING CATEGORY
    // ----------------------------------------------------
    if (resolvedCategory === 'coaching_center') {
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
                      className="px-3 py-1.5 min-h-[30px] rounded text-[9px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex-shrink-0"
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
                    className="w-full py-2 min-h-[38px] rounded text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
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
                    <p className="text-[10px] text-slate-550 font-sans font-light leading-normal">{c.desc}</p>
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
            <h3 className="text-xl font-bold font-sans text-indigo-900">Curriculum Catalog</h3>
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
    if (resolvedCategory === 'retail_store') {
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
                    <p className="text-[10px] text-slate-555 leading-normal">{item.desc}</p>
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
    // TRADES CATEGORIES (plumbing, electrician, hvac, home_services)
    // ----------------------------------------------------
    if (resolvedCategory === 'plumbing' || resolvedCategory === 'electrician' || resolvedCategory === 'hvac' || resolvedCategory === 'home_services') {
      const items = services?.length > 0 ? services : [
        { name: "Emergency Dispatch & Repair", desc: "Fast response troubleshooting and restoration for urgent faults." },
        { name: "Full System Installation", desc: "Professional setup of certified hardware and pipelines." },
        { name: "Routine Maintenance & Audit", desc: "Detailed diagnostic inspections to prevent future service breakdowns." }
      ];
      
      const details = {
        plumbing: { title: "Plumbing Service Area & Rates", emergency: "24/7 Leak & Drain Clean Callouts", cert: "Wrench Certified Master Plumbers" },
        electrician: { title: "Electrical Safety & Wiring", emergency: "Immediate Power Failure Response", cert: "Licensed Electricians & Wiring Audits" },
        hvac: { title: "Climate & Air Ventilation Systems", emergency: "Same-Day Heating & AC Troubleshooting", cert: "EPA Certified Air Quality Technicians" },
        home_services: { title: "Professional Handyman Home Care", emergency: "Prompt Home Maintenance & Fixes", cert: "Certified Handyman Teams & Guaranteed Care" }
      }[resolvedCategory] || { title: "Service Areas & Packages", emergency: "Prompt Emergency Callout Services", cert: "Fully Licensed Local Experts" };

      if (variant === 1) {
        return (
          <div className="space-y-6 text-left">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider">{details.emergency}</h4>
                <p className="text-[10px] opacity-80 mt-1">Average response time under 45 minutes in local sectors.</p>
              </div>
              <Phone className="w-5 h-5 animate-bounce flex-shrink-0" />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg uppercase pl-3 border-l-4 border-emerald-500">Service Commitments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-2`}>
                    <h4 className="font-bold text-xs sm:text-sm">{item.name}</h4>
                    <p className="text-[10px] opacity-75">{item.desc}</p>
                    <div className="text-[9px] text-emerald-650 font-bold border-t border-slate-100 dark:border-slate-800 pt-2">
                      {details.cert}
                    </div>
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
              <h3 className="text-lg font-bold uppercase text-slate-700 dark:text-slate-300">{details.title}</h3>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme.cardBg} flex justify-between items-center gap-4`}>
                    <div>
                      <h4 className="font-bold text-xs">{item.name}</h4>
                      <p className="text-[10px] opacity-70 mt-0.5">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedService(item.name);
                        document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 min-h-[30px] rounded text-[10px] font-bold text-white flex-shrink-0 ${theme.accentBg}`}
                    >
                      Book Fast Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 bg-black/5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Quick Booking Form</h4>
              {bookingSubmitted ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-center text-xs font-bold">
                  Callback slot booked! A technician will call in 15 minutes.
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
                  <button 
                    onClick={() => setBookingSubmitted(true)}
                    className={`w-full py-2 min-h-[38px] rounded text-xs font-bold text-white ${theme.accentBg}`}
                  >
                    Confirm Callback
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-8 text-left">
            <div className="p-6 bg-black/5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
              <Wrench className="w-10 h-10 text-indigo-550 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-bold text-sm">Our Local Craftsmanship Commitment</h4>
                <p className="text-xs opacity-75 leading-relaxed font-light font-sans">We started with a simple belief: clean, honest trade services done right the first time. Our crew members live locally, hold master credentials, and treat your home with the care it deserves.</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-base uppercase tracking-wider font-light text-center">Bespoke Solutions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-xs">
                {items.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold uppercase tracking-wide border-b border-current pb-1 border-opacity-10">{item.name}</h4>
                    <p className="text-[10px] opacity-75 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-8 font-serif max-w-2xl mx-auto text-left text-xs">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Bespoke Diagnostics</span>
              <h3 className="text-xl font-light text-slate-800 dark:text-slate-200">Custom Engineering Tariffs</h3>
            </div>
            <div className="space-y-4 font-sans text-xs">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span>{item.name}</span>
                  <span className="font-bold text-[#8b5a2b]">{details.cert}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-indigo-400 font-bold">Technician Service Matrix</span>
              <h3 className="text-2xl font-black mt-1">High-Impact Trade Operations</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-block bg-indigo-500/10 text-indigo-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">Certified</span>
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
    // PROFESSIONAL SERVICES CATEGORY (professional_services)
    // ----------------------------------------------------
    if (resolvedCategory === 'professional_services') {
      const items = services?.length > 0 ? services : [
        { name: "Strategic Business Consulting", desc: "Diagnostic assessments, process improvement plans, and operational alignment reviews." },
        { name: "Financial Risk & Advisory", desc: "Detailed audits, budget forecasting models, and customized tax optimization charts." },
        { name: "Executive Leadership Training", desc: "Mentorship modules, talent assessment strategies, and team growth workshops." }
      ];

      if (variant === 1) {
        return (
          <div className="space-y-6 text-left">
            <div className="text-left border-l-4 border-slate-700 pl-3">
              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Verified Corporate Solutions</span>
              <h3 className={`text-xl font-bold uppercase tracking-tight ${theme.fontDisplay}`}>Management Consulting Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme.cardBg} space-y-2`}>
                  <h4 className="font-bold text-xs sm:text-sm">{item.name}</h4>
                  <p className="text-[10px] opacity-75">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 2) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-bold uppercase text-slate-700 dark:text-slate-300">Request A Free Strategy Assessment</h3>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme.cardBg} flex justify-between items-center gap-4`}>
                    <div>
                      <h4 className="font-bold text-xs">{item.name}</h4>
                      <p className="text-[10px] opacity-70 mt-0.5">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedService(item.name);
                        document.getElementById("lead-form")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 min-h-[30px] rounded text-[10px] font-bold text-white flex-shrink-0 ${theme.accentBg}`}
                    >
                      Book Consultation
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 bg-black/5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Contact Advisers</h4>
              {bookingSubmitted ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-center text-xs font-bold animate-pulse">
                  Strategy call requested! We will call you shortly.
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
                  <input type="email" placeholder="Your Corporate Email" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded px-2.5 py-1.5 text-xs text-inherit focus:outline-none" />
                  <button 
                    onClick={() => setBookingSubmitted(true)}
                    className={`w-full py-2 min-h-[38px] rounded text-xs font-bold text-white ${theme.accentBg}`}
                  >
                    Get Strategy Proposal
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      if (variant === 3) {
        return (
          <div className="space-y-8 text-left">
            <div className="p-6 bg-black/5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
              <Briefcase className="w-10 h-10 text-slate-550 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-bold text-sm">Our Advisory Mission</h4>
                <p className="text-xs opacity-75 leading-relaxed font-light font-sans">We partner with businesses to unlock scalable potential. By diagnosing structural inefficiencies, designing custom roadmaps, and providing hands-on training, we turn growth goals into clear, predictable realities.</p>
              </div>
            </div>
          </div>
        );
      }

      if (variant === 4) {
        return (
          <div className="space-y-8 font-serif max-w-2xl mx-auto text-left text-xs">
            <div className="text-center space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-slate-500 block">Executive Selection</span>
              <h3 className="text-xl font-light text-slate-800 dark:text-slate-200">Consultation Directory</h3>
            </div>
            <div className="space-y-4 font-sans text-xs">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span>{item.name}</span>
                  <span className="font-bold">Bespoke Review</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (variant === 5) {
        return (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-bold">Solutions Catalog</span>
              <h3 className="text-2xl font-black mt-1">Strategic Operations</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
              {items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg} flex flex-col justify-between`}>
                  <div className="space-y-3">
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
          <span className="text-[9px] uppercase tracking-widest text-slate-555 font-bold block text-center">Our Commitment</span>
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

  // Testimonials Slider markup
  const renderTestimonials = () => {
    const list = testimonials?.length > 0 ? testimonials : [
      { name: "Sarah M.", text: "Absolutely incredible service. Friendly, fast, and exceeded all my expectations!" },
      { name: "David K.", text: "Professional staff and unbeatable quality. Highly recommend to everyone in the area." }
    ];

    return (
      <div className="space-y-6 py-6 font-sans">
        <div className="text-center">
          <h3 className={`text-xl font-bold uppercase tracking-wider ${theme.fontDisplay}`}>What Our Clients Say</h3>
          <div className="w-10 h-0.5 bg-current mx-auto opacity-20 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((t, idx) => (
            <div key={idx} className={`p-4 sm:p-6 rounded-2xl ${theme.cardBg} italic relative text-xs font-light leading-relaxed text-left break-words`}>
              <span className="absolute top-2 left-3 text-3xl opacity-10 font-serif">“</span>
              <p className="relative z-10 pt-2 opacity-90">"{t.text}"</p>
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-right mt-4 opacity-75">— {t.name}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPhotoGallery = () => {
    const photos = uploadedImages.products || [];
    if (photos.length === 0) return null;

    return (
      <div className="space-y-6 py-6 font-sans">
        <div className="text-left border-l-4 border-current pl-3">
          <span className="text-[9px] uppercase tracking-wider font-bold opacity-60">Gallery & Showcase</span>
          <h3 className={`text-xl font-bold uppercase tracking-tight ${theme.fontDisplay}`}>Product & Service Photos</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-current border-opacity-10 shadow-sm relative group bg-black/5">
              <img 
                src={photo} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                alt={`Showcase photo ${index + 1}`} 
              />
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
      <div className={`min-h-full w-full overflow-x-hidden ${theme.bg} ${theme.fontBody} flex flex-col justify-between`}>
        <div className="space-y-12 py-8 max-w-4xl mx-auto px-4 sm:px-6 text-left relative">
          {renderConversionFloaters()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            {renderLogoAndName("text-xl font-bold tracking-tight truncate")}
            <div className="flex-shrink-0">
              <a href={`tel:${phone}`} className={`px-4 py-2 min-h-[44px] flex items-center justify-center rounded text-xs font-bold transition-all ${theme.accentBg}`}>
                Call Now
              </a>
            </div>
          </div>

          {/* Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="md:col-span-7 space-y-4 order-2 md:order-1">
              <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${theme.fontDisplay}`}>{heroHeadline}</h1>
              <p className="text-sm opacity-80 leading-relaxed font-light">{heroSubheadline}</p>
              <div className="pt-2">
                <a href={`tel:${phone}`} className={`inline-flex px-5 py-3 min-h-[44px] items-center justify-center rounded text-sm font-semibold cursor-pointer ${theme.accentBg}`}>
                  {ctaText}
                </a>
              </div>
            </div>
            <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-slate-350 dark:border-slate-800 order-1 md:order-2">
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

          {/* Uploaded Gallery */}
          {renderPhotoGallery()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* About section */}
          <div className="p-4 sm:p-6 bg-black/5 rounded-2xl space-y-3 text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider opacity-60">About Our Company</h4>
            <p className="text-xs opacity-80 leading-relaxed font-light">{aboutText}</p>
          </div>

          {/* Essential Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <h4 className="font-bold uppercase tracking-wider opacity-60 mb-1">Our Location</h4>
              <p className="opacity-90 leading-relaxed">{address}</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider opacity-60 mb-1">Business Hours</h4>
              <p className="opacity-90 leading-relaxed">{hours}</p>
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
      <div className={`min-h-full w-full overflow-x-hidden ${theme.bg} ${theme.fontBody} flex flex-col justify-between`}>
        <div className="space-y-16 py-12 max-w-5xl mx-auto px-4 sm:px-6 text-left relative">
          {renderConversionFloaters()}

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 min-w-0">
              {!uploadedImages.logo && <BadgeIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />}
              {renderLogoAndName("text-lg font-bold tracking-tight truncate")}
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold flex-shrink-0">
              <span className="opacity-75 hidden sm:inline">{hours}</span>
              <a href={`tel:${phone}`} className={`px-4 py-2.5 min-h-[44px] flex items-center justify-center rounded-xl transition-all ${theme.accentBg}`}>
                Call Now
              </a>
            </div>
          </div>

          {/* Split Hero Column */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-50 block">Certified Local Professional</span>
              <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${theme.fontDisplay}`}>{heroHeadline}</h1>
              <p className="text-sm opacity-85 leading-relaxed font-light">{heroSubheadline}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${phone}`} className={`px-5 py-3 min-h-[44px] flex items-center justify-center rounded-xl font-semibold text-xs cursor-pointer ${theme.accentBg}`}>
                  {ctaText}
                </a>
                <a href="#pro-services" className={`px-5 py-3 min-h-[44px] flex items-center justify-center rounded-xl font-semibold text-xs cursor-pointer ${theme.buttonSecondary}`}>
                  Our Services
                </a>
              </div>
            </div>

            {/* Quick Mock Contact Form */}
            <div className="md:col-span-5 bg-black/5 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Request Appointment Slot</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Your Name" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-inherit focus:outline-none focus:border-indigo-500" />
                <input type="email" placeholder="Your Email" className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-inherit focus:outline-none focus:border-indigo-500" />
                <textarea placeholder="Tell us how we can assist you..." rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-inherit resize-none focus:outline-none focus:border-indigo-500" />
                <button type="button" className={`w-full py-2.5 min-h-[44px] flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${theme.accentBg}`}>
                  Book Consultation Slot
                </button>
              </div>
            </div>
          </div>

          {renderTrustBadges()}

          {/* About segment */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-black/5 p-4 sm:p-6 md:p-8 rounded-3xl">
            <div className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md max-w-sm mx-auto w-full">
              <img src={industryImages.feature} className="w-full h-48 object-cover" alt="Featured details" />
            </div>
            <div className="md:col-span-8 space-y-4 text-left">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 text-center md:text-left">Our Corporate Commitment</h4>
              <p className="text-xs opacity-80 leading-relaxed font-light">{aboutText}</p>
            </div>
          </div>

          {/* Services List */}
          <div id="pro-services" className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Our Specialties & Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc, i) => (
                <div key={i} className={`p-4 sm:p-5 rounded-xl ${theme.cardBg} text-left`}>
                  <CheckCircle2 className={`w-5 h-5 mb-3 ${theme.accentText}`} />
                  <h4 className="font-bold text-sm mb-1">{svc.name}</h4>
                  <p className="text-xs opacity-75 font-light leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industry content */}
          {renderIndustrySections()}

          {/* Uploaded Gallery */}
          {renderPhotoGallery()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* Address and Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 sm:p-6 bg-black/5 rounded-2xl text-xs text-left">
            <div className="flex gap-3">
              <MapPin className={`w-5 h-5 flex-shrink-0 ${theme.accentText}`} />
              <div>
                <h5 className="font-bold uppercase tracking-wider opacity-60">Office Location</h5>
                <p className="mt-1 leading-relaxed">{address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className={`w-5 h-5 flex-shrink-0 ${theme.accentText}`} />
              <div>
                <h5 className="font-bold uppercase tracking-wider opacity-60">Working Hours</h5>
                <p className="mt-1 leading-relaxed">{hours}</p>
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
      <div className={`min-h-full w-full overflow-x-hidden ${theme.bg} ${theme.fontBody} flex flex-col justify-between relative`}>
        {/* Glow circles */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-16 flex-1">
          {renderConversionFloaters()}

          {/* Header */}
          <div className="flex justify-between items-center relative z-10 gap-4">
            <div className="flex items-center gap-2 min-w-0">
              {!uploadedImages.logo && (
                <div className={`p-1.5 rounded-lg ${theme.accentText} bg-opacity-10 bg-current flex-shrink-0`}>
                  <BadgeIcon className="w-4 h-4" />
                </div>
              )}
              {renderLogoAndName("font-bold tracking-wider uppercase text-xs truncate")}
            </div>
            <div className="flex-shrink-0">
              <a href={`tel:${phone}`} className={`px-4 py-2 min-h-[44px] flex items-center justify-center rounded-xl text-xs font-semibold transition-all ${theme.accentBg}`}>
                Connect Now
              </a>
            </div>
          </div>

          {/* Hero Area */}
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className={`text-[9px] tracking-widest font-bold uppercase px-3.5 py-1 rounded-full bg-current bg-opacity-10 ${theme.accentText} inline-block`}>
              Highly Recommended Local Business
            </span>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none ${theme.fontDisplay}`}>{heroHeadline}</h1>
            <p className="text-sm opacity-80 leading-relaxed font-light">{heroSubheadline}</p>
            <div className="pt-4 flex justify-center">
              <a href={`tel:${phone}`} className={`px-6 py-3 min-h-[44px] flex items-center justify-center rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${theme.accentBg}`}>
                Call Us: {phone}
              </a>
            </div>
          </div>

          {/* Large visual card */}
          <div className="rounded-3xl overflow-hidden border border-current border-opacity-10 shadow-2xl relative z-10 max-w-3xl mx-auto">
            <img src={industryImages.hero} className="w-full h-64 object-cover" alt="Hero Details" />
          </div>

          {renderTrustBadges()}

          {/* Services Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {services.map((svc, i) => (
              <div key={i} className={`p-5 rounded-2xl transition-transform hover:-translate-y-1 duration-300 text-left ${theme.cardBg}`}>
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

          {/* Uploaded Gallery */}
          {renderPhotoGallery()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* About Section */}
          <div className="max-w-xl mx-auto text-center space-y-3 relative z-10">
            <h4 className="text-xs uppercase tracking-widest font-bold opacity-60">Who We Are</h4>
            <p className="text-xs opacity-80 font-light leading-relaxed">{aboutText}</p>
          </div>

          {/* Contact/Map Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-left p-4 sm:p-6 bg-black/5 rounded-2xl relative z-10 max-w-2xl mx-auto">
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
      <div className={`min-h-full w-full overflow-x-hidden ${theme.bg} ${theme.fontDisplay} flex flex-col justify-between`}>
        <div className="py-20 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-16 relative flex-1">
          {renderConversionFloaters()}
          
          {/* Luxury Logo */}
          <div className="space-y-2">
            {renderLogoAndName("text-3xl font-light uppercase tracking-[0.2em] break-words", "flex items-center gap-2 min-w-0 justify-center")}
            <div className="w-16 h-0.5 bg-current mx-auto opacity-30" />
          </div>

          {/* Fine Tagline & Description */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl leading-tight font-light">{heroHeadline}</h1>
            <p className="text-sm font-sans tracking-wide leading-relaxed font-light opacity-75">{heroSubheadline}</p>
            <div className="pt-4 font-sans">
              <a href={`tel:${phone}`} className={`px-6 py-3 min-h-[44px] inline-flex items-center justify-center rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer ${theme.accentBg}`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left font-sans">
              {services.map((svc, i) => (
                <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-200">{svc.name}</h4>
                    <p className="text-xs opacity-60 font-light">{svc.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Industry details */}
          {renderIndustrySections()}

          {/* Uploaded Gallery */}
          {renderPhotoGallery()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* Elegant About block */}
          <div className="p-6 sm:p-8 border border-current border-opacity-10 rounded-2xl max-w-xl mx-auto text-left font-sans">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Our History & Values</h4>
            <p className="text-xs opacity-75 font-light leading-relaxed">{aboutText}</p>
          </div>

          {/* Fine Details block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-xs font-sans tracking-wider border-t border-current border-opacity-10 pt-8 text-left max-w-2xl mx-auto">
            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-widest text-slate-500">Our Location</h5>
              <p className="opacity-80 font-light leading-relaxed">{address}</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-widest text-slate-500">Appointment Hours</h5>
              <p className="opacity-80 font-light leading-relaxed">{hours}</p>
              <p className="opacity-80 font-light mt-2">Direct support: <span className={`font-semibold ${theme.accentText}`}>{phone}</span></p>
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
      <div className={`min-h-full w-full overflow-x-hidden ${theme.bg} ${theme.fontBody} flex flex-col justify-between`}>
        <div className="py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-20 text-left relative flex-1">
          {renderConversionFloaters()}
          
          {/* Navigation */}
          <header className="flex justify-between items-center relative z-10 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {!uploadedImages.logo && (
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${theme.accentBg}`}>
                  <BadgeIcon className="w-4 h-4 text-white" />
                </div>
              )}
              {renderLogoAndName("font-bold tracking-tight text-lg truncate")}
            </div>
            <div className="flex-shrink-0">
              <a href={`tel:${phone}`} className={`px-5 py-2.5 min-h-[44px] flex items-center justify-center rounded-xl font-bold text-sm tracking-tight transition-transform hover:-translate-y-0.5 ${theme.accentBg}`}>
                Call
              </a>
            </div>
          </header>

          {/* Hero & Media split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-10 border border-opacity-20 text-xs font-semibold tracking-wider uppercase ${theme.accentText} bg-current border-current`}>
                <Award className="w-3.5 h-3.5" />
                Premium Local Standards
              </div>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none ${theme.fontDisplay}`}>
                {heroHeadline}
              </h1>
              <p className="text-sm opacity-85 leading-relaxed font-light">{heroSubheadline}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href={`tel:${phone}`} className={`px-6 py-3 min-h-[44px] flex items-center justify-center rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${theme.accentBg}`}>
                  {ctaText}
                </a>
                <a href="#flagship-details" className={`px-6 py-3 min-h-[44px] flex items-center justify-center rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${theme.buttonSecondary}`}>
                  Explore Offerings
                </a>
              </div>
            </div>

            {/* Graphics Showcase Block */}
            <div className="lg:col-span-5 relative max-w-md mx-auto w-full">
              <div className={`p-4 sm:p-6 rounded-3xl border border-current border-opacity-10 ${theme.cardBg} shadow-xl relative overflow-hidden`}>
                <img src={industryImages.hero} className="w-full h-44 object-cover rounded-xl border border-current border-opacity-10" alt="Showcase hero" />
                <h3 className="font-bold text-xs mt-4 uppercase tracking-wider text-slate-500 mb-2">Our Company Bio</h3>
                <p className="text-xs opacity-75 font-light leading-relaxed">{aboutText}</p>
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
                <div key={i} className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.cardBg}`}>
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

          {/* Uploaded Gallery */}
          {renderPhotoGallery()}

          {/* Testimonials */}
          {renderTestimonials()}

          {/* Contact/Map Banner details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-8 bg-black/5 rounded-3xl text-xs relative z-10 text-left">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Physical Address</span>
              <p className="font-bold text-sm leading-relaxed">{address}</p>
              <p className="text-slate-550 mt-1 leading-normal">Walk-in visits are fully welcomed during hours.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Operational Timings</span>
              <p className="font-bold text-sm leading-relaxed">{hours}</p>
              <p className="text-slate-550 mt-1 leading-normal">Support channels are open online 24/7.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Instant Dial Connection</span>
              <a href={`tel:${phone}`} className="font-bold text-sm text-indigo-500 block hover:underline">{phone}</a>
              <p className="text-slate-550 mt-1 leading-normal">Call for query assistance or instant quote bookings.</p>
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
      console.warn(`Unknown variant "${variant}" requested. Falling back to Variant 1 (renderBasic).`);
      return renderBasic();
  }
}
