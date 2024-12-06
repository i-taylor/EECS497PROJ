//This javascript handles the actions when the "Edit Profile Description" button is clicked
//Makes Input Text Box & Submit Button not visible
//Makes Edit Profile Desc button & desription text not visible

document.addEventListener("DOMContentLoaded", function() {
    const profileDescriptionButton = document.getElementById("profileDescription");
    const userInput = document.getElementById("userInput");
    const descriptionText = document.getElementById("descriptiontext");
    const descriptionsubmitbutton = document.getElementById("submitDescription");


    userInput.style.display = "none";
    console.log(descriptionText.style.display)
    profileDescriptionButton.addEventListener("click", () => {
      descriptionText.style.display = "none";
      userInput.style.display = "block";
      descriptionsubmitbutton.style.display = "block";
      profileDescriptionButton.style.display = "none";
    });

  });