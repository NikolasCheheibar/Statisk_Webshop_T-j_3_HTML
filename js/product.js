const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then(res => res.json())
  .then(product => {
    document.getElementById("title").textContent = product.productdisplayname;

    const imgEl = document.getElementById("image");
    imgEl.src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
    imgEl.alt = product.productdisplayname;

    document.getElementById("description").textContent = product.description || "Ingen beskrivelse";
    document.getElementById("price").textContent = `Pris: ${product.price} DKK`;
  })
  .catch(err => console.error(err));
