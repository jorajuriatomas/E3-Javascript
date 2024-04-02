const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },
  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },
  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },
  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },
  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const form = document.getElementById("pizzaForm");
const resultContainer = document.getElementById("resultContainer");

function findPizzaById(id) {
  return pizzas.find((pizza) => pizza.id === id);
}

function renderPizzaCard(pizza) {
  const cardHTML = `
    <div class="card">
      <h2>${pizza.nombre}</h2>
      <img src="${pizza.imagen}" alt="${pizza.nombre}">
      <p>Ingredientes: ${pizza.ingredientes.join(", ")}</p>
      <span class="price">$${pizza.precio}</span>
    </div>
  `;
  resultContainer.innerHTML = cardHTML;

  localStorage.setItem("lastPizza", JSON.stringify(pizza));
}

function renderError(message) {
  const errorHTML = `<p class="error">${message}</p>`;
  resultContainer.innerHTML = errorHTML;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const pizzaId = parseInt(document.getElementById("pizzaId").value);

  if (!isNaN(pizzaId)) {
    const pizza = findPizzaById(pizzaId);
    if (pizza) {
      renderPizzaCard(pizza);
    } else {
      renderError("No se encontró ninguna pizza con ese ID");
    }
  } else {
    renderError("Por favor ingrese un número válido");
  }
});

function initPage() {
  const lastPizzaData = localStorage.getItem("lastPizza");

  if (lastPizzaData) {
    const lastPizza = JSON.parse(lastPizzaData);
    renderPizzaCard(lastPizza);
  }
}

window.onload = initPage;
