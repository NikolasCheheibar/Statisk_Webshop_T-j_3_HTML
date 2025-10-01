/** @format */

const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const productsContainer = document.getElementById("products");

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((res) => res.json())
  .then((products) => {
    if (!products || products.length === 0) {
      productsContainer.innerHTML = "<p>Ingen produkter i denne kategori</p>";
      return;
    }

    productsContainer.innerHTML = "";
    products.forEach((product) => {
      productsContainer.innerHTML += `
        <article class="card ${product.soldout ? "soldOut" : ""} ${product.discount ? "discount" : ""}">
          <h2>${product.brandname}</h2>
          <div class="imageContainer">
            <img src="https://kea-alt-del.dk/t7/images/webp/500/${product.id}.webp" 
                 alt="${product.productdisplayname}" 
                 onerror="this.src='https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp'"/>
            ${product.soldout ? "<p>SOLD OUT</p>" : ""}
          </div>
          <h3>
            <a href="product.html?id=${product.id}">${product.productdisplayname}</a>
          </h3>
          <p>${product.articletype}</p>
          <p class="price">DKK <span>${product.price}</span>,-</p>
          ${
            product.discount
              ? `
              <div class="discounted_container">
                <p>Nu DKK <span>${Math.round(product.price - (product.price * product.discount) / 100)}</span>,-</p>
                <p><span>${product.discount}</span> %</p>
              </div>
            `
              : ""
          }
        </article>`;
    });
  })
  .catch((err) => {
    productsContainer.innerHTML = "<p>Kunne ikke hente produkter</p>";
    console.error(err);
  });
