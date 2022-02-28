const mainNumber = document.getElementById('main--number');
const mainInput = document.getElementById('main--input');
const resultLength = document.getElementById('results--length');
const resultVolume = document.getElementById('results--volume');
const resultMass = document.getElementById('results--mass');

const startingNumber = 10;

mainInput.addEventListener('input', () => {
  if (mainInput.value) {
    render(mainInput.value);
  } else {
    render(0);
  }
});

function getLength(input) {
  return `
    ${input} meters = ${(input * 3.2808398950131).toFixed(3)} feet |
    ${input} feet = ${(input / 3.2808398950131).toFixed(3)} meters`;
}

function getVolume(input) {
  return `
    ${input} liters = ${(input * 0.264172).toFixed(3)} gallons |
    ${input} gallons = ${(input / 0.264172).toFixed(3)} liters`;
}

function getMass(input) {
  return `
    ${input} kilos = ${(input * 2.20462262185).toFixed(3)} pounds |
    ${input} pounds = ${(input / 2.20462262185).toFixed(3)} kilos`;
}

function render(input) {
  mainNumber.textContent = input;
  resultLength.textContent = getLength(input);
  resultVolume.textContent = getVolume(input);
  resultMass.textContent = getMass(input);
}

render(startingNumber);
