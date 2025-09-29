/** @format */

const categories = [
  { id: "shoes", name: "Sko" },
  { id: "jackets", name: "Jakker" },
  { id: "accessories", name: "Accessories" },
];

const container = document.querySelector("#categories");

categories.forEach((cat) => {
  const link = document.createElement("a");
  link.href = `productlist.html?category=${cat.id}`;
  link.textContent = cat.name;
  link.style.display = "block";
  container.appendChild(link);
});
