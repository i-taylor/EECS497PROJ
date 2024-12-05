import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://hztcovrucgaxplyruazp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0')

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerform');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const email = formData.get('email');
    const confirmEmail = formData.get('confirmEmail');

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (password.length < 7){
        alert('Password needs to be longer than 6 characters.');
      return;
    }

    if (email !== confirmEmail) {
      alert('Emails do not match.');
      return;
    }

    signUpNewUser(email,password);
  });
});


async function signUpNewUser(email,password,username) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'https://example.com/welcome',
        },
    })
    if (error) {
        console.error("Error fetching data:", error);
        return null;
    }else{
        console.log('Registered successfully:', data);
        alert('Registered successfully')
        const { error2 } = await supabase
          .from('Profile_Information')
          .insert({ UID: data.UID, Username: username, Email:email})
    }
}