import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Extracts business details from freeform text using Google Gemini AI.
 * Supports multilingual Hindi/Hinglish inputs, speech fillers, and incomplete inputs.
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
You are an expert multilingual business analyst and UI designer. Analyze the following text description of a business.
This text may be a transcript of natural voice inputs, which can include natural speech patterns, incomplete sentences, grammar errors, code-switching, and common filler words (such as "um", "uh", "actually", "basically", "like", "you know", "matlab", "basically speaking").

The text can be in English, Hindi, or Hinglish (Hindi written using the Latin/English script, e.g., "humara salon name hai Shiny Cut aur hum hair services de rhe hain, timings hai 9am se 9pm, phone no dial karo...").

Input business description:
"""
${text}
"""

Instructions for Extraction:
1. Extract the business details and compile them into a clean JSON object.
2. Translate any Hindi or Hinglish details into professional English (e.g. if the input is "dukan 9 baje khulti hai", map "hours" to "Mon - Sun: 9:00 AM - 9:00 PM").
3. Filter out voice filler words and ignore incomplete or trailing sentence fragments.
4. Infer missing fields: If phone, hours, address, or services are missing, you MUST generate reasonable, plausible mock values based on the business type and description. Do not leave them as empty strings.
5. The 'businessType' field MUST be classified into exactly one of these five styling categories:
   - 'eatery': For restaurants, cafes, bakeries, grocery stores, food trucks, bistros, and dining spots.
   - 'creative': For coaching centers, learning academies, design studios, tech agencies, software projects, and art setups.
   - 'wellness': For gyms, fitness centers, yoga spaces, hair/beauty salons, spas, medical clinics, and dental clinics.
   - 'professional': For repair shops, plumbers, electricians, mechanics, handymen, and legal/financial services.
   - 'general': For electronics stores, supermarkets, retail shops, clothing boutiques, and any unclassified stores.

Return ONLY a JSON object conforming to the following structure. Do not include markdown blocks or pre/post commentaries.

JSON Structure:
{
  "businessName": "Name of the business (infer a creative name if missing)",
  "description": "A polished, cohesive 2-3 sentence summary of the business in clean English, highlighting the core value proposition.",
  "services": ["A list of up to 4 key services or products, translated into English and capitalized"],
  "phone": "A clean phone number (format as (XXX) XXX-XXXX or Indian style +91 XXXXX XXXXX). Generate a plausible mock phone number if not found in text.",
  "hours": "The operating hours (e.g. 'Mon - Sat: 9:00 AM - 8:00 PM'). Generate reasonable hours if not found in text.",
  "address": "The physical address or location details. Generate a plausible street address if not found in text.",
  "businessType": "Must be exactly one of: 'eatery', 'creative', 'wellness', 'professional', or 'general'"
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
  try {
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();
    }

    const parsed = JSON.parse(cleanedText);

    return {
      businessName: parsed.businessName || "My Business",
      description: parsed.description || "A professional business providing high-quality services.",
      services: Array.isArray(parsed.services) ? parsed.services.filter(s => typeof s === 'string' && s.trim() !== '') : [],
      phone: parsed.phone || "(555) 123-4567",
      hours: parsed.hours || "Mon - Sun: 9:00 AM - 6:00 PM",
      address: parsed.address || "123 Main Street, Cityville",
      businessType: ["eatery", "creative", "wellness", "professional", "general"].includes(parsed.businessType)
        ? parsed.businessType
        : "general"
    };
  } catch (parseError) {
    console.error("JSON parsing failed for response:", responseText, parseError);
    throw new Error("Gemini returned invalid JSON.");
  }
}
