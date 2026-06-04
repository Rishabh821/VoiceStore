/**
 * Heuristically parses a business description text into a structured object.
 * @param {string} text 
 * @returns {object}
 */
export function parseBusinessText(text) {
  if (!text || text.trim() === "") {
    return {
      businessName: "Cozy Cup Cafe",
      description: "A warm, inviting coffee house serving handcrafted espresso beverages, fresh organic pastries, and delicious breakfast options. Located in the heart of downtown, we provide a relaxing environment with free high-speed WiFi for work or catching up with friends.",
      services: ["Artisanal Espresso & Brews", "Fresh Organic Pastries", "Catering & Private Events", "Free High-Speed Wi-Fi"],
      phone: "(555) 234-5678",
      hours: "Mon - Sun: 7:00 AM - 7:00 PM",
      address: "456 Main Street, Suite A, Seattle, WA 98101",
      category: "eatery"
    };
  }

  // Helper arrays for keyword matching
  const categoryKeywords = {
    eatery: ["cafe", "coffee", "restaurant", "food", "bakery", "pizza", "diner", "bar", "kitchen", "brewery", "grill", "pub", "bistro", "sushi", "eats", "bakery", "pastries", "baking", "sweet", "dessert", "drink"],
    creative: ["agency", "design", "creative", "studio", "art", "photography", "marketing", "software", "portfolio", "development", "web", "branding", "architect", "digital", "video", "app", "code"],
    wellness: ["gym", "fitness", "yoga", "spa", "salon", "barber", "hair", "wellness", "massage", "training", "workout", "therapy", "dental", "clinic", "health", "teeth", "skin", "nail", "beauty", "cosmetic"],
    professional: ["consulting", "law", "plumbing", "clean", "lawyer", "accounting", "financial", "advisory", "repair", "service", "electrician", "contractor", "insurance", "hvac", "roofing", "painter", "mechanic", "pest"]
  };

  // Determine category
  let category = "general";
  const lowercaseText = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      category = cat;
      break;
    }
  }

  // Extract Phone Number
  // Matches: 123-456-7890, (123) 456-7890, 123 456 7890, +1 123 456 7890
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0].trim() : "";

  // Extract Hours
  // Matches "Open daily...", "Mon-Fri 9am-5pm", "9:00 AM - 6:00 PM", "24/7", etc.
  const hoursPatterns = [
    /(?:open\s+)?(?:daily|mon-fri|mon\s*-\s*sat|weekdays|weekends|everyday)(?:\s+from)?\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?\s*(?:to|-)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)/i,
    /\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)\s*(?:to|-)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)/i,
    /open\s+24\s*(?:\/\s*7|hours|daily)/i,
    /hours:\s*([^\n.]+)/i
  ];
  let hours = "";
  for (const pattern of hoursPatterns) {
    const match = text.match(pattern);
    if (match) {
      hours = match[0].replace(/hours:\s*/i, "").trim();
      break;
    }
  }
  if (!hours) hours = "Mon - Sun: 9:00 AM - 6:00 PM"; // default

  // Extract Address
  // Look for street suffixes
  const addressRegex = /\d+(?:-\d+)?\s+[A-Za-z0-9\s,.-]+?\s*(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Court|Ct|Plaza|Pl|Highway|Hwy|Loop|Terrace|Ter|Circle|Cir)\b/i;
  const addressMatch = text.match(addressRegex);
  let address = addressMatch ? addressMatch[0].trim() : "";
  if (!address) {
    // Check if there is a city and state zip code fallback, e.g. "Seattle, WA 98101"
    const zipRegex = /[A-Z][A-Za-z\s]+,\s*[A-Z]{2}\s+\d{5}/;
    const zipMatch = text.match(zipRegex);
    if (zipMatch) address = zipMatch[0].trim();
  }
  if (!address) address = "123 Main Street, Cityville, NY 10001"; // default

  // Extract Business Name
  // Heuristic: Check sentences like "Welcome to [Name]", "This is [Name]", "At [Name]", or capitalize words at the very start
  let businessName = "";
  const namePatterns = [
    /(?:welcome\s+to|this\s+is|visit|introducing)\s+([A-Z][A-Za-z0-9\s'&]{2,30}?)(?:\s+is|\s+at|\s+in|\s+we|\.|\b)/i,
    /([A-Z][A-Za-z0-9\s'&]{2,30}?)\s+is\s+a\s+(?:family|locally|new|modern|premier|cozy|boutique)/i,
    /^[A-Z][A-Za-z0-9\s'&]{2,30}?(?=\s+is|\s+offers|\s+serves|\b)/
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      businessName = match[1].trim();
      break;
    }
  }

  // Fallback: If no match, take the first 3 capitalized words or the first 3 words
  if (!businessName) {
    const sentences = text.split(/[.!?]+/);
    if (sentences.length > 0 && sentences[0].trim().length > 0) {
      const words = sentences[0].trim().split(/\s+/);
      // Try to find consecutive capitalized words
      const capitalizedWords = [];
      for (const w of words) {
        if (/^[A-Z]/.test(w) && !/^(A|An|The|Our|We|This|Is|Welcome|Visit|Here|At|In|On)$/i.test(w)) {
          capitalizedWords.push(w.replace(/[^A-Za-z0-9]/g, ''));
        } else if (capitalizedWords.length > 0) {
          break;
        }
      }
      if (capitalizedWords.length >= 2) {
        businessName = capitalizedWords.join(" ");
      } else {
        // Just take first 3 words
        businessName = words.slice(0, 3).join(" ").replace(/[^A-Za-z0-9\s]/g, '');
      }
    }
  }
  
  // Double-check if business name is valid
  if (!businessName || businessName.trim().length < 3) {
    // Try to guess from text
    if (category === "eatery") businessName = "Bistro & Cafe";
    else if (category === "creative") businessName = "Pixel Studio";
    else if (category === "wellness") businessName = "Vibe Fitness";
    else if (category === "professional") businessName = "Apex Services";
    else businessName = "Enterprise Retail";
  }

  // Extract Services
  const services = [];
  
  // Check bullet lines
  const lines = text.split("\n");
  for (const line of lines) {
    const cleanLine = line.trim();
    if (/^[-*•+]\s+/.test(cleanLine)) {
      const svc = cleanLine.replace(/^[-*•+]\s+/, "").trim();
      if (svc.length > 3 && svc.length < 50) {
        services.push(svc);
      }
    }
  }

  if (services.length === 0) {
    // Search for lists after introduction keywords
    const serviceIntroductions = /(?:we\s+offer|services\s+include|specialties\s+include|specialize\s+in|including|our\s+services|services\s*:)\s*([^.!\n]+)/i;
    const introMatch = text.match(serviceIntroductions);
    if (introMatch && introMatch[1]) {
      const items = introMatch[1].split(/,|\band\b|;/);
      for (let item of items) {
        item = item.trim().replace(/^to\s+/i, "").replace(/[^A-Za-z0-9\s-]/g, "").trim();
        if (item.length > 3 && item.length < 40 && services.length < 5) {
          // Capitalize first letter
          services.push(item.charAt(0).toUpperCase() + item.slice(1));
        }
      }
    }
  }

  // Fallback services based on category if we couldn't parse enough
  if (services.length < 2) {
    const defaultServices = {
      eatery: ["Gourmet Kitchen", "Specialty Beverage Crafting", "Express Catering", "Locally Sourced Ingredients"],
      creative: ["Brand Identity Design", "Custom Web & App Dev", "Social Media Marketing", "Motion Graphics & UI"],
      wellness: ["1-on-1 Personal Coaching", "Yoga & Wellness Classes", "Deep Tissue Therapy", "Nutrition Planning"],
      professional: ["Management Consultation", "Financial Planning & Analysis", "Legal Representation", "IT Infrastructure Support"],
      general: ["Premium Product Selection", "Fast Global Shipping", "24/7 Customer Support", "Hassle-Free Returns"]
    };
    const fillSvcs = defaultServices[category] || defaultServices.general;
    services.push(...fillSvcs.slice(0, 4 - services.length));
  }

  return {
    businessName,
    description: text.trim(),
    services: services.slice(0, 5), // max 5 services
    phone: phone || "(555) 123-4567",
    hours,
    address,
    category
  };
}
