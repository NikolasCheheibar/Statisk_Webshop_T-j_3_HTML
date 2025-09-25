/** @format */

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
const productid = 1528;
const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${productid}.webp`;

document.querySelector("#productContainer").innerHTML = `
  <article class="product sale">
    <img src="${imagePath}" alt="Black Fleece Jacket">
    <h3>Black Fleece Jacket</h3>
    <p class="price">1999 kr</p>
    <p class="old-price">3999 kr</p>
    <div class="discount-badge">-50%</div>
  </article>
`;
