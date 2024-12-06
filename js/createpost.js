import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

document.addEventListener('DOMContentLoaded', () => {
  const createPostButton = document.getElementById('createpostbutton');
  const postForm = document.getElementById('popupForm');
  const displayedPosts = document.getElementById('profilepostcontainer');
  const submitButton = document.getElementById('submitpost');
  const caption = document.getElementById('caption');
  const postDataUpload = document.getElementById('posstdataUpload');

  createPostButton.addEventListener('click', () => {
    postForm.style.display = 'block';
  });

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const file = postDataUpload.files[0];
    const captionVal = caption.value;

    if (file) {
      const bucketName = 'Posts';
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
          const { data: { user } } = await supabase.auth.getUser();

          const { error } = await supabase
            .from('Posts')
            .insert({ UID: user.id, Content: publicUrl, Caption: captionVal });

          if (error) {
            console.error('Error inserting post:', error.message);
            alert('Failed to create post. Check the console for details.');
          } else {
            alert('Post created successfully!');
            postForm.style.display = 'none';
          }
        } else {
          alert('Could not retrieve public URL for the uploaded file.');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred during the upload.');
      }
    } else {
      alert('Please select a file to upload.');
    }
  });
});
