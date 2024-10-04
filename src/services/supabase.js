import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qjsgvzmsitsncjihncbn.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqc2d2em1zaXRzbmNqaWhuY2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczOTUwMTEsImV4cCI6MjA0Mjk3MTAxMX0.ItxgRZD2A2uAbdsGvlTK2w13gI9XNwQ1QDIZ1xNw_xI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
