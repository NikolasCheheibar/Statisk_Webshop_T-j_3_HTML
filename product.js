/** @format */

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const products = [
  { id: 1, category: "shoes", name: "Sneakers", description: "Lækre sneakers til hverdagsbrug." },
  { id: 2, category: "jackets", name: "Læderjakke", description: "Stilet sort læderjakke." },
  { id: 3, category: "shoes", name: "Støvler", description: "Varme vinterstøvler." },
  { id: 4, category: "accessories", name: "Ur", description: "Elegant ur i stål." },
];

const product = products.find((p) => p.id === id);

if (product) {
  document.querySelector("#product-name").textContent = product.name;
  document.querySelector("#product-description").textContent = product.description;
} else {
  document.querySelector("#product-name").textContent = "Produkt ikke fundet";
  document.querySelector("#product-description").textContent = "";
}
