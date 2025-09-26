/** @format */

// Hent produkter fra API
fetch("https://kea-alt-del.dk/t7/api/products")
  .then((res) => res.json())
  .then((products) => showProducts(products));

function showProducts(products) {
  const listContainer = document.querySelector("#product-list");

  products.forEach((product) => {
    const link = document.createElement("a");
    link.href = "produkt.html?id=" + product.id;
    link.classList.add("product-link");

    const div = document.createElement("div");
    div.classList.add("product");
    if (product.soldout) div.classList.add("sold_out");

    div.innerHTML = `
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
      <h3>${product.productdisplayname}</h3>
      <p class="type">${product.articletype} | ${product.brandname}</p>
      <p class="price">DKK ${product.price},-</p>
      ${product.soldout ? '<span class="udsolgt_tekst">Sold out</span>' : ""}
      <span class="readmore">Læs mere</span>
      ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ""}
    `;

    link.appendChild(div);
    listContainer.appendChild(link);
  });
}
