import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tcdnzymmwogeypwkriag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZG56eW1td29nZXlwd2tyaWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1Mzk0NTcsImV4cCI6MjA1MTExNTQ1N30.rc4hFiSbLHEJrq1WjSiCPbgAnz_h1UGwNNfRh5LljUc';

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is required');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is required');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);