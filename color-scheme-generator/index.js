const colorInput = document.getElementById('color--input');
const modeInput = document.getElementById('mode--input');
const button = document.getElementById('button');
const colors = document.querySelectorAll('.color--display');

generateColors();
button.addEventListener('click', generateColors);

async function generateColors() {
  const color = colorInput.value.slice(1);
  const mode = modeInput.value;

  const response = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`
  );
  const data = await response.json();

  for (let i = 0; i < colors.length; i++) {
    colors[i].style.backgroundColor = data.colors[i].hex.value;
    colors[i].innerHTML = `<p>${data.colors[i].hex.value}</p>`;
  }
}
