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

  
  const submitButton = document.getElementById('submitBtn1');

submitButton.addEventListener('click', function() {
  // Ação a ser executada quando o botão "Submit" for clicado
  console.log('Formulário enviado!');
  // Outras instruções...
});
