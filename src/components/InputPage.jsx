import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowLeft, Wand2, Coffee, Palette, ShieldAlert, HeartHandshake, Mic, MicOff, Settings, Upload, Image, Trash2 } from 'lucide-react';

const SAMPLES = [
  {
    title: "Cozy Cup Cafe",
    icon: Coffee,
    badge: "Eatery & Cafe",
    color: "from-amber-500/20 to-orange-500/20 border-orange-500/30 text-orange-400",
    text: "Cozy Cup Cafe is a warm, inviting coffee house in Seattle. We serve handcrafted espresso beverages, fresh organic pastries, and delicious breakfast options. Located in the heart of downtown at 456 Main Street, Suite A, Seattle, WA 98101. Call us at (555) 234-5678. Open daily from 7:00 AM to 7:00 PM. We offer: Artisanal Espresso & Brews, Fresh Organic Pastries, Catering & Private Events, and Free High-Speed Wi-Fi."
  },
  {
    title: "PixelCraft Agency",
    icon: Palette,
    badge: "Creative Studio",
    color: "from-purple-500/20 to-pink-500/20 border-pink-500/30 text-pink-400",
    text: "PixelCraft Agency is a digital design studio in Austin, TX at 102 Congress Ave. We help ambitious startups build modern web designs, corporate brand identities, and custom mobile apps. Get in touch at (512) 555-0144. Open Monday to Friday from 9:00 AM to 6:00 PM. Our services include: Brand Identity Design, Custom Web & App Dev, Social Media Marketing, and Motion Graphics & UI."
  },
  {
    title: "ZenFit Wellness",
    icon: HeartHandshake,
    badge: "Fitness & Yoga",
    color: "from-teal-500/20 to-emerald-500/20 border-emerald-500/30 text-emerald-400",
    text: "ZenFit Wellness is a peaceful yoga and fitness studio at 789 Serenity Lane, San Francisco, CA. We offer daily group workouts, hot vinyasa yoga sessions, and personalized meditation guidance to help you find balance. Phone: (415) 555-8833. Open daily from 6:00 AM to 8:30 PM. Services: 1-on-1 Personal Coaching, Yoga & Wellness Classes, Deep Tissue Therapy, and Nutrition Planning."
  },
  {
    title: "Vanguard Plumbers",
    icon: ShieldAlert,
    badge: "Professional Services",
    color: "from-blue-500/20 to-sky-500/20 border-sky-500/30 text-sky-400",
    text: "Vanguard Plumbing & Drain is a locally owned service company in Denver. We specialize in residential leak repairs, fast emergency drainage cleanings, and water heater installations. Find us at 303 Industrial Pkwy, Denver, CO 80202 or call (303) 555-9011. Open 24/7 for emergency repairs. Services: Leak Repair, Water Heater Install, Drain Unclogging, and Boiler Diagnostics."
  },
  {
    title: "Shiny Cut (Hinglish)",
    icon: Palette,
    badge: "Beauty & Salon",
    color: "from-rose-500/20 to-pink-500/20 border-pink-500/30 text-pink-450",
    text: "Humara salon ka naam hai Shiny Cut aur hum hair cutting, coloring aur styling services Noida sector 62 me de rahe hain. Timings basically subah 9 AM se raat 8 PM tak hai. WhatsApp ya phone pe contact karne ke liye call karein +91 98765 43210. Um actually, clients hume bohot pasand karte hain and hum generic pricing ki jagah premium results dete hain. Open daily."
  },
  {
    title: "QuickFix (Hinglish)",
    icon: ShieldAlert,
    badge: "Repair Shop",
    color: "from-sky-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-400",
    text: "Mera laptop aur mobile repair shop Noida Sector 15 me hai, shop ka naam hai QuickFix Repairs. Hum Apple, Samsung, Google Pixel devices ki screen aur battery 1 ghante me change karte hain. Timing is morning 10:00 AM se evening 7:30 PM. Phone number dial karo +91 99999 88888. Matlab customers humara rate aur details check kar sakein isliye online page banana hai."
  }
];

