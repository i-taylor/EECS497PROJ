//This javascript automates the showing of the profile pic of current user
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

try {
    console.log("hi")
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user.id)
    const userId = user.id
    const { data, error } = await supabase
        .from('Profile_Information')
        .select('*')
        .eq('UID', user.id)
    console.log(data.length)
    console.log(data[0].ProfilePicLink)
    if((data.length != 0) && (data[0].ProfilePicLink != null)){
        const profilePic = document.getElementById('profilepic');
        profilePic.src = data[0].ProfilePicLink;
    }
    if (error) {
        console.error('Supabase query error:', error.message);
    }
    
} catch (error) {
    console.error('Error updating profile picture:', error.message);
}
