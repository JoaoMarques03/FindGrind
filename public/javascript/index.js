document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const loggedIn = sessionStorage.getItem('loggedIn');

  if (loggedIn === 'true') {
    loginButton.textContent = 'Profile';
    loginButton.href = 'perfil.html';
  } else {
    loginButton.textContent = 'Login';
    loginButton.href = 'login.html';
  }
});