export default function InputPage({ onBack, onGenerate, error, onClearError }) {
  const [description, setDescription] = useState("");
  
  // Optional Image Uploads State
  const [uploadedImages, setUploadedImages] = useState({
    logo: null,
    storefront: null,
    products: []
  });

  const handleFileUpload = (type, files) => {
    if (!files || files.length === 0) return;
    
    if (type === 'logo' || type === 'storefront') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else if (type === 'products') {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages(prev => ({
            ...prev,
            products: [...prev.products, reader.result].slice(0, 6) // Max 6 images
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (type, index = null) => {
    if (type === 'logo' || type === 'storefront') {
      setUploadedImages(prev => ({
        ...prev,
        [type]: null
      }));
    } else if (type === 'products') {
      setUploadedImages(prev => ({
        ...prev,
        products: prev.products.filter((_, i) => i !== index)
      }));
    }
  };
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  
  // Voice Input & Diagnostics States
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState("");
  const [micPermission, setMicPermission] = useState("checking...");

  const recognitionRef = useRef(null);
  const baseTextRef = useRef("");

  // Requirement 5: Specific animated progress steps
  const steps = [
    "Analyzing Business",
    "Understanding Industry",
    "Writing Content",
    "Designing Website",
    "Finalizing Experience"
  ];

  // Query microphone permission state
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'microphone' })
        .then((permissionStatus) => {
          setMicPermission(permissionStatus.state);
          permissionStatus.onchange = () => {
            setMicPermission(permissionStatus.state);
          };
        })
        .catch((err) => {
          console.warn("Unable to query microphone permission state:", err);
          setMicPermission("unknown");
        });
    } else {
      setMicPermission("unsupported");
    }
  }, []);

  // Check SpeechRecognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    } else {
      setSpeechSupported(true);
    }
  }, []);

  const toggleListening = () => {
    if (!speechSupported) return;

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
        recognitionRef.current = null;
      }
      setIsListening(false);
    } else {
      setSpeechError("");
      baseTextRef.current = description;
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      try {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onresult = (event) => {
          // Guard: ignore results if this instance is no longer the active session
          if (recognitionRef.current !== rec) return;

          let sessionTranscript = '';
          for (let i = 0; i < event.results.length; ++i) {
            const text = event.results[i][0].transcript;
            if (sessionTranscript && !sessionTranscript.endsWith(' ') && !text.startsWith(' ')) {
              sessionTranscript += ' ';
            }
            sessionTranscript += text;
          }
          
          const base = baseTextRef.current.trim() ? baseTextRef.current.trim() + " " : "";
          setDescription(base + sessionTranscript);
        };

        rec.onerror = (event) => {
          if (recognitionRef.current !== rec) return;
          console.error("Speech Error:", event);

          const errorDescriptions = {
            'not-allowed': "Microphone permission was denied by user or system.",
            'network': "Network communication failure occurred.",
            'audio-capture': "No audio capture device found or microphone is busy.",
            'no-speech': "No speech was detected by the microphone.",
            'service-not-allowed': "Speech recognition service is not allowed by this browser."
          };

          const details = errorDescriptions[event.error] || "An unrecognized speech error occurred.";
          setSpeechError(`[Code: ${event.error}] ${details}`);
          setIsListening(false);
          recognitionRef.current = null;
        };

        rec.onend = () => {
          if (recognitionRef.current !== rec) return;
          setIsListening(false);
          recognitionRef.current = null;
        };

        recognitionRef.current = rec;
        rec.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setSpeechError("[Code: start-failed] Could not initialize voice input.");
        setIsListening(false);
        recognitionRef.current = null;
      }
    }
  };

  const handleGenerate = async () => {
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
      setIsListening(false);
    }

    if (!description.trim()) return;
    setIsGenerating(true);
    setLoadingStep(0);
    if (onClearError) onClearError();

    // Start simulated steps timer at 800ms interval
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setLoadingStep(currentStep);
      }
    }, 800);

    // Minimum visual duration of 4.0 seconds (within the 3-5 seconds requirement)
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 4000));

    try {
      const [success] = await Promise.all([
        onGenerate(description, uploadedImages),
        minTimePromise
      ]);

      clearInterval(interval);
      setIsGenerating(false);
    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleUseSample = (sampleText) => {
    if (onClearError) onClearError();
    setDescription(sampleText);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-white flex flex-col justify-between overflow-hidden">
      {/* Decorative gradient background glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <button
          onClick={onBack}
          disabled={isGenerating}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold">VoiceStore</span>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 relative z-10 flex flex-col items-center justify-center space-y-8">
        {isGenerating ? (
          /* Generate Progress Loader screen */
          <div className="w-full max-w-md glass rounded-3xl p-8 border border-slate-700/60 shadow-2xl text-center space-y-6 my-auto animate-fade-in">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <Wand2 className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">Designing Webpage</h3>
              <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold">
                Step {loadingStep + 1} of {steps.length}
              </p>
            </div>

            <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="h-6 flex items-center justify-center">
              <p className="text-sm text-slate-400 animate-pulse">
                {steps[loadingStep]}...
              </p>
            </div>
          </div>
        ) : (
          /* Normal Inputs Screen */
          <div className="w-full space-y-8 my-auto">
            {/* Header Text */}
            <div className="text-center space-y-3">
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                Describe your business details
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Mention your business name, services, phone, hours, and location. Our AI will extract the metadata and lay out a custom webpage.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-3.5 rounded-xl text-sm max-w-2xl mx-auto flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <p className="text-left font-medium">{error}</p>
              </div>
            )}

            {/* Input and Sample Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Textarea Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl glass p-1.5 border border-slate-700/60 focus-within:border-indigo-500/80 transition-all duration-300 shadow-xl">
                  <textarea
                    value={description}
                    onChange={(e) => {
                      if (error && onClearError) onClearError();
                      setDescription(e.target.value);
                    }}
                    placeholder="e.g. Cozy Grind Cafe is a cozy neighborhood bakery and coffee spot in Austin, TX. We serve signature cinnamon rolls, handcrafted filter coffees, and custom cake orders. Located at 200 Congress Ave. Call us at (512) 555-8932. Open daily 7am to 7pm."
                    rows={12}
                    className="w-full bg-transparent border-0 ring-0 focus:ring-0 text-white placeholder-slate-500 p-4 text-base leading-relaxed resize-none focus:outline-none"
                  />
                  
                  {/* Status row holding counter & SpeechRecognition */}
                  <div className="flex justify-between items-center px-4 pb-2 text-xs text-slate-500 border-t border-slate-800/40 pt-2">
                    <div className="flex gap-4">
                      <span>
                        {description.trim().split(/\s+/).filter(Boolean).length} words
                      </span>
                      <span>
                        {description.length} chars
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {speechError && (
                        <span className="text-rose-400 text-[10px] animate-pulse max-w-[150px] truncate" title={speechError}>
                          {speechError}
                        </span>
                      )}
                      {!speechSupported && (
                        <span className="text-slate-600 text-[10px]">
                          Voice unsupported
                        </span>
                      )}
                      
                      <button
                        type="button"
                        onClick={toggleListening}
                        disabled={!speechSupported}
                        className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 ${
                          isListening 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/10 animate-pulse font-semibold' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                        } disabled:opacity-20 disabled:cursor-not-allowed`}
                        title={isListening ? "Stop Voice Recording" : "Start Voice Recording"}
                      >
                        {isListening ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                            <MicOff className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Listening...</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Optional Image Uploads Component */}
                <div className="rounded-2xl glass p-5 border border-slate-750/60 shadow-xl space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
                    <Image className="w-4.5 h-4.5 text-indigo-400" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">Image Assets (Optional)</h4>
                      <p className="text-[10px] text-slate-500">Add your logo or photos to personalize your generated site</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Logo Upload Dropzone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Business Logo</label>
                      {uploadedImages.logo ? (
                        <div className="relative w-20 h-20 bg-slate-900/60 border border-slate-750 rounded-2xl flex items-center justify-center p-2 group">
                          <img src={uploadedImages.logo} className="w-full h-full object-contain rounded-xl" alt="Logo Preview" />
                          <button 
                            type="button"
                            onClick={() => removeImage('logo')}
                            className="absolute -top-1.5 -right-1.5 p-1 bg-rose-600 hover:bg-rose-500 rounded-full text-white shadow shadow-black/50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="h-20 bg-slate-900/40 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            handleFileUpload('logo', e.dataTransfer.files);
                          }}
                        >
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload('logo', e.target.files)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-4 h-4 text-slate-500 mb-1" />
                          <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Upload Logo</span>
                        </div>
                      )}
                    </div>

                    {/* Storefront Upload Dropzone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Storefront / Hero Photo</label>
                      {uploadedImages.storefront ? (
                        <div className="relative h-20 bg-slate-900/60 border border-slate-750 rounded-2xl flex items-center justify-center overflow-hidden group">
                          <img src={uploadedImages.storefront} className="w-full h-full object-cover" alt="Storefront Preview" />
                          <button 
                            type="button"
                            onClick={() => removeImage('storefront')}
                            className="absolute top-1.5 right-1.5 p-1 bg-rose-600 hover:bg-rose-500 rounded-full text-white shadow shadow-black/50 transition-colors z-10 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="h-20 bg-slate-900/40 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            handleFileUpload('storefront', e.dataTransfer.files);
                          }}
                        >
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload('storefront', e.target.files)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-4 h-4 text-slate-500 mb-1" />
                          <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Upload Storefront</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Products / Services Gallery Dropzone */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Product & Service Photos (Max 6)</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {uploadedImages.products.map((img, index) => (
                        <div key={index} className="relative aspect-square bg-slate-900/60 border border-slate-750 rounded-xl overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" alt={`Product ${index + 1}`} />
                          <button 
                            type="button"
                            onClick={() => removeImage('products', index)}
                            className="absolute top-1 right-1 p-0.5 bg-rose-600 hover:bg-rose-500 rounded-full text-white shadow transition-colors z-10 cursor-pointer"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}

                      {uploadedImages.products.length < 6 && (
                        <div 
                          className="aspect-square bg-slate-900/40 border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            handleFileUpload('products', e.dataTransfer.files);
                          }}
                        >
                          <input 
                            type="file" 
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileUpload('products', e.target.files)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!description.trim()}
                  className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98]"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Generate Website Preview</span>
                </button>
              </div>

              {/* Sample Autofill Column */}
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Select a template to fill
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                  {SAMPLES.map((sample, idx) => {
                    const Icon = sample.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleUseSample(sample.text)}
                        className="group text-left p-4 rounded-xl glass hover:bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 space-y-2.5 active:scale-[0.98]"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-slate-800 group-hover:bg-indigo-900/30 rounded-lg group-hover:text-indigo-400 transition-colors">
                              <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                            </div>
                            <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                              {sample.title}
                            </span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border bg-gradient-to-r ${sample.color}`}>
                            {sample.badge}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                          {sample.text}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Browser Voice Diagnostics Panel */}
            <details className="w-full max-w-4xl text-left glass rounded-2xl border border-slate-800/80 p-4 transition-all duration-300 relative z-10 group">
              <summary className="text-[10px] sm:text-xs text-slate-500 cursor-pointer font-semibold uppercase tracking-wider hover:text-slate-300 select-none flex items-center gap-2 outline-none">
                <Settings className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                <span>Browser Voice Diagnostics Panel</span>
              </summary>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800/60">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                    Speech API Support
                  </span>
                  <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                    speechSupported 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {speechSupported ? "SUPPORTED" : "UNSUPPORTED"}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                    Mic Permission Status
                  </span>
                  <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] capitalize ${
                    micPermission === 'granted' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : micPermission === 'denied' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {micPermission}
                  </span>
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-3 lg:col-span-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                    Browser User Agent
                  </span>
                  <p className="text-[10px] text-slate-500 font-sans leading-normal break-all select-all pt-0.5">
                    {navigator.userAgent}
                  </p>
                </div>
              </div>
            </details>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 text-center text-xs text-slate-600 relative z-10">
        VoiceStore generates standard modern landing pages using pure React, Gemini API & Tailwind CSS.
      </footer>
    </div>
  );
}
