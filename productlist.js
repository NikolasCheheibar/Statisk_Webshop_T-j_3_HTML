/** @format */

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const products = [
  { id: 1, category: "shoes", name: "Sneakers" },
  { id: 2, category: "jackets", name: "Læderjakke" },
  { id: 3, category: "shoes", name: "Støvler" },
  { id: 4, category: "accessories", name: "Ur" },
];

const filtered = products.filter((p) => p.category === category);

const container = document.querySelector("#products");

if (filtered.length === 0) {
  container.textContent = "Ingen produkter i denne kategori.";
} else {
  filtered.forEach((prod) => {
    const link = document.createElement("a");
    link.href = `product.html?id=${prod.id}`;
    link.textContent = prod.name;
    link.style.display = "block";
    container.appendChild(link);
  });
}
