const serviceBtn = document.querySelectorAll('.main--section__button');
const serviceList = document.getElementById('service--list');
const totalPrice = document.getElementById('total--price');
const sendBtn = document.getElementById('send--button');

const services = [
  { name: 'Wash Car', price: 10 },
  { name: 'Mow Lawn', price: 20 },
  { name: 'Pull Weeds', price: 30 },
];

let currentServices = [];

function render() {
  serviceList.innerHTML = getListHtml();
  totalPrice.textContent = currentServices.length ? getTotalPrice() : '$0';
}

function removeItem(name) {
  let nameArray = currentServices.map((service) => service.name);
  currentServices.splice(nameArray.indexOf(name), 1);
  render();
}

function getListHtml() {
  return currentServices
    .map((service) => {
      return `
      <li class="service--item">
        <p>${service.name} 
          <span class="remove" onclick="removeItem('${service.name}')">
            Remove
          </span>
        </p>
        <div class="price">
          <span class="dollar-sign">$</span>
          ${service.price}
        </div>
      </li>
    `;
    })
    .join('');
}

function getTotalPrice() {
  return currentServices
    .map((service) => service.price)
    .reduce((a, b) => a + b);
}

function serviceButtonEventListener() {
  for (let i = 0; i < serviceBtn.length; i++) {
    serviceBtn[i].addEventListener('click', () => {
      if (!currentServices.includes(services[i])) {
        currentServices.push(services[i]);
        render();
      }
    });
  }
}

sendBtn.addEventListener('click', () => {
  currentServices = [];
  render();
});

render();
serviceButtonEventListener();
