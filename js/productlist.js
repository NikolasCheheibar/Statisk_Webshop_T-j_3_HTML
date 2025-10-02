/** @format */

// js/productlist.js
const productsContainer = document.getElementById("products");
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "";
document.getElementById("currentCategory").textContent = category;

const searchInput = document.getElementById("search");
const brandSelect = document.getElementById("brandSelect");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const inStockCheckbox = document.getElementById("inStock");
const sortSelect = document.getElementById("sort");
const clearBtn = document.getElementById("clearFilters");

let allProducts = [];
let brands = new Set();

function createCard(product) {
  const article = document.createElement("article");
  article.className = `card ${product.soldout ? "soldOut" : ""} ${product.discount ? "discount" : ""}`;

  const h2 = document.createElement("h2");
  h2.textContent = product.brandname;
  article.appendChild(h2);

  const imgWrap = document.createElement("div");
  imgWrap.className = "imageContainer";

  const img = document.createElement("img");
  img.src = `https://kea-alt-del.dk/t7/images/webp/500/${product.id}.webp`;
  img.alt = product.productdisplayname;
  img.onerror = () => (img.src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`);
  imgWrap.appendChild(img);

  if (product.soldout) {
    const soldP = document.createElement("p");
    soldP.textContent = "SOLD OUT";
    imgWrap.appendChild(soldP);
  }
  article.appendChild(imgWrap);

  const h3 = document.createElement("h3");
  const a = document.createElement("a");
  a.href = `product.html?id=${product.id}`;
  a.textContent = product.productdisplayname;
  h3.appendChild(a);
  article.appendChild(h3);

  const typeP = document.createElement("p");
  typeP.textContent = product.articletype;
  article.appendChild(typeP);

  const priceP = document.createElement("p");
  priceP.className = "price";
  priceP.innerHTML = `DKK <span>${product.price}</span>,-`;
  article.appendChild(priceP);

  if (product.discount) {
    const disc = document.createElement("div");
    disc.className = "discounted_container";
    disc.innerHTML = `
      <p>Nu DKK <span>${Math.round(product.price - (product.price * product.discount) / 100)}</span>,-</p>
      <p><span>${product.discount}</span>%</p>
    `;
    article.appendChild(disc);
  }

  return article;
}

function renderProducts(list) {
  productsContainer.innerHTML = ""; // kort loading fjernes
  if (!list || list.length === 0) {
    productsContainer.innerHTML = "<p>Ingen produkter i denne kategori</p>";
    return;
  }
  const fragment = document.createDocumentFragment();
  list.forEach((p) => fragment.appendChild(createCard(p)));
  productsContainer.appendChild(fragment);
}

function populateBrands() {
  brands.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    brandSelect.appendChild(opt);
  });
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const brand = brandSelect.value;
  const maxPrice = Number(priceRange.value);
  const onlyInStock = inStockCheckbox.checked;
  const sortBy = sortSelect.value;

  let filtered = allProducts.filter((p) => {
    if (brand && p.brandname !== brand) return false;
    if (onlyInStock && p.soldout) return false;
    if (p.price > maxPrice) return false;
    if (q && !(p.productdisplayname.toLowerCase().includes(q) || p.brandname.toLowerCase().includes(q) || (p.articletype || "").toLowerCase().includes(q))) return false;
    return true;
  });

  // sorter
  if (sortBy === "priceAsc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "priceDesc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "discount") filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));

  renderProducts(filtered);
}

function setupEvents() {
  [searchInput, brandSelect, priceRange, inStockCheckbox, sortSelect].forEach((el) => el.addEventListener("input", applyFilters));
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    brandSelect.value = "";
    priceRange.value = priceRange.max;
    priceValue.textContent = priceRange.value;
    inStockCheckbox.checked = false;
    sortSelect.value = "relevance";
    applyFilters();
  });

  priceRange.addEventListener("input", () => (priceValue.textContent = priceRange.value));
}

async function loadProducts() {
  try {
    productsContainer.innerHTML = "<p class='loading'>Henter produkter…</p>";
    const res = await fetch(`https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error("Netværksfejl");
    const products = await res.json();
    allProducts = products;

    // brands, pris max
    products.forEach((p) => brands.add(p.brandname));
    const maxPrice = Math.max(...products.map((p) => p.price), 0);
    priceRange.max = Math.ceil(maxPrice / 10) * 10;
    priceRange.value = priceRange.max;
    priceValue.textContent = priceRange.value;

    populateBrands();
    setupEvents();
    applyFilters();
  } catch (err) {
    console.error(err);
    productsContainer.innerHTML = "<p>Kunne ikke hente produkter</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
