import React, { useState } from 'react';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, Sparkles, Plus, 
  Trash2, Copy, Check, ChevronRight, Edit3, X, Sliders, LayoutGrid,
  Globe, Loader2, AlertTriangle, CheckCircle2, ExternalLink
} from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';
import { saveBusinessWebsite } from '../lib/supabase';

const CONCEPTS = [
  { 
    id: 1, 
    variantId: 1, 
    name: "Trust-focused Local", 
    desc: "Emphasizes reviews, local trust, and direct phone link.",
    layoutDesc: "A layout focusing on credibility checkmarks, Google/Yelp star badges, and a direct Call conversion action." 
  },
  { 
    id: 2, 
    variantId: 2, 
    name: "Lead-Generation Form", 
    desc: "Direct estimate quote form directly in the hero block.",
    layoutDesc: "A split column layout featuring an appointment/estimate submission form, services matrix, and clear CTAs."
  },
  { 
    id: 3, 
    variantId: 3, 
    name: "Storytelling & Brand", 
    desc: "Immersive hero layout detailing the founder's passion.",
    layoutDesc: "A narrative brand layout with behind-the-scenes staff quotes, visual gallery items, and storytelling reviews."
  },
  { 
    id: 4, 
    variantId: 4, 
    name: "Premium Boutique", 
    desc: "Sophisticated typography, catalog, and minimal layout.",
    layoutDesc: "Luxury editorial aesthetic with serif fonts, catalog layout pricing lists, and minimal border styling."
  },
  { 
    id: 5, 
    variantId: 5, 
    name: "Modern High-Impact", 
    desc: "Interactive steps, bold headers, and staggered cards.",
    layoutDesc: "A tech-forward design featuring bold dark sections, step-by-step checklist process blocks, and asymmetric showcase cards."
  }
];

// Confetti Component for Celebratory Success Screen
const Confetti = () => {
  const colors = [
    'bg-[#6366f1]', // Indigo
    'bg-[#a855f7]', // Purple
    'bg-[#ec4899]', // Pink
    'bg-[#10b981]', // Emerald
    'bg-[#f59e0b]', // Amber
    'bg-[#0ea5e9]'  // Sky
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 45 }).map((_, i) => {
        const size = Math.random() * 8 + 4; // 4px to 12px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 2; // 0s to 2s
        const duration = Math.random() * 2.5 + 2.5; // 2.5s to 5s
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={i}
            className={`absolute rounded-sm ${color} animate-confetti-fall`}
            style={{
              width: `${size}px`,
              height: `${size * (Math.random() * 1.5 + 0.5)}px`,
              left: `${left}%`,
              top: `-20px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        );
      })}
    </div>
  );
};

export default function PreviewPage({ data, onBack, onUpdateData, onRetry }) {
  const [viewMode, setViewMode] = useState('selection'); // 'selection' or 'preview'
  const [selectedConcept, setSelectedConcept] = useState(CONCEPTS[0]);
  const [viewport, setViewport] = useState('desktop'); // 'desktop', 'tablet', 'mobile375', 'mobile390', 'mobile430'
  const [copied, setCopied] = useState(false);
  const [newServiceText, setNewServiceText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [cooldown, setCooldown] = useState(data.cooldownSeconds || 0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Supabase Publishing states
  const [isPublishingModalOpen, setIsPublishingModalOpen] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [publishedId, setPublishedId] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToastNotification = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  const getCleanShareUrl = (id) => {
    if (!id) return '';
    const origin = window.location.origin;
    let pathname = window.location.pathname || '/';
    // Clean index.html if present
    if (pathname.endsWith('index.html')) {
      pathname = pathname.slice(0, -10);
    }
    // Ensure pathname ends with a slash
    if (!pathname.endsWith('/')) {
      pathname += '/';
    }
    return `${origin}${pathname}?site=${id}`;
  };

  const handlePublish = async () => {
    setPublishLoading(true);
    setPublishError(null);
    setPublishedId(null);
    setIsPublishingModalOpen(true);
    try {
      const siteId = await saveBusinessWebsite(data, selectedConcept.variantId);
      setPublishedId(siteId);
      showToastNotification("Website published successfully.");
    } catch (err) {
      console.error("Publishing error:", err);
      setPublishError(err.message || "Something went wrong while publishing your website.");
    } finally {
      setPublishLoading(false);
    }
  };

  // Sync cooldown from prop updates if they happen
  React.useEffect(() => {
    setCooldown(data.cooldownSeconds || 0);
  }, [data.cooldownSeconds]);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleRetryClick = async () => {
    if (cooldown > 0 || isRetrying) return;
    setIsRetrying(true);
    try {
      if (onRetry) {
        await onRetry();
      }
    } catch (e) {
      console.error("Regeneration error:", e);
    } finally {
      setIsRetrying(false);
    }
  };

  const renderQuotaBanner = () => {
    // Only show if fallback generation was used
    if (data.generationMethod !== 'fallback') return null;

    const bannerText = data.isQuotaError
      ? "AI generation is temporarily unavailable due to usage limits. A simplified website was generated instead."
      : "A simplified website was generated locally because no AI key is configured.";

    return (
      <div className="w-full bg-amber-600/95 text-white border-b border-amber-500 py-3.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs z-40 relative backdrop-blur-md shadow-lg animate-fade-in font-sans">
        <div className="flex items-center gap-2">
          <span className="bg-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Fallback Mode
          </span>
          <span className="font-semibold text-slate-100">{bannerText}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleRetryClick}
            disabled={cooldown > 0 || isRetrying}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-amber-950 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-sm cursor-pointer min-h-[36px]"
          >
            {isRetrying ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : cooldown > 0 ? (
              <span>Retry in {cooldown}s</span>
            ) : (
              <span>Retry with AI</span>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Quick handlers to modify field data
  const handleFieldChange = (field, value) => {
    onUpdateData({
      ...data,
      [field]: value
    });
  };

  // Service item updates
  const handleServiceChange = (index, value) => {
    const updatedServices = [...data.services];
    updatedServices[index] = {
      ...updatedServices[index],
      name: value
    };
    handleFieldChange('services', updatedServices);
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceText.trim()) return;
    if (data.services.length >= 6) {
      alert("Maximum of 6 services allowed for this preview template.");
      return;
    }
    const newSvc = { name: newServiceText.trim(), desc: "Custom service details." };
    handleFieldChange('services', [...data.services, newSvc]);
    setNewServiceText("");
  };

  const handleRemoveService = (index) => {
    const updatedServices = data.services.filter((_, i) => i !== index);
    handleFieldChange('services', updatedServices);
  };

  // Simulate exporting HTML/CSS code
  const handleCopyCode = () => {
    const mockCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.businessName}</title>
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
</head>
<body>
  <!-- Generated site code for ${data.businessName} (Category: ${data.category}, Concept: ${selectedConcept.name}) -->
  <!-- Feel free to paste this into an editor! -->
</body>
</html>
    `.trim();

    navigator.clipboard.writeText(mockCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Requirement 7: Specific mobile viewport widths (375px, 390px, 430px)
  const viewportWidths = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] max-w-full border-x-4 border-slate-800 rounded-2xl',
    mobile375: 'w-[375px] max-w-full border-x-4 border-slate-850 rounded-3xl',
    mobile390: 'w-[390px] max-w-full border-x-4 border-slate-850 rounded-3xl',
    mobile430: 'w-[430px] max-w-full border-x-4 border-slate-850 rounded-3xl'
  };

  const handleSelectConcept = (concept) => {
    setSelectedConcept(concept);
    setViewMode('preview');
  };

  return (
    <div className="h-screen bg-[#070913] text-white flex flex-col overflow-hidden relative font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* VIEW MODE 1: Selection Gallery Page */}
      {/* ---------------------------------------------------- */}
      {viewMode === 'selection' && (
        <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col justify-between relative">
          {renderQuotaBanner()}
          {/* Background lights */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Nav */}
          <header className="max-w-6xl w-full mx-auto flex justify-between items-center pb-8 border-b border-slate-900 z-10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-semibold">Change Description</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display text-sm font-bold">VoiceStore AI</span>
            </div>
          </header>

          {/* Main Grid */}
          <main className="max-w-6xl w-full mx-auto py-12 space-y-10 z-10 flex-1 flex flex-col justify-center">
            
            <div className="space-y-3.5 text-center">
              <p className="text-[10px] tracking-[0.2em] font-bold text-indigo-400 uppercase">
                Generation Completed
              </p>
              {/* Requirement 4: "Choose Your Favorite Website" header */}
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Choose Your Favorite Website
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
                Our AI generated 5 distinct visual concepts for <span className="font-bold text-slate-200">{data.businessName}</span> using marketing-copy and realistic graphics. Choose one to preview:
              </p>
            </div>

            {/* Gallery Grid of Actual Mini-Previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-6">
              {CONCEPTS.map((concept) => (
                <div
                  key={concept.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectConcept(concept)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectConcept(concept);
                    }
                  }}
                  className="group text-left rounded-2xl glass hover:bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {/* Miniature HTML Live Web Preview Frame */}
                  <div className="h-44 w-full bg-[#080a14] border-b border-slate-900 flex items-center justify-center p-3 relative group-hover:bg-[#0b0e1d] transition-colors select-none overflow-hidden">
                    <div className="w-[180px] h-[135px] rounded-lg overflow-hidden border border-slate-800/80 shadow-2xl relative bg-white transition-transform duration-300 group-hover:scale-[1.03]">
                      <div 
                        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
                        style={{
                          width: '900px',
                          height: '675px',
                          transform: 'scale(0.2)', // Scales 900px down to fit 180px wide frame
                        }}
                      >
                        <TemplateRenderer data={data} variant={concept.variantId} />
                      </div>
                    </div>
                  </div>

                  {/* Text card section */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500">Variant {concept.id}</span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-200 group-hover:text-white transition-colors">{concept.name}</h4>
                      <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2">{concept.desc}</p>
                    </div>
                    <div className="flex items-center text-[10px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors pt-2 border-t border-slate-900">
                      <span>Preview Live Layout</span>
                      <ChevronRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-0.5 ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* Footer */}
          <footer className="w-full max-w-6xl mx-auto text-center text-[10px] text-slate-655 z-10 pt-8 border-t border-slate-950">
            Powered by VoiceStore AI Engine • Pure Client-Side Composition
          </footer>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* VIEW MODE 2: Large Visual Preview Mode (80-90% Screen) */}
      {/* ---------------------------------------------------- */}
      {viewMode === 'preview' && (
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {renderQuotaBanner()}
          
          {/* Minimal Floating Top Control Navbar */}
          <nav className="h-16 border-b border-slate-900 flex items-center justify-between px-4 sm:px-6 bg-[#090b15]/95 backdrop-blur-md flex-shrink-0 z-35">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('selection')}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs font-semibold py-1.5 px-2.5 hover:bg-slate-800/40 rounded-xl cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Gallery</span>
              </button>
              <div className="hidden md:block h-4 w-px bg-slate-800" />
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Concept:</span>
                <span className="font-bold text-white bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-lg">
                  {selectedConcept.name}
                </span>
              </div>
            </div>

            {/* Viewport controls (Desktop, Tablet, and 3 Mobile presets) */}
            <div className="hidden md:flex items-center bg-[#101424] p-1 rounded-xl gap-0.5">
              <button
                onClick={() => setViewport('desktop')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${viewport === 'desktop' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Desktop View"
              >
                Desktop
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${viewport === 'tablet' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Tablet View"
              >
                Tablet
              </button>
              <button
                onClick={() => setViewport('mobile375')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${viewport === 'mobile375' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Mobile SE View (375px)"
              >
                375px
              </button>
              <button
                onClick={() => setViewport('mobile390')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${viewport === 'mobile390' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Mobile 12 Pro View (390px)"
              >
                390px
              </button>
              <button
                onClick={() => setViewport('mobile430')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${viewport === 'mobile430' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                title="Mobile Pro Max View (430px)"
              >
                430px
              </button>
            </div>

            {/* Action buttons (Requirement 6: "Customize Website") */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
                title="Customize Website"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Customize</span>
              </button>

              <button
                onClick={handlePublish}
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all hover:translate-y-[-1px] active:translate-y-0 cursor-pointer"
                title="Publish Website"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Publish</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/10 transition-all hover:translate-y-[-1px] active:translate-y-0 cursor-pointer"
                title="Export Code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export</span>
                  </>
                )}
              </button>
            </div>
          </nav>

          {/* Full Screen Preview Viewport Frame (Hero of the page) */}
          <div className="flex-1 bg-[#05070e] flex items-center justify-center overflow-hidden relative">
            
            {/* Viewport wrapper occupies 85% width of container for visual framing */}
            <div className="h-[88%] w-[90%] md:w-[85%] flex items-center justify-center transition-all duration-500 pb-4">
              <div 
                className={`h-full flex flex-col bg-white text-slate-800 transition-all duration-300 shadow-2xl relative ${viewportWidths[viewport]}`}
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                {/* Browser bar top decoration for tablet and mobile */}
                {viewport !== 'desktop' && (
                  <div className="bg-slate-800 text-slate-400 h-9 flex items-center justify-between px-4 flex-shrink-0 select-none text-[10px] rounded-t-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="bg-slate-900 rounded px-6 py-0.5 text-slate-500 tracking-wide text-center w-40 truncate">
                      {data.businessName.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                    <div className="w-8" />
                  </div>
                )}

                {/* Render the generated site with selected variant */}
                <div className="flex-1 overflow-y-auto relative h-full">
                  <TemplateRenderer data={data} variant={selectedConcept.variantId} />
                </div>

                {/* Home indicator for mobile simulation */}
                {viewport.startsWith('mobile') && (
                  <div className="bg-slate-800 h-6 flex items-center justify-center flex-shrink-0 rounded-b-xl border-t border-slate-700/50">
                    <div className="w-24 h-1 bg-slate-650 rounded-full" />
                  </div>
                )}
              </div>
            </div>

            {/* Floating Concept Switcher Dock at the bottom */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#0d1124]/90 backdrop-blur-md border border-slate-800/80 p-2 rounded-2xl flex items-center gap-2 shadow-2xl z-30 select-none max-w-[95%] overflow-x-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 pl-2 hidden sm:inline">Variants:</span>
              <div className="flex items-center gap-1">
                {CONCEPTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConcept(c)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                      selectedConcept.id === c.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            
          </div>

          {/* ---------------------------------------------------- */}
          {/* SLIDE-OUT DRAWER EDITOR PANEL OVERLAY */}
          {/* ---------------------------------------------------- */}
          {isDrawerOpen && (
            <>
              {/* Dark backdrop blur mask */}
              <div 
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fade-in"
              />
              
              {/* Drawer Container Panel */}
              <aside className="fixed inset-y-0 right-0 w-[420px] max-w-full bg-[#0d101e]/98 border-l border-slate-800 z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 transform translate-x-0 animate-slide-in">
                
                {/* Header */}
                <div className="p-5 border-b border-slate-850 flex justify-between items-center bg-[#090b16]/50">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Customizer</h3>
                      <p className="text-[10px] text-slate-500">Live preview sync updates automatically</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Form fields */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  
                  {/* Business Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={data.businessName}
                      onChange={(e) => handleFieldChange('businessName', e.target.value)}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors"
                      placeholder="Enter business name"
                    />
                  </div>

                  {/* Theme Category Switcher */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Brand Theme (Typography & Base Structure)
                    </label>
                    <select
                      value={data.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors cursor-pointer text-slate-300"
                    >
                      <option value="restaurant">🍕 Restaurant (Serif, Warm)</option>
                      <option value="cafe">☕ Cafe & Coffee Shop (Serif Warm)</option>
                      <option value="salon">✂️ Beauty & Hair Salon (Rose Soft)</option>
                      <option value="gym">🏋️ Gym & Fitness Center (High-Contrast Bold)</option>
                      <option value="clinic">🩺 Medical & Dental Clinic (Teal Clean)</option>
                      <option value="coaching_center">🎓 Coaching & Tuition Center (Indigo Academic)</option>
                      <option value="retail_store">🛍️ Retail Boutique & Store (Minimalist Copper)</option>
                      <option value="mobile_repair">📱 Mobile & Laptop Repair (Carbon Slate)</option>
                      <option value="electronics_store">💻 Electronics & Gadget Store (Cyber Dark)</option>
                      <option value="plumbing">🚰 Plumbing Services (Blue Trust)</option>
                      <option value="electrician">⚡ Electrician Services (Amber Sporty)</option>
                      <option value="hvac">❄️ HVAC & Heating Services (Sky Fresh)</option>
                      <option value="home_services">🏡 Home Services & Cleaning (Emerald Organic)</option>
                      <option value="professional_services">💼 Professional Services (Corporate Serif)</option>
                      <option value="general">🌐 General Local Business (Corporate Slate)</option>
                    </select>
                  </div>

                  {/* Custom Accent Color Overrides */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Custom Accent Color Override
                    </label>
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {['indigo', 'amber', 'emerald', 'rose', 'sky'].map((colorName) => {
                        const bgClasses = {
                          indigo: 'bg-indigo-600',
                          amber: 'bg-amber-600',
                          emerald: 'bg-emerald-600',
                          rose: 'bg-rose-600',
                          sky: 'bg-sky-500'
                        };
                        return (
                          <button
                            key={colorName}
                            type="button"
                            onClick={() => handleFieldChange('accentColor', colorName)}
                            className={`w-6.5 h-6.5 rounded-full ${bgClasses[colorName]} border-2 transition-all cursor-pointer flex items-center justify-center ${
                              data.accentColor === colorName 
                                ? 'border-white scale-110 shadow-md shadow-white/20' 
                                : 'border-transparent opacity-85 hover:opacity-100'
                            }`}
                            title={`Select ${colorName}`}
                          >
                            {data.accentColor === colorName && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => handleFieldChange('accentColor', undefined)}
                        className={`text-[9px] px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                          !data.accentColor 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'bg-transparent border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Hero Headline */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Hero Headline
                    </label>
                    <input
                      type="text"
                      value={data.heroHeadline}
                      onChange={(e) => handleFieldChange('heroHeadline', e.target.value)}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors"
                      placeholder="Hero headline"
                    />
                  </div>

                  {/* Hero Subheadline */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Hero Subheadline
                    </label>
                    <textarea
                      value={data.heroSubheadline}
                      onChange={(e) => handleFieldChange('heroSubheadline', e.target.value)}
                      rows={3}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl p-4 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors leading-relaxed resize-none"
                      placeholder="Hero subheadline text..."
                    />
                  </div>

                  {/* About Text */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      About Description
                    </label>
                    <textarea
                      value={data.aboutText}
                      onChange={(e) => handleFieldChange('aboutText', e.target.value)}
                      rows={3}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl p-4 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors leading-relaxed resize-none"
                      placeholder="About section..."
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Hours */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={data.hours}
                      onChange={(e) => handleFieldChange('hours', e.target.value)}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors"
                      placeholder="Enter hours"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Location Address
                    </label>
                    <input
                      type="text"
                      value={data.address}
                      onChange={(e) => handleFieldChange('address', e.target.value)}
                      className="w-full bg-[#13192a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500/80 transition-colors"
                      placeholder="Enter location"
                    />
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Manage Services ({data.services.length}/6)
                    </label>

                    <form onSubmit={handleAddService} className="flex gap-2">
                      <input
                        type="text"
                        value={newServiceText}
                        onChange={(e) => setNewServiceText(e.target.value)}
                        placeholder="Add service (e.g. Free Wi-Fi)"
                        maxLength={40}
                        className="flex-1 bg-[#13192a] border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="submit"
                        className="p-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </form>

                    <div className="space-y-2">
                      {data.services.map((service, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 bg-[#13192a] border border-slate-800 px-3 py-2 rounded-xl"
                        >
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, e.target.value)}
                            className="flex-1 bg-transparent border-none text-xs focus:outline-none text-slate-300 focus:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveService(index)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer panel inside drawer */}
                <div className="p-5 border-t border-slate-850 bg-[#090b16]/80 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Live Editing Enabled</span>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-indigo-400 hover:underline font-bold"
                  >
                    Finish Customizing
                  </button>
                </div>

              </aside>
            </>
          )}

        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* PUBLISHING MODAL OVERLAY */}
      {/* ---------------------------------------------------- */}
      {isPublishingModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={!publishLoading ? () => setIsPublishingModalOpen(false) : undefined}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity duration-300 animate-fade-in"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#0d1124] border border-slate-800 rounded-2xl shadow-2xl p-6 transition-all duration-300 relative overflow-hidden animate-scale-in">
              {/* Background gradient flare */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
              
              {/* Close Button (disabled while loading) */}
              {!publishLoading && (
                <button
                  onClick={() => setIsPublishingModalOpen(false)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {publishLoading && (
                <div className="flex flex-col items-center text-center space-y-5 py-6">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white tracking-wide">Publishing Website</h3>
                    <p className="text-[11px] text-slate-400 max-w-[280px] leading-relaxed">
                      Saving your database record and preparing a shareable site URL...
                    </p>
                  </div>
                </div>
              )}

              {publishError && !publishLoading && (
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-455">
                    <AlertTriangle className="w-6.5 h-6.5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white tracking-wide">Publishing Failed</h3>
                    <p className="text-xs text-rose-300 max-w-[320px] leading-relaxed break-words font-medium">
                      {publishError}
                    </p>
                  </div>
                  <div className="w-full flex items-center gap-3 pt-4 border-t border-slate-900 mt-2">
                    <button
                      onClick={() => setIsPublishingModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-slate-800 hover:bg-slate-800 text-slate-350 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[38px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePublish}
                      className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-rose-650/10 cursor-pointer min-h-[38px]"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {publishedId && !publishLoading && !publishError && (
                <div className="flex flex-col items-center text-center space-y-5 py-2 relative">
                  {/* Confetti Rain */}
                  <Confetti />

                  {/* Celebratory badge */}
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-450 shadow-lg shadow-emerald-500/5 relative z-10 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1 relative z-10">
                    <h3 className="text-xl font-display font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-emerald-450 bg-clip-text text-transparent">
                      Published Successfully
                    </h3>
                    <p className="text-xs text-slate-400 max-w-[280px] leading-relaxed mx-auto">
                      Your business website is now officially live on the internet!
                    </p>
                  </div>

                  {/* Live link card */}
                  <div className="w-full bg-[#13192a]/80 border border-slate-800 rounded-2xl p-3 text-left space-y-1 relative z-10">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 block pl-1">Live URL</span>
                    <div className="text-[11px] text-indigo-300 truncate font-mono select-all px-1">
                      {getCleanShareUrl(publishedId)}
                    </div>
                  </div>

                  {/* Open Website and Copy Link Buttons */}
                  <div className="w-full flex flex-col sm:flex-row gap-3 relative z-10">
                    <button
                      onClick={() => {
                        const url = getCleanShareUrl(publishedId);
                        navigator.clipboard.writeText(url);
                        setLinkCopied(true);
                        setTimeout(() => setLinkCopied(false), 2000);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[40px]"
                    >
                      {linkCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-450" />
                          <span className="text-emerald-400">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getCleanShareUrl(publishedId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/10 transition-all active:scale-[0.98] cursor-pointer min-h-[40px]"
                    >
                      <span>Open Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* QR Code Container */}
                  <div className="w-full flex flex-col items-center bg-[#13192a]/50 border border-slate-800/80 rounded-2xl p-4 gap-2.5 relative z-10">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Scan to view on mobile</span>
                    <div className="bg-white p-2 rounded-xl shadow-xl border border-slate-200">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(getCleanShareUrl(publishedId))}&color=0d1124&bgcolor=ffffff`} 
                        alt="QR Code" 
                        className="w-32 h-32 select-none"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Done / Close footer action */}
                  <div className="w-full pt-3 border-t border-slate-900 relative z-10 flex justify-end">
                    <button
                      onClick={() => setIsPublishingModalOpen(false)}
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-350 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-60 animate-slide-in-right flex items-center gap-3 bg-[#0d1124]/95 border border-emerald-500/30 text-white px-4 py-3.5 rounded-xl shadow-2xl backdrop-blur-md max-w-sm">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-semibold tracking-wide text-slate-200">{toast.message}</p>
        </div>
      )}

    </div>
  );
}
