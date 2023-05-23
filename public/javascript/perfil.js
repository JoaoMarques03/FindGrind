function createCounter() {
  let count = 0;

  return {
    decreaseCount() {
      if (count > 0) {
        count--;
        updateCounter();
      }
    },
    increaseCount() {
      count++;
      updateCounter();
    },
    getCount() {
      return count;
    }
  };
}

function updateCounter() {
  const countElements = document.querySelectorAll('span[id^="count"]');
  countElements.forEach((element, index) => {
    element.textContent = counters[index].getCount().toString();
  });
}

const counters = [];
const decreaseButtons = document.querySelectorAll('button[id^="decrease"]');
const increaseButtons = document.querySelectorAll('button[id^="increase"]');

for (let i = 0; i < decreaseButtons.length; i++) {
  const counter = createCounter();
  counters.push(counter);

  decreaseButtons[i].addEventListener('click', counter.decreaseCount);
  increaseButtons[i].addEventListener('click', counter.increaseCount);
}

updateCounter();

const logoutButton = document.getElementById('logoutBtn');

console.log(logoutButton);
logoutButton.addEventListener('click', function () {
  console.log('Logout button clicked');
  fetch('http://localhost:3000/logout', {
    method: 'POST',
  })
    .then(response => {
      console.log('Response received');
      if (response.ok) {
        console.log('Logout successful!');
        sessionStorage.clear();
        window.location.href = 'index.html'; // Redirect to the index page after logout
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.log('Error:', error);
      alert('An error occurred during logout');
    });
});

const usernameElement = document.getElementById('username');
const genderElement = document.getElementById('gender');
const weightElement = document.getElementById('weight');
const heightElement = document.getElementById('height');
const ageElement = document.getElementById('age');

fetch('http://localhost:3000/perfil')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(userData => {
    // Update the table with the user data
    usernameElement.textContent = userData.username;
    genderElement.textContent = userData.gender;
    weightElement.textContent = userData.weight;
    heightElement.textContent = userData.height;
    ageElement.textContent = userData.age;
  })
  .catch(error => {
    console.log('Error:', error);
});
