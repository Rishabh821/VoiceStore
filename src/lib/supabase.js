import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Saves a generated website configuration to the Supabase database.
 * @param {object} businessData - The structured business details.
 * @param {number} selectedVariant - The selected visual variant concept (1-5).
 * @returns {Promise<string>} The generated website uuid.
 */
export async function saveBusinessWebsite(businessData, selectedVariant) {
  if (!supabase) {
    throw new Error("Supabase client is not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
  }

  const payload = {
    business_name: businessData.businessName || 'My Business',
    business_type: businessData.category || businessData.businessType || 'general',
    phone: businessData.phone || '',
    hours: businessData.hours || '',
    address: businessData.address || '',
    business_data: businessData,
    selected_variant: Number(selectedVariant)
  };

  const { data, error } = await supabase
    .from('businesses')
    .insert([payload])
    .select('id')
    .single();

  if (error) {
    console.error("Error saving business website to Supabase:", error);
    throw new Error(`Failed to publish website: ${error.message || error}`);
  }

  return data.id;
}

/**
 * Loads a published website configuration from the Supabase database.
 * @param {string} id - The website uuid.
 * @returns {Promise<object>} The loaded row containing website info.
 */
export async function loadBusinessWebsite(id) {
  if (!supabase) {
    throw new Error("Supabase client is not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
  }

  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error loading business website from Supabase:", error);
    throw new Error(`Failed to load published website: ${error.message || error}`);
  }

  return data;
}
