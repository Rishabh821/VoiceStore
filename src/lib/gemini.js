import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseBusinessText } from "../utils/parser";

/**
 * Extracts copy-rich, structured business details from freeform text using Google Gemini AI.
 * Supports multilingual inputs, speech fillers, and outputs detailed local-business friendly marketing copy.
 * @param {string} text - The natural language description of the business.
 * @returns {Promise<object>} The parsed business details.
 */
export async function extractBusinessInfo(text) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const validCategories = [
    "restaurant",
    "cafe",
    "salon",
    "gym",
    "clinic",
    "coaching_center",
    "retail_store",
    "mobile_repair",
    "electronics_store",
    "plumbing",
    "electrician",
    "hvac",
    "home_services",
    "professional_services",
    "general"
  ];

  const runLocalFallback = (isQuota = false, cooldownSeconds = 0) => {
    console.warn("Gemini API call failed or is unavailable (possibly offline, 429 quota limits, or invalid key). Running client-side heuristic fallback generation...");
    try {
      const heuristicParsed = parseBusinessText(text);
      const matchedCat = validCategories.includes(heuristicParsed.category) 
        ? heuristicParsed.category 
        : "general";

      const bizName = heuristicParsed.businessName || "My Business";

      return {
        businessName: bizName,
        phone: heuristicParsed.phone || "(555) 123-4567",
        hours: heuristicParsed.hours || "Mon - Sun: 9:00 AM - 6:00 PM",
        address: heuristicParsed.address || "123 Main Street, Cityville",
        businessType: matchedCat,
        heroHeadline: `Premium ${bizName} Services`,
        heroSubheadline: `Professional quality and reliable support for all your ${matchedCat} needs.`,
        aboutText: `We are a locally owned service committed to bringing you the highest standard of excellence. Our team pairs expert knowledge with friendly customer support.`,
        ctaText: "Connect With Us",
        whyChooseUs: [
          "Experienced Professionals",
          "Customer-Centric Care",
          "100% Satisfaction Guarantee"
        ],
        services: Array.isArray(heuristicParsed.services) 
          ? heuristicParsed.services.map(s => ({ name: s, desc: "Professional high-quality service." }))
          : [
              { "name": "Quality Support", "desc": "Customized plans designed to achieve target metrics." },
              { "name": "Dedicated Craftsmanship", "desc": "Expert builders delivering prompt, reliable care." }
            ],
        testimonials: [
          { "name": "Sarah M.", "text": "Absolutely incredible service. Friendly, fast, and exceeded all my expectations!" },
          { "name": "David K.", "text": "Professional staff and unbeatable quality. Highly recommend to everyone in the area." }
        ],
        industryDetails: makeDefaultIndustryDetails(bizName, matchedCat),
        variantsCopy: makeDefaultVariantsCopy(bizName, matchedCat),
        generationMethod: 'fallback',
        isQuotaError: isQuota,
        cooldownSeconds: cooldownSeconds,
        originalText: text
      };
    } catch (fallbackError) {
      console.error("Heuristic fallback failed completely:", fallbackError);
      throw new Error(`Unable to generate website. Gemini model failed and local fallback failed.`);
    }
  };

  // Check if API Key is missing or empty
  if (!apiKey || apiKey.trim() === "" || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    console.warn("Gemini API key not found. Using local client-side fallback...");
    return runLocalFallback(false, 0);
  }

  const prompt = `
You are an expert multilingual business analyst, local SEO copywriter, and UI designer. Analyze the following text description of a business.
This text may be a transcript of natural voice inputs, which can include natural speech patterns, incomplete sentences, grammar errors, code-switching, and common filler words (such as "um", "uh", "actually", "basically", "like", "you know", "matlab", "basically speaking", "yaani", "accha").

The text can be in English, Hindi, or Hinglish (Hindi written using the Latin/English script, e.g., "humara salon name hai Shiny Cut aur hum hair services de rhe hain, timings hai 9am se 9pm, phone no dial karo...").

Input business description:
"""
${text}
"""

Instructions for Extraction:
1. Extract the business details and compile them into a clean JSON object in clean, professional, local-business friendly English.
2. Translate any Hindi or Hinglish details into professional English.
3. Filter out voice filler words and ignore incomplete or trailing sentence fragments.
4. Always return valid JSON matching the exact schema below.
5. Infer missing fields: If phone, hours, address, or services are missing, you MUST generate reasonable, plausible mock values based on the business type and description. Do NOT leave them as empty strings or placeholders.
6. Generate professional, copy-heavy marketing lines. You MUST generate completely different, distinct headlines, subheadlines, about text, and call-to-actions for each variant in the 'variantsCopy' object, representing 5 completely different marketing concepts and conversion strategies. The copy should not feel like slight variations; it should feel like 5 different writers wrote them.
7. Generate highly realistic, highly detailed, specific local business content for the industryDetails and services fields. Avoid generic names like 'Service 1' or 'Brand A' or 'Signature Dish 1'. Instead, use highly specific, authentic names suitable for the category:
   - For 'restaurant': menuItems should contain realistic dishes (e.g., 'Pan-Seared Organic Salmon', 'Truffle Mushroom Risotto'), prices, and precise ingredient-focused descriptions.
   - For 'cafe': menuItems should contain beverages/pastries (e.g., 'Honduran Cold Brew', 'Warm Butter Croissant') with prices and brewing descriptions.
   - For 'salon': pricingTiers and services should feature beauty treatments, haircuts, and styling options (e.g., 'Balayage Color Highlights', 'Scalp Hydration & Massage').
   - For 'gym': pricingTiers should show memberships, programs, or classes (e.g., 'Unlimited Elite Access', 'Strength & HIIT Bootcamp').
   - For 'clinic': services, teamMembers, and pricingTiers should detail care specialties, consulting doctors, and check-up services (e.g., 'Preventive Care Specialty', 'Dr. Sarah Patel, Pediatric Lead').
   - For 'mobile_repair': brands must contain actual brands (e.g., 'Apple', 'Samsung', 'Google', 'OnePlus'), services should detail turnaround times (e.g. '30-Minute Screen Replacement'), warranty, and pricingTiers should feature common repair tiers.
   - For 'plumbing', 'electrician', 'hvac', 'home_services': services and industryDetails should detail emergency services (e.g., '24/7 Burst Pipe Repair', 'Emergency Electrical Diagnostic'), service areas, certifications, response times, and realistic tool/fixture brands (e.g., 'Kohler', 'Carrier', 'Moen', 'Siemens', 'Lutron').
   - For 'coaching_center': services and pricingTiers should cover actual courses, curricula, class timings, and tutor qualifications (e.g., 'AP Calculus Prep Masterclass', 'Python for Young Creators').
   - For 'retail_store', 'electronics_store': products should list real-life items, specifications, and prices (e.g., 'Vapor-Core Running Shoes', '4K Ultra-HD OLED Smart TV').
8. Classify the business into exactly one of these 15 'businessType' styling categories:
   - 'restaurant': For restaurants, bakeries, food trucks, bistros, and dining spots.
   - 'cafe': For coffee shops, cozy cafes, tea rooms, and espresso bars.
   - 'salon': For hair salons, beauty salons, nail spas, barbershops, wellness massage centers, and skin care clinics.
   - 'gym': For fitness centers, gym clubs, crossfit boxes, yoga spaces, pilates studios, and personal training facilities.
   - 'clinic': For medical clinics, dental clinics, doctor consulting rooms, diagnostic centers, and health clinics.
   - 'coaching_center': For coaching centers, tuition classes, learning academies, language centers, software training hubs, and music academies.
   - 'retail_store': For clothing boutiques, shoe stores, grocery stores, supermarkets, flower shops, and general retail outlets.
   - 'mobile_repair': For mobile phone repair shops, laptop repair shops, gadget repairs, and local device handymen.
   - 'electronics_store': For gadget stores, home appliance retailers, mobile shops, computer sales, and electronics outlets.
   - 'plumbing': For residential/commercial plumbing, pipe fixing, drain cleaning, and water leak diagnostics.
   - 'electrician': For residential/commercial electrical repair, wiring, panel upgrades, and lighting installers.
   - 'hvac': For heating, ventilation, air conditioning service, heat pump repair, and climate control installers.
   - 'home_services': For home cleaning, lawn mowing, general handymen, interior repair, and garden services.
   - 'professional_services': For consulting firms, accounting, tax advisers, law offices, agencies, and design studios.
   - 'general': For general businesses, local agencies, and any company types not covered by the categories above.

JSON Structure Requirements:
{
  "businessName": "Name of the business (infer a creative name based on the description if missing)",
  "phone": "A clean phone number (format as (XXX) XXX-XXXX or Indian style +91 XXXXX XXXXX). Generate a mock phone number if not found.",
  "hours": "The operating hours (e.g. 'Mon - Sat: 9:00 AM - 8:00 PM'). Generate reasonable hours if not found.",
  "address": "The physical address or location details. Generate a plausible street address if not found.",
  "businessType": "Must be exactly one of: 'restaurant', 'cafe', 'salon', 'gym', 'clinic', 'coaching_center', 'retail_store', 'mobile_repair', 'electronics_store', 'plumbing', 'electrician', 'hvac', 'home_services', 'professional_services', or 'general'",
  
  "variantsCopy": {
    "v1": {
      "comment": "Trust-focused local business layout copy",
      "heroHeadline": "Headline emphasizing authority, satisfaction guarantees, and trust (e.g., 'Fully Certified & Insured Local Plumbers in Denver')",
      "heroSubheadline": "Subheadline highlighting local reviews and credentials (e.g., '100% satisfaction guarantee with 24/7 support. Serving families since 2010.')",
      "aboutText": "About copy focused on local roots, credentials, and reliability.",
      "ctaText": "Call for Service",
      "whyChooseUs": ["Trust Reason 1", "Trust Reason 2", "Trust Reason 3"]
    },
    "v2": {
      "comment": "Conversion-focused lead generation layout copy",
      "heroHeadline": "Headline encouraging direct appointment booking or estimates (e.g., 'Get a Fast & Free Phone Repair Estimate in Noida')",
      "heroSubheadline": "Subheadline focusing on speed, convenience, and direct action (e.g., 'Drop in or fill out our quick estimator below. Most repairs completed in under 1 hour.')",
      "aboutText": "About copy focusing on prompt response and service efficiency.",
      "ctaText": "Book Service Now",
      "whyChooseUs": ["Speed Reason 1", "Speed Reason 2", "Speed Reason 3"]
    },
    "v3": {
      "comment": "Storytelling and brand-focused layout copy",
      "heroHeadline": "Artistic or narrative headline (e.g., 'Crafting Memories Over Fresh Organic Coffee')",
      "heroSubheadline": "Subheadline telling the journey, organic materials, or passion (e.g., 'Our beans are ethically sourced, hand-roasted in small batches, and served with love in Noida.')",
      "aboutText": "Narrative story detailing the founder's passion, origins, or culinary vision.",
      "ctaText": "Our Story",
      "whyChooseUs": ["Quality Reason 1", "Quality Reason 2", "Quality Reason 3"]
    },
    "v4": {
      "comment": "Premium / luxury presentation layout copy",
      "heroHeadline": "Elegant, minimal, sophisticated headline (e.g., 'The Art of Hair Artistry & Sophisticated Styling')",
      "heroSubheadline": "Subheadline emphasizing luxury, curated attention, and high-end feel (e.g., 'An exclusive beauty sanctuary offering bespoke color highlights and scalp hydration treatments.')",
      "aboutText": "Bespoke about description reflecting high-end aesthetics, premium standards, and elite styling.",
      "ctaText": "Reserve Session",
      "whyChooseUs": ["Bespoke Reason 1", "Bespoke Reason 2", "Bespoke Reason 3"]
    },
    "v5": {
      "comment": "Modern high-impact design layout copy",
      "heroHeadline": "Bold, tech-forward, high-energy headline (e.g., 'Redefining Modern Fitness Standards')",
      "heroSubheadline": "Subheadline highlighting digital apps, modern trainers, and high-impact goals (e.g., 'Interactive workout classes, customized nutrition charts, and modern cardio training.')",
      "aboutText": "Innovative about description highlighting cutting-edge methodologies and modern values.",
      "ctaText": "Explore Programs",
      "whyChooseUs": ["Modern Reason 1", "Modern Reason 2", "Modern Reason 3"]
    }
  },
  
  "services": [
    { "name": "Service/Product Title 1", "desc": "A brief 1-sentence description of the value provided." },
    { "name": "Service/Product Title 2", "desc": "A brief 1-sentence description of the value provided." },
    { "name": "Service/Product Title 3", "desc": "A brief 1-sentence description of the value provided." },
    { "name": "Service/Product Title 4", "desc": "A brief 1-sentence description of the value provided." }
  ],
  
  "testimonials": [
    { "name": "Customer Name 1", "text": "Absolutely incredible service. Friendly, fast, and exceeded all my expectations!" },
    { "name": "Customer Name 2", "text": "Professional staff and unbeatable quality. Highly recommend to everyone in the area." }
  ],
  
  "industryDetails": {
    "menuItems": [ // Used for 'restaurant', 'cafe'. Fill with 3 items if restaurant or cafe, otherwise return empty array.
      { "name": "Signature Dish/Beverage 1", "price": "$12.99", "desc": "Tasty descriptive details of ingredients and preparation." },
      { "name": "Signature Dish/Beverage 2", "price": "$9.49", "desc": "Tasty descriptive details of ingredients and preparation." },
      { "name": "Signature Dish/Beverage 3", "price": "$14.99", "desc": "Tasty descriptive details of ingredients and preparation." }
    ],
    "pricingTiers": [ // Used for 'gym', 'salon', 'mobile_repair', 'electronics_store', 'coaching_center', 'plumbing', 'electrician', 'hvac', 'home_services', 'professional_services'. Fill with 2 plans if applicable, otherwise empty array.
      { "name": "Standard Package/Membership/Service", "price": "$49/mo", "features": ["Feature details 1", "Feature details 2", "Feature details 3"] },
      { "name": "Premium Package/Membership/Service", "price": "$89/mo", "features": ["All standard features", "Exclusive VIP support", "Priority scheduling"] }
    ],
    "teamMembers": [ // Used for 'restaurant' (chefs), 'cafe' (baristas), 'salon' (stylists), 'gym' (trainers), 'clinic' (doctors), 'coaching_center' (teachers), 'plumbing' (plumbers), 'electrician' (electricians), 'hvac' (technicians), 'home_services' (technicians), 'professional_services' (consultants). Fill with 2 names if applicable, otherwise empty array.
      { "name": "Staff/Lead Name 1", "role": "Role (e.g., Head Chef, Master Barista, Senior Stylist, Lead Doctor, Physics Expert, Senior Plumber, Lead Electrician)" },
      { "name": "Staff/Lead Name 2", "role": "Role (e.g., Pastry Chef, Barista Specialist, Hair Specialist, Fitness Coach, Dentist, Coding Tutor, Apprentice Technician)" }
    ],
    "brands": [ // Used for 'mobile_repair', 'electronics_store', 'retail_store', 'plumbing', 'electrician', 'hvac', 'home_services'. List 4 brands/logos (e.g., ["Apple", "Samsung", "Google", "Dell"] or appliance/tool/fixture brands like ["Kohler", "Moen", "Carrier", "Siemens"]).
      "Brand A", "Brand B", "Brand C", "Brand D"
    ],
    "products": [ // Used for 'electronics_store', 'retail_store'. List 3 products with prices.
      { "name": "Featured Product 1", "price": "$199.99", "desc": "Brief product specifications and value." },
      { "name": "Featured Product 2", "price": "$79.99", "desc": "Brief product specifications and value." },
      { "name": "Featured Product 3", "price": "$299.99", "desc": "Brief product specifications and value." }
    ]
  }
}
`;

  let responseText = "";
  let apiError = null;

  // Step 1: Attempt generation with the latest gemini-2.5-flash model
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const result = await model.generateContent(prompt);
    responseText = result.response.text();
    console.log("Raw Gemini Response (gemini-2.5-flash):", responseText);

  } catch (err25) {
    console.warn("gemini-2.5-flash is unavailable. Attempting fallback to gemini-2.0-flash...", err25);
    
    // Step 2: Fallback attempt with gemini-2.0-flash model
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          responseMimeType: "application/json",
        }
      });

      const result = await model.generateContent(prompt);
      responseText = result.response.text();
      console.log("Raw Gemini Response (gemini-2.0-flash):", responseText);
      apiError = null; // Clear error since fallback succeeded
    } catch (err20) {
      console.error("Fallback to gemini-2.0-flash failed as well:", err20);
      apiError = err20;
    }
  }

  // Handle errors
  if (apiError || !responseText) {
    const errorMessage = apiError ? (apiError.message || apiError.toString() || "") : "";
    const isQuota = errorMessage.includes("429") || 
                    errorMessage.toLowerCase().includes("quota") || 
                    errorMessage.includes("RESOURCE_EXHAUSTED") ||
                    (apiError && apiError.status === 429);
    
    let cooldownSeconds = 0;
    if (isQuota) {
      const retryInMatch = errorMessage.match(/retry\s+in\s+([0-9.]+)/i);
      const delayJsonMatch = errorMessage.match(/"retryDelay"\s*:\s*"(\d+)s"/i);
      if (retryInMatch) {
        cooldownSeconds = Math.ceil(parseFloat(retryInMatch[1]));
      } else if (delayJsonMatch) {
        cooldownSeconds = parseInt(delayJsonMatch[1], 10);
      } else {
        cooldownSeconds = 60; // Default fallback cooldown
      }
    }
    
    console.error("[Developer Log] Gemini API Call Failed. Detailed technical error:", apiError);
    return runLocalFallback(isQuota, cooldownSeconds);
  }



  try {
    let cleanedText = responseText.trim();
    
    // Find the first '{' and the last '}' to strip any pre/post conversation text or markdown backticks
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleanedText);

    let mappedBusinessType = parsed.businessType || "general";
    if (mappedBusinessType === 'repair_shop') mappedBusinessType = 'mobile_repair';
    if (mappedBusinessType === 'coaching') mappedBusinessType = 'coaching_center';

    return {
      businessName: parsed.businessName || "My Business",
      phone: parsed.phone || "(555) 123-4567",
      hours: parsed.hours || "Mon - Sun: 9:00 AM - 6:00 PM",
      address: parsed.address || "123 Main Street, Cityville",
      businessType: validCategories.includes(mappedBusinessType)
        ? mappedBusinessType
        : "general",
      heroHeadline: parsed.heroHeadline || "Premium Local Services",
      heroSubheadline: parsed.heroSubheadline || "Dedicated quality and reliable support crafted exactly around your requirements.",
      aboutText: parsed.aboutText || "We are a locally owned service committed to bringing you the highest standard of excellence. Our team pairs expert knowledge with friendly customer support.",
      ctaText: parsed.ctaText || "Get In Touch",
      whyChooseUs: Array.isArray(parsed.whyChooseUs) ? parsed.whyChooseUs : ["Experienced Professionals", "Customer-Centric Care", "100% Satisfaction Guarantee"],
      services: Array.isArray(parsed.services) ? parsed.services : [
        { "name": "Quality Support", "desc": "Customized plans designed to achieve target metrics." },
        { "name": "Dedicated Craftsmanship", "desc": "Expert builders delivering prompt, reliable care." }
      ],
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [
        { "name": "Sarah M.", "text": "Absolutely incredible service. Friendly, fast, and exceeded all my expectations!" },
        { "name": "David K.", "text": "Professional staff and unbeatable quality. Highly recommend to everyone in the area." }
      ],
      industryDetails: parsed.industryDetails || {
        menuItems: [],
        pricingTiers: [],
        teamMembers: [],
        brands: [],
        products: []
      },
      variantsCopy: parsed.variantsCopy || makeDefaultVariantsCopy(parsed.businessName || "My Business", parsed.businessType || "general"),
      generationMethod: 'ai',
      isQuotaError: false,
      cooldownSeconds: 0,
      originalText: text
    };
  } catch (parseError) {
    console.error("JSON parsing failed for response, executing heuristic fallback:", responseText, parseError);
    return runLocalFallback(false, 0);
  }
}

