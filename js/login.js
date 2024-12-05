import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


const supabase = createClient('https://hztcovrucgaxplyruazp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0')


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginform');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    //formdata
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    signInWithEmail(email,password)

  });
});

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  if (error) {
    console.error("Error fetching data:", error);
    alert('Invalid Credentials! Please Try Again');
    return null;
  }else{
    console.log('Signed in successfully:', data);
    window.location.href = "homepage.html";
  }
}