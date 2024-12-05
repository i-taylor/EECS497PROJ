import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

// Simulate a click on the file input when the "Upload Image" button is clicked
document.getElementById("uploadButton").addEventListener("click", () => {
  document.getElementById("imageUpload").click();
});

// Handle the file selection and upload
document.getElementById("imageUpload").addEventListener("change", async (event) => {
  const file = event.target.files[0];

  if (file) {
    // Show an alert with the selected file name

    const bucketName = 'Postimages'; // Replace with your actual bucket name
    const filePath = `uploads/${file.name}`; // Define the path where the file will be stored

    try {
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false, // Avoid overwriting existing files
        });

      if (error) {
        console.error('Error uploading file:', error.message);
        alert('Failed to upload image. Check the console for details.');
        return;
      }

      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (publicUrlData) {
        const publicUrl = publicUrlData.publicUrl;

        // Update the profile picture's `src` attribute to display the uploaded image
        const profilePic = document.getElementById('profilepic');
        profilePic.src = publicUrl;

      } else {
        alert('Could not retrieve public URL for the uploaded file.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred during the upload.');
    }
  }
});
