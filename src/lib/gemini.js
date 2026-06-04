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
6. Generate professional, copy-heavy marketing lines. Avoid generic placeholders. Make it sound publish-ready and local-business friendly.
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
  
  "heroHeadline": "A conversion-focused, professional, SEO-friendly hero headline (e.g., 'Artisanal Sourdough & Freshly Roasted Coffee in Seattle' or 'Express Screen Replacement & Device Repair in Austin')",
  "heroSubheadline": "A persuasive 1-2 sentence subheadline highlighting credentials, speed, or local quality (e.g., 'Serving locally roasted organic blends and home-baked pastries. Drop by for breakfast or order online today.')",
  
  "aboutText": "A professional about section description (2-3 sentences max) detailing the company mission, commitment to quality, and community roots.",
  "ctaText": "Short action-oriented button copy (e.g., 'Book Table Now', 'Schedule Repair', 'Start Training', 'Book Consultation', 'Shop Collection')",
  
  "whyChooseUs": [
    "Compelling reason 1 with active verb (e.g., 'Certified Technicians with 10+ years of repair experience')",
    "Compelling reason 2 (e.g., '100% Satisfaction Guarantee on all plumbing installations')",
    "Compelling reason 3 (e.g., 'Locally Sourced organic ingredients prepared fresh daily')"
  ],
  
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
      }
    };
  } catch (parseError) {
    console.error("JSON parsing failed for response, executing heuristic fallback:", responseText, parseError);
    
    // Heuristic regex fallback parsing to guarantee generation never crashes
    try {
      const heuristicParsed = parseBusinessText(text);
      const matchedCat = validCategories.includes(heuristicParsed.category) 
        ? heuristicParsed.category 
        : "general";

      return {
        businessName: heuristicParsed.businessName || "My Business",
        phone: heuristicParsed.phone || "(555) 123-4567",
        hours: heuristicParsed.hours || "Mon - Sun: 9:00 AM - 6:00 PM",
        address: heuristicParsed.address || "123 Main Street, Cityville",
        businessType: matchedCat,
        heroHeadline: `Premium ${heuristicParsed.businessName} Services`,
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
        }
      };
    } catch (fallbackError) {
      console.error("Heuristic fallback failed completely:", fallbackError);
      throw new Error("Unable to parse business description. Please write a cleaner description.");
    }
  }
}
