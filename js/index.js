/** @format */

// js/index.js
const categoriesUl = document.getElementById("categories");

async function loadCategories() {
  try {
    const res = await fetch("https://kea-alt-del.dk/t7/api/categories");
    if (!res.ok) throw new Error("Netværksfejl");
    const data = await res.json();
    categoriesUl.innerHTML = "";
    data.forEach((cat) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = cat.category;
      a.href = `productlist.html?category=${encodeURIComponent(cat.category)}`;
      a.setAttribute("aria-label", `Se produkter i ${cat.category}`);
      li.appendChild(a);
      categoriesUl.appendChild(li);
    });
  } catch (err) {
    categoriesUl.innerHTML = "<li>Kunne ikke hente kategorier</li>";
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadCategories);
