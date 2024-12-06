//This javascript handles the upload of profile images when "upload image" is clicked

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);


document.getElementById("uploadButton").addEventListener("click", () => {
  document.getElementById("imageUpload").click();
});


document.getElementById("imageUpload").addEventListener("change", async (event) => {
  const file = event.target.files[0];

  if (file) {


    const bucketName = 'Postimages';
    const filePath = `uploads/${file.name}`; 

    try {

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading file:', error.message);
        alert('Failed to upload image. Check the console for details.');
        return;
      }


      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (publicUrlData) {
        const publicUrl = publicUrlData.publicUrl;

        const profilePic = document.getElementById('profilepic');
        profilePic.src = publicUrl;

        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase
          .from('Profile_Information')
          .update({ ProfilePicLink: publicUrl })
          .eq('UID', user.id)


      } else {
        alert('Could not retrieve public URL for the uploaded file.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred during the upload.');
    }
  }
});
