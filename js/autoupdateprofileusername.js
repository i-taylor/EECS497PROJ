//This javascript autopopulates the username section to show username of current user
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

try {

    const { data: { user } } = await supabase.auth.getUser()

    const userId = user.id
    const { data, error } = await supabase
        .from('Profile_Information')
        .select('*')
        .eq('UID', user.id)

    const Username = document.getElementById('updatableusername');
    Username.textContent = data[0].Username;
    if (error) {
        console.error('Supabase query error:', error.message);
    }
    
} catch (error) {
    console.error('Error updating profile picture:', error.message);
}
