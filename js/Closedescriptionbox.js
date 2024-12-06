//This javascript handles the actions when the "submitDescription" button is clicked
//Makes Input Text Box & Submit Button not displayed
//Makes Edit Profile Desc button & desription text visible
//Uploads input to profile table in database and pulls from database to populate the desc field.


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://hztcovrucgaxplyruazp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dGNvdnJ1Y2dheHBseXJ1YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTc0NTUsImV4cCI6MjA0ODkzMzQ1NX0.YUHo4a_g-IENFQIW3zQO4cHU_cAuSFJB-Bm0-ZXrgc0'
);

document.addEventListener("DOMContentLoaded", function() {
    const profileDescriptionButton = document.getElementById("profileDescription");
    const userInput = document.getElementById("userInput");
    const descriptionText = document.getElementById("descriptiontext");
    const descriptionsubmitbutton = document.getElementById("submitDescription");


    userInput.style.display = "none";
    console.log(descriptionText.style.display)
    document.getElementById("submitDescription").addEventListener("click", async(event) => {
        descriptionText.style.display = "block";
        userInput.style.display = "none";
        descriptionsubmitbutton.style.display = "none";
        profileDescriptionButton.style.display = "flex";
        const inputText = userInput.value;
        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase
            .from('Profile_Information')
            .update({ ProfileDesc: inputText })
            .eq('UID', user.id)
        if (error) {
            console.error('Error updating description:', error.message);
            alert('Failed to edit profile description!');
            return;
        }
        const { data, error1 } = await supabase
            .from('Profile_Information')
            .select('*')
            .eq('UID', user.id)
        descriptionText.textContent = data[0].ProfileDesc;
        if (error1) {
            console.error('Error retreiving Desc from database:', error.message);
            alert('Error retreiving Desc from database!');
            return;
        }

    });


  });