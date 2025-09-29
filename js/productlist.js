const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const productsUl = document.getElementById("products");

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then(res => res.json())
  .then(products => {
    if (!products || products.length === 0) {
      productsUl.innerHTML = "<li>Ingen produkter i denne kategori</li>";
      return;
    }
    products.forEach(product => {
      const li = document.createElement("li");

      const a = document.createElement("a");
      a.textContent = product.productdisplayname;
      a.href = `product.html?id=${product.id}`;

      const img = document.createElement("img");
      img.src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
      img.alt = product.productdisplayname;
      img.style.maxWidth = "100px";

      li.appendChild(img);
      li.appendChild(a);
      productsUl.appendChild(li);
    });
  })
  .catch(err => {
    productsUl.innerHTML = "<li>Kunne ikke hente produkter</li>";
    console.error(err);
  });
