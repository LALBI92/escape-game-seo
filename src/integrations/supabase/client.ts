
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ejwuagkpnbyolamcnmto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqd3VhZ2twbmJ5b2xhbWNubXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDYzODUsImV4cCI6MjA1MjAyMjM4NX0.1jBugEBqgeGqcZGyGSAiLAIcvgyskltSuaZESx3HUBQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      fetch: (...args) => {
        // Add logging for troubleshooting connection issues
        console.log('Supabase fetch request:', args[0]);
        return fetch(...args);
      },
    },
  }
);

// Helper function to test connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('participants').select('count()', { count: 'exact' });
    if (error) throw error;
    console.log('Supabase connection successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return { success: false, error };
  }
};
