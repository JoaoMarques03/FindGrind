window.onload = function onLoad() {
  var form = document.getElementById("form-login");
  console.log(form);

  form.onsubmit = async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      console.log('Response status:', response.status);
      console.log('Response body:', response.body);

      if (response.ok) {
        console.log('Login successful');
        window.location.href = "index.html"; // redirect user to dashboard
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in');
    }

    console.log('Request sent successfully');
  };

  // Check if the user is logged in
  if (document.cookie.includes('session')) {
    // User is logged in
    var loginButton = document.getElementById("login-button");
    loginButton.innerHTML = '<i class="fas fa-user"></i>'; // Replace with person icon or appropriate HTML for the icon
  }
};