// Helper builder to generate high-quality default variant copy configurations
function makeDefaultVariantsCopy(bizName, matchedCat) {
  return {
    v1: {
      heroHeadline: `Trusted ${bizName} - Local Specialists`,
      heroSubheadline: `Fully certified and locally operated services. 100% satisfaction guarantee on all our work.`,
      aboutText: `We are committed to delivering the highest level of service. Our team brings local roots and expert knowledge to every project.`,
      ctaText: "Call Us Now",
      whyChooseUs: ["Locally Owned & Run", "Satisfaction Guarantee", "Fully Certified Professionals"]
    },
    v2: {
      heroHeadline: `Get a Free Estimate from ${bizName}`,
      heroSubheadline: `Quick turnaround times and direct quote estimates. Connect with us online for immediate details.`,
      aboutText: `Our service processes are streamlined for speed, pricing transparency, and direct customer convenience.`,
      ctaText: "Request Quote Now",
      whyChooseUs: ["Instant Appt Slot", "No Obligation Estimate", "Fast 1-Hour Turnaround"]
    },
    v3: {
      heroHeadline: `The Passion Behind ${bizName}`,
      heroSubheadline: `Ethically sourced materials, artisanal care, and a dedicated journey of local craftsmanship.`,
      aboutText: `Born from a passion to serve the community, we pair traditional expertise with a personalized personal story.`,
      ctaText: "Read Our Story",
      whyChooseUs: ["Artisanal Craftsmanship", "Ethically Sourced", "Community Roots"]
    },
    v4: {
      heroHeadline: `Bespoke Quality at ${bizName}`,
      heroSubheadline: `Curated luxury treatments and elite attention to detail. Experience premium local service.`,
      aboutText: `Designed for those who appreciate premium quality and sophisticated attention. We focus on bespoke client standards.`,
      ctaText: "Reserve Exclusive Session",
      whyChooseUs: ["Luxury Experience", "Bespoke Attention", "Elite Certifications"]
    },
    v5: {
      heroHeadline: `Redefining Standards at ${bizName}`,
      heroSubheadline: `High-impact solutions, modern methodologies, and cutting-edge results built for today's clients.`,
      aboutText: `We pair modern software tools and training methodologies with certified local expertise to achieve target standards.`,
      ctaText: "Explore Dynamic Catalog",
      whyChooseUs: ["Modern Tech Options", "High-Energy Results", "Innovative Methods"]
    }
  };
}

