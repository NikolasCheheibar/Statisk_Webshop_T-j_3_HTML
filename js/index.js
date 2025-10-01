/** @format */

const categoriesUl = document.getElementById("categories");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((cat) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = cat.category;
      a.href = `productlist.html?category=${encodeURIComponent(cat.category)}`;
      li.appendChild(a);
      categoriesUl.appendChild(li);
    });
  })
  .catch((err) => {
    categoriesUl.innerHTML = "<li>Kunne ikke hente kategorier</li>";
    console.error(err);
  });
