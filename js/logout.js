//This javascript handles the actions when the "logout" button is clicked


const logoutButton = document.getElementById('logoutButton');


logoutButton.addEventListener('click', () => {
  window.location.href = "login.html";
});
