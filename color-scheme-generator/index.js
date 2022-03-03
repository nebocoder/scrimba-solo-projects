const colorInput = document.getElementById('color--input');
const modeInput = document.getElementById('mode--input');
const button = document.getElementById('button');
const colors = document.querySelectorAll('.color--display');

for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', () => {
    let colorValue = document.getElementById(`color--value${i}`);
    colorValue.style.opacity = '0.5';
    navigator.clipboard.writeText(colorValue.textContent);
  });
}

generateColors();
button.addEventListener('click', generateColors);

async function generateColors() {
  const response = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${
      modeInput.value
    }`
  );
  const data = await response.json();

  for (let i = 0; i < colors.length; i++) {
    colors[i].style.backgroundColor = data.colors[i].hex.value;
    colors[i].innerHTML = `
      <p id="color--value${i}">${data.colors[i].hex.value}</p>
    `;
  }
}
