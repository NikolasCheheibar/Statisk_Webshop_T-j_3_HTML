/** @format */

<<<<<<< HEAD
// Hent id fra URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const info = document.getElementById("product-info");
const img = document.getElementById("product-img");

if (!id) {
  info.innerHTML = "<p>Produkt ikke fundet.</p>";
} else {
  fetch("https://kea-alt-del.dk/t7/api/products/" + id)
    .then((res) => res.json())
    .then((product) => showProduct(product))
    .catch(() => {
      info.innerHTML = "<p>Fejl ved indlæsning af produkt.</p>";
    });
}

function showProduct(product) {
  img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  img.alt = product.productdisplayname;

  info.innerHTML = `
    <h2>${product.productdisplayname}</h2>
    <p class="type">${product.articletype} | ${product.brandname}</p>
    <p class="price">DKK ${product.price},-</p>
    <p class="description">${product.description || "Ingen beskrivelse"}</p>
    ${product.soldout ? '<p class="udsolgt_tekst">Udsolgt</p>' : ""}
    ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ""}
    <div class="actions">
      <button class="btn buy" ${product.soldout ? "disabled" : ""}>Læg i kurv</button>
      <a href="produktliste.html" class="btn back">← Tilbage</a>
    </div>
  `;
}
=======
const id = 1538;
const productUrl = `https://kea-alt-del.dk/t7/api/products/${id}`;

console.log("min url", productUrl);
getData();

function getData() {
  console.log("getData");
  fetch(productUrl)
    .then((res) => res.json())
    .then((data) => show(data))
    .catch((err) => console.error("Fejl ved fetch:", err));
}

function show(data2) {
  console.log("show....", data2);

  document.querySelector("#productContainer").innerHTML = `
    <h1>${data2.productdisplayname}</h1>
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="${data2.productdisplayname}"/>
    <p>Brand: ${data2.brandname}</p>
    <p>Pris: ${data2.price} kr</p>
  `;
}

// Eksempel på at bruge summesumme
function summesumme(a, b) {
  return a + b;
}

console.log(summesumme("Peter ", "Jørgensen"));
console.log(summesumme(10, 20));
>>>>>>> origin/main
