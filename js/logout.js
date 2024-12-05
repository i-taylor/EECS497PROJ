// Get the logout button element
const logoutButton = document.getElementById('logoutButton');

// Add click event listener to the logout button
logoutButton.addEventListener('click', () => {
  // Redirect to the login page
  window.location.href = "login.html";  // Replace with your actual login page URL
});
