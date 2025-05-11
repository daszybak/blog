import { getSecret } from "astro:env/server";
import { createClient } from '@supabase/supabase-js';
import type { Database } from './schema.ts';

const supabaseUrl = getSecret('PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getSecret('PUBLIC_SUPABASE_ANON_KEY');

if (!supabaseUrl) {
    throw new Error("Supabase URL is undefined");
}

if (!supabaseAnonKey) {
    throw new Error("Supabase Anon Key is undefined");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
