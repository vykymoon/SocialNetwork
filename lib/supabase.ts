import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://szwsyjrydkxlrtsgpzsr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6d3N5anJ5ZGt4bHJ0c2dwenNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTg4OTQsImV4cCI6MjA3MzE5NDg5NH0.LFIxRN0t-wUJlQIGQfgCD1pZaqpebDHw4pIMlcbxYQ0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)