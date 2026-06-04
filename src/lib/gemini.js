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

  // Check if API Key is missing or empty
  if (!apiKey || apiKey.trim() === "" || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    const keyError = new Error("Gemini API key not found.");
    console.error("Gemini Verification Error:", keyError);
    throw keyError;
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
7. Classify the business into exactly one of these 9 'businessType' styling categories:
   - 'restaurant': For restaurants, cafes, bakeries, food trucks, bistros, coffee shops, and dining spots.
   - 'salon': For hair salons, beauty salons, nail spas, barbershops, wellness massage centers, and skin care clinics.
   - 'repair_shop': For mobile phone repair shops, laptop repair shops, appliance services, mechanics, and local handymen.
   - 'electronics_store': For gadget stores, home appliance retailers, mobile shops, computer sales, and electronics outlets.
   - 'gym': For fitness centers, gym clubs, crossfit boxes, yoga spaces, pilates studios, and personal training facilities.
   - 'clinic': For medical clinics, dental clinics, doctor consulting rooms, diagnostic centers, and health clinics.
   - 'coaching': For coaching centers, tuition classes, learning academies, language centers, software training hubs, and music academies.
   - 'retail_store': For clothing boutiques, shoe stores, grocery stores, supermarkets, flower shops, and general retail outlets.
   - 'general': For general businesses, local agencies, and any company types not covered by the categories above.

JSON Structure Requirements:
{
  "businessName": "Name of the business (infer a creative name based on the description if missing)",
  "phone": "A clean phone number (format as (XXX) XXX-XXXX or Indian style +91 XXXXX XXXXX). Generate a mock phone number if not found.",
  "hours": "The operating hours (e.g. 'Mon - Sat: 9:00 AM - 8:00 PM'). Generate reasonable hours if not found.",
  "address": "The physical address or location details. Generate a plausible street address if not found.",
  "businessType": "Must be exactly one of: 'restaurant', 'salon', 'repair_shop', 'electronics_store', 'gym', 'clinic', 'coaching', 'retail_store', or 'general'",
  
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
    "menuItems": [ // Used for 'restaurant'. Fill with 3 items if restaurant, otherwise return empty array.
      { "name": "Signature Dish/Beverage 1", "price": "$12.99", "desc": "Tasty descriptive details of ingredients and preparation." },
      { "name": "Signature Dish/Beverage 2", "price": "$9.49", "desc": "Tasty descriptive details of ingredients and preparation." },
      { "name": "Signature Dish/Beverage 3", "price": "$14.99", "desc": "Tasty descriptive details of ingredients and preparation." }
    ],
    "pricingTiers": [ // Used for 'gym', 'salon', 'repair_shop', 'coaching'. Fill with 2 plans if applicable, otherwise empty array.
      { "name": "Standard Package/Membership", "price": "$49/mo", "features": ["Feature details 1", "Feature details 2", "Feature details 3"] },
      { "name": "Premium Package/Membership", "price": "$89/mo", "features": ["All standard features", "Exclusive VIP support", "Priority scheduling"] }
    ],
    "teamMembers": [ // Used for 'restaurant' (chefs), 'salon' (stylists), 'gym' (trainers), 'clinic' (doctors), 'coaching' (teachers). Fill with 2 names if applicable, otherwise empty array.
      { "name": "Staff/Lead Name 1", "role": "Role (e.g., Head Chef, Master Barber, Senior Stylist, Lead Doctor, Physics Expert)" },
      { "name": "Staff/Lead Name 2", "role": "Role (e.g., Pastry Chef, Hair Specialist, Fitness Coach, Dentist, Coding Tutor)" }
    ],
    "brands": [ // Used for 'repair_shop', 'electronics_store', 'retail_store'. List 4 brands/logos (e.g., ["Apple", "Samsung", "Google", "Dell"]).
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
    const finalError = apiError || new Error("No response received from Gemini API.");
    console.error("Gemini API Error details:", finalError);
    throw new Error(`Gemini model is unavailable. Error details: ${finalError.message || finalError}`);
  }

  // JSON parsing safeguards and error messages
  const validCategories = [
    "restaurant",
    "salon",
    "repair_shop",
    "electronics_store",
    "gym",
    "clinic",
    "coaching",
    "retail_store",
    "general"
  ];

  try {
    let cleanedText = responseText.trim();
    
    // Find the first '{' and the last '}' to strip any pre/post conversation text or markdown backticks
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleanedText);

    return {
      businessName: parsed.businessName || "My Business",
      phone: parsed.phone || "(555) 123-4567",
      hours: parsed.hours || "Mon - Sun: 9:00 AM - 6:00 PM",
      address: parsed.address || "123 Main Street, Cityville",
      businessType: validCategories.includes(parsed.businessType)
        ? parsed.businessType
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
      variantsCopy: parsed.variantsCopy || makeDefaultVariantsCopy(parsed.businessName || "My Business", parsed.businessType || "general")
    };
  } catch (parseError) {
    console.error("JSON parsing failed for response, executing heuristic fallback:", responseText, parseError);
    
    // Heuristic regex fallback parsing to guarantee generation never crashes
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
        industryDetails: {
          menuItems: [],
          pricingTiers: [],
          teamMembers: [],
          brands: [],
          products: []
        },
        variantsCopy: makeDefaultVariantsCopy(bizName, matchedCat)
      };
    } catch (fallbackError) {
      console.error("Heuristic fallback failed completely:", fallbackError);
      throw new Error("Unable to parse business description. Please write a clearer description.");
    }
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