// Helper to construct highly realistic, category-specific local details for client fallbacks
function makeDefaultIndustryDetails(bizName, matchedCat) {
  const details = {
    restaurant: {
      menuItems: [
        { name: "Pan-Seared Organic Salmon", price: "$24.99", desc: "Served with wild rice, baby asparagus, and lemon herb emulsion." },
        { name: "Truffle Mushroom Risotto", price: "$18.50", desc: "Creamy arborio rice with chanterelle mushrooms, white truffle oil, and parmesan." },
        { name: "Crispy Honey Garlic Glazed Ribs", price: "$22.00", desc: "Slow-roasted pork ribs glazed with organic local wildflower honey." }
      ],
      pricingTiers: [],
      teamMembers: [
        { name: "Chef Marcus Vance", role: "Head Culinary Artist" },
        { name: "Lucia Santos", role: "Pastry & Dessert Specialist" }
      ],
      brands: [],
      products: []
    },
    cafe: {
      menuItems: [
        { name: "Honduran Cold Brew Coffee", price: "$4.99", desc: "Steeped for 24 hours, presenting clean notes of milk chocolate and caramel." },
        { name: "Warm Butter Croissant", price: "$3.50", desc: "House-baked daily with imported French butter and flaky organic flour." },
        { name: "Avocado Sourdough Board", price: "$11.00", desc: "Toasted local sourdough topped with mashed avocado, olive oil, and herbs." }
      ],
      pricingTiers: [],
      teamMembers: [
        { name: "Alex Rivera", role: "Master Barista" },
        { name: "Sarah Thorne", role: "Coffee Specialist & Roaster" }
      ],
      brands: [],
      products: []
    },
    salon: {
      menuItems: [],
      pricingTiers: [
        { name: "Cut & Classic Style", price: "$45", features: ["Consultation & custom cut", "Refreshing hair wash", "Blow dry finish"] },
        { name: "Balayage Color Highlight", price: "$140", features: ["Bespoke color consultation", "Premium moisturizing wash", "Scalp massage & style finish"] }
      ],
      teamMembers: [
        { name: "Elena Rostova", role: "Senior Styling Director" },
        { name: "Marcus Thorne", role: "Scalp Health Specialist" }
      ],
      brands: [],
      products: []
    },
    gym: {
      menuItems: [],
      pricingTiers: [
        { name: "Strength & HIIT Pass", price: "$49/mo", features: ["Full cardio room access", "2 fitness trainer consults", "Locker & shower facilities"] },
        { name: "Unlimited Elite Plan", price: "$89/mo", features: ["All standard features", "Unlimited bootcamp classes", "Customized nutrition chart"] }
      ],
      teamMembers: [
        { name: "Coach Derrick Vance", role: "Head Fitness Trainer" },
        { name: "Maya Sterling", role: "Strength & HIIT Instructor" }
      ],
      brands: [],
      products: []
    },
    clinic: {
      menuItems: [],
      pricingTiers: [],
      teamMembers: [
        { name: "Dr. Sarah Patel", role: "Pediatric Lead & Doctor" },
        { name: "Dr. Joseph Kim", role: "Dental Care Director" }
      ],
      brands: [],
      products: []
    },
    coaching_center: {
      menuItems: [],
      pricingTiers: [
        { name: "Standard Subject Prep", price: "$120/mo", features: ["Weekly curriculum prep classes", "Monthly diagnostic mock tests", "Interactive tutor feedback"] },
        { name: "AP Prep Masterclass", price: "$199/mo", features: ["All standard features", "AP Calculus prep sessions", "1-on-1 personalized review"] }
      ],
      teamMembers: [
        { name: "Prof. Alan Vance", role: "AP Physics Specialist" },
        { name: "Diana Chen", role: "Python Coding Tutor" }
      ],
      brands: [],
      products: []
    },
    retail_store: {
      menuItems: [],
      pricingTiers: [],
      teamMembers: [
        { name: "Claire Sterling", role: "Curated Style Director" }
      ],
      brands: ["Levi's", "Nike", "Adidas", "Puma"],
      products: [
        { name: "Vapor-Core Running Shoes", price: "$119.99", desc: "Designed for premium endurance with shock-absorbing foam soles." },
        { name: "Modern Linen Summer Set", price: "$79.99", desc: "100% pure organic breathable linen, styled for comfort." },
        { name: "Artisanal Crafted Leather Boots", price: "$149.00", desc: "Hand-stitched leather boots with comfortable cushioned soles." }
      ]
    },
    electronics_store: {
      menuItems: [],
      pricingTiers: [],
      teamMembers: [
        { name: "Ryan Vance", role: "Senior Diagnostic Specialist" }
      ],
      brands: ["Apple", "Samsung", "Sony", "Dell"],
      products: [
        { name: "4K Ultra-HD OLED Smart TV", price: "$899.99", desc: "Deep blacks and vibrant colors with advanced digital process rendering." },
        { name: "Vibe-Core Wireless Headset", price: "$129.99", desc: "Active noise-canceling stereo sound with 30-hour battery life." },
        { name: "Ultra-Book Lite Laptop", price: "$749.99", desc: "Thin carbon-fiber chassis, fast memory, and long battery life." }
      ]
    },
    mobile_repair: {
      menuItems: [],
      pricingTiers: [
        { name: "Standard Screen / Battery Fix", price: "$59", features: ["30-Minute Screen Replacement", "Premium AAA grade batteries", "90-Day repair warranty"] },
        { name: "Complex Liquid Diagnosis", price: "$99", features: ["Full board cleaning", "Micro-soldering circuit audit", "12-month parts guarantee"] }
      ],
      teamMembers: [
        { name: "Tyler Thorne", role: "Senior Hardware Specialist" },
        { name: "Diana Vance", role: "Diagnostic Technician" }
      ],
      brands: ["Apple", "Samsung", "Google", "OnePlus"],
      products: []
    },
    plumbing: {
      menuItems: [],
      pricingTiers: [
        { name: "Standard Pipe Leak Fix", price: "$99", features: ["Drain cleaning service", "Water leak diagnostics", "Emergency repair callouts"] }
      ],
      teamMembers: [
        { name: "Roy Mercer", role: "Master Plumber Lead" }
      ],
      brands: ["Kohler", "Moen", "American Standard", "Delta"],
      products: []
    },
    electrician: {
      menuItems: [],
      pricingTiers: [
        { name: "Electrical Circuit Audit", price: "$120", features: ["Wiring panel upgrades", "Outlet safety checks", "Licensed electrician report"] }
      ],
      teamMembers: [
        { name: "Gary Sparks", role: "Licensed Electrician Lead" }
      ],
      brands: ["Siemens", "Lutron", "Schneider", "Square D"],
      products: []
    },
    hvac: {
      menuItems: [],
      pricingTiers: [
        { name: "AC Seasonal Maintenance", price: "$110", features: ["EPA certified gas testing", "Filter replacement service", "Air quality audit checks"] }
      ],
      teamMembers: [
        { name: "Ken Breeze", role: "HVAC Certified Technician" }
      ],
      brands: ["Carrier", "Trane", "Lennox", "Goodman"],
      products: []
    },
    home_services: {
      menuItems: [],
      pricingTiers: [
        { name: "Standard Home Maintenance", price: "$80", features: ["Lawn mowing & edge trim", "General handyman adjustments", "Guaranteed customer care"] }
      ],
      teamMembers: [
        { name: "Jeff Handyman", role: "Certified Maintenance Lead" }
      ],
      brands: ["Husqvarna", "DeWalt", "Ryobi", "Makita"],
      products: []
    },
    professional_services: {
      menuItems: [],
      pricingTiers: [
        { name: "Strategic Advisory Session", price: "$250", features: ["Process improvement metrics", "Diagnostic business assessments", "1-on-1 operational alignment review"] }
      ],
      teamMembers: [
        { name: "Diana Vance", role: "Senior Corporate Advisor" }
      ],
      brands: [],
      products: []
    },
    general: {
      menuItems: [],
      pricingTiers: [],
      teamMembers: [
        { name: "Alex Mercer", role: "General Director" }
      ],
      brands: [],
      products: []
    }
  };

  return details[matchedCat] || details.general;
}

