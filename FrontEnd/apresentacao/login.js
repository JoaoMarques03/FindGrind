const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', () => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  console.log('Username:', username);
console.log('Password:', password);

fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password })
})
.then((response) => {
  console.log('Response status:', response.status);
  console.log('Response body:', response.body);
  if (response.ok) {
    console.log('Login successful');
    window.location.pathname = "/index.html" // redirect user to dashboard
  } else {
    alert('Invalid username or password');
  }
})
.catch((error) => {
  console.error(error);
  alert('An error occurred while logging in');
});

  console.log('Request sent successfully');
});