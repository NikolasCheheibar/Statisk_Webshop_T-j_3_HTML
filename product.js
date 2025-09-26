/** @format */

// Hent id fra URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Hent specifikt produkt fra API
fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((res) => res.json())
  .then((product) => showProduct(product));

function showProduct(product) {
  document.querySelector(".product-images img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  document.querySelector(".product-images img").alt = product.productdisplayname;

  const info = document.querySelector(".product-info");
  info.innerHTML = `
    <h2>${product.productdisplayname}</h2>
    <p class="type">${product.articletype} | ${product.brandname}</p>
    <p class="price">DKK ${product.price},-</p>
    <p class="description">${product.description || "Ingen beskrivelse"}</p>
    ${product.soldout ? '<p class="udsolgt_tekst">Sold out</p>' : ""}
    ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ""}
    <div class="actions">
      <button class="btn buy"${product.soldout ? " disabled" : ""}>Læg i kurv</button>
      <a href="produktliste.html" class="btn back">← Tilbage</a>
    </div>
  `;
}
