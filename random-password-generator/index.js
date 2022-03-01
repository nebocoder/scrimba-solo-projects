const generateBtn = document.getElementById('generate-btn');
const passwordResults = document.querySelectorAll('.results--result');

// Characters
const lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
const upperCase = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
const numbers = '0123456789'.split('');
const characters = '!@#$%^&*()_+|<>?'.split('');
const combinedArray = lowerCase.concat(upperCase, numbers, characters);

// Fischer-Yates shuffle
function generatePassword(array, length) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array.slice(0, length).join('');
}

generateBtn.addEventListener('click', () => {
  passwordResults.forEach((password) => {
    password.value = generatePassword(combinedArray, 15);
  });
});
