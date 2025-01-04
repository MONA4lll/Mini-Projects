const button = document.getElementById('trackButton');
const clickCountDisplay = document.getElementById('clickCount');

let clickCount = 0;

button.addEventListener('click', () => {
  clickCount++; 
  clickCountDisplay.textContent = clickCount; 
  console.log(`Button clicked ${clickCount} times`); 
});
