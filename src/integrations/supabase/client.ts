
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ejwuagkpnbyolamcnmto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqd3VhZ2twbmJ5b2xhbWNubXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDYzODUsImV4cCI6MjA1MjAyMjM4NX0.1jBugEBqgeGqcZGyGSAiLAIcvgyskltSuaZESx3HUBQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Function to test the Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Simple query to check if the connection is working
    const { data, error } = await supabase
      .from('participants')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    console.error('Supabase connection test failed with exception:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
