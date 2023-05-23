document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loggedIn = sessionStorage.getItem('loggedIn');
  
    if (loggedIn === 'true') {
      loginButton.textContent = 'Profile';
      loginButton.href = 'perfil.html';
    }
  });
  