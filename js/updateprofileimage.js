import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

try {
    // Get the current user
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    if (user) {
        const userId = user.id;
        console.log("hi")
        const { data,error } = await supabase.storage
            .from('Postimages')
            .select('*')
            .eq('owner', userId)
            .limit(1);
        console.log("hi2")
        if (objects && objects.length > 0) {
            // Get the public URL of the image
            const imageKey = objects[0].name;
            const { data: publicUrlData } = supabase.storage
                .from('Postimages')
                .getPublicUrl(imageKey);

            // Update the profile picture
            const profilePicture = document.getElementById('profilePicture');
            profilePicture.src = publicUrlData.publicUrl;

            console.log('Profile picture updated!');
        } else {
            console.log('No image found for the current user.');
        }
    } else {
        console.log('User not authenticated.');
    }
} catch (error) {
    console.error('Error updating profile picture:', error.message);
}
