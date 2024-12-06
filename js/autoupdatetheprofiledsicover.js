//This javascript automates the showing of the profiledesc
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

try {
    const Profileimageone = document.getElementById("discoverprofilepic1");
    const Profileimagetwo = document.getElementById("discoverprofilepic2");
    const Profileimagethree = document.getElementById("discoverprofilepic3");
    const Profileimagefour = document.getElementById("discoverprofilepic4");
    const Profileimagefive = document.getElementById("discoverprofilepic5");
    const Usernameone = document.getElementById("username1");
    const Usernametwo = document.getElementById("username2");
    const Usernamethree = document.getElementById("username3");
    const Usernamefour = document.getElementById("username4");
    const Usernamefive = document.getElementById("username5");

    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
            .from('Profile_Information')
            .select('*')
    if (error) {
        console.error('Supabase query error:', error.message);
    }

    if(data[0].ProfilePicLink != null){
        Profileimageone.src = data[0].ProfilePicLink
    }

    Usernameone.textContent = data[0].Username
    if(data[1].ProfilePicLink != null){
        Profileimagetwo.src = data[1].ProfilePicLink
    }

    Usernametwo.textContent = data[1].Username
    if(data[2].ProfilePicLink != null){
        Profileimagethree.src = data[2].ProfilePicLink
    }

    Usernamethree.textContent = data[2].Username
    if(data[3].ProfilePicLink != null){
        Profileimagefour.src = data[3].ProfilePicLink
    }
 
    Usernamefour.textContent = data[3].Username
    if(data[4].ProfilePicLink != null){
        Profileimagefive.src = data[4].ProfilePicLink
    }
    Usernamefive.textContent = data[4].Username


} catch (error) {
    console.error('Error updating discovery profiles:', error.message);
}
