/** @format */

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    document.getElementById("title").textContent = product.productdisplayname;

    const imgEl = document.getElementById("image");
    imgEl.src = `https://kea-alt-del.dk/t7/images/webp/500/${product.id}.webp`;
    imgEl.alt = product.productdisplayname;
    imgEl.onerror = () => {
      imgEl.src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
    };

    document.getElementById("description").textContent = product.description || "Ingen beskrivelse";

    const priceEl = document.getElementById("price");
    priceEl.textContent = `Pris: ${product.price} DKK`;

    const soldoutEl = document.getElementById("soldout");
    if (product.soldout) {
      soldoutEl.textContent = "SOLD OUT";
    }

    if (product.discount) {
      priceEl.innerHTML = `<s>${product.price} DKK</s>`;
      document.getElementById("discounted_container").innerHTML = `
        <p>Nu DKK <span>${Math.round(product.price - (product.price * product.discount) / 100)}</span>,-</p>
        <p><span>${product.discount}</span>%</p>
      `;
    }
  })
  .catch((err) => console.error(err));
