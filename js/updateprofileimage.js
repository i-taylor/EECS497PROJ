import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

try {
    console.log("hi")
    const { data: { user } } = await supabase.auth.getUser()
    const { picdata, error } = await supabase
        .from('Profile_Information')
        .select('ProfilePicLink')
        .eq('UID', user.id)
    if (error) {
        console.error('Error fetching profile data:', profileError.message);
        }
    console.log("hi2")
    
    

} catch (error) {
    console.error('Error updating profile picture:', error.message);
}
