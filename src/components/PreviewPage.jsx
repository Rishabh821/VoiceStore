import React, { useState } from 'react';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, Sparkles, Plus, 
  Trash2, Copy, Check, ChevronRight, Edit3, X, Sliders, LayoutGrid 
} from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';

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

export default function PreviewPage({ data, onBack, onUpdateData }) {
  const [viewMode, setViewMode] = useState('selection'); // 'selection' or 'preview'
  const [selectedConcept, setSelectedConcept] = useState(CONCEPTS[0]);
  const [viewport, setViewport] = useState('desktop'); // 'desktop', 'tablet', 'mobile375', 'mobile390', 'mobile430'
  const [copied, setCopied] = useState(false);
  const [newServiceText, setNewServiceText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                <button
                  key={concept.id}
                  onClick={() => handleSelectConcept(concept)}
                  className="group text-left rounded-2xl glass hover:bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl active:scale-[0.98] cursor-pointer"
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
                </button>
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
          
          {/* Minimal Floating Top Control Navbar */}
          <nav className="h-16 border-b border-slate-900 flex items-center justify-between px-4 sm:px-6 bg-[#090b15]/95 backdrop-blur-md flex-shrink-0 z-35">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('selection')}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs font-semibold py-2 px-3 hover:bg-slate-800/40 rounded-xl cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Gallery</span>
              </button>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
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
                className="flex items-center gap-1.5 px-4 py-2 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize Website</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/10 transition-all hover:translate-y-[-1px] active:translate-y-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Export Code</span>
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
                      <option value="restaurant">🍕 Restaurant & Cafe (Serif, Warm)</option>
                      <option value="salon">✂️ Beauty & Hair Salon (Rose Soft)</option>
                      <option value="repair_shop">🔧 Mobile & Laptop Repair Shop (Carbon Slate)</option>
                      <option value="electronics_store">💻 Electronics & Gadget Store (Cyber Dark)</option>
                      <option value="gym">🏋️ Gym & Fitness Center (High-Contrast Bold)</option>
                      <option value="clinic">🩺 Medical & Dental Clinic (Teal Clean)</option>
                      <option value="coaching">🎓 Coaching & Tuition Center (Indigo Academic)</option>
                      <option value="retail_store">🛍️ Retail Boutique & Store (Minimalist Copper)</option>
                      <option value="general">💼 General Local Business (Corporate Slate)</option>
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

    </div>
  );
}
