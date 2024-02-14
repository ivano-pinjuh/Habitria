import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwvymqmmwmbncgoiupfx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dnltcW1td21ibmNnb2l1cGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5MTQzNTgsImV4cCI6MjAyMzQ5MDM1OH0.WjeOwjTpTp1IeVB1Ny_jsHTQ2XNS5Kofp6C6WzRVwx0"

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase