const config = {
  whatsappNumber: (window.MAMA_FRESH_CONFIG && window.MAMA_FRESH_CONFIG.whatsappNumber) || "254792705921",
  sharedStorageKey: "mama-fresh-state-v1",
  pageStoragePrefix: "mama-fresh-page-state-v1:",
};

const state = {
  packages: [],
  products: [],
  collections: [],
  testimonials: [],
  mixes: [],
  cart: [],
  searchTerm: "",
  activeCategory: "All",
  activeCollection: "all",
  activePackageId: null,
  selectedPackageTierById: {},
  customerDrafts: {
    package: { name: "", phone: "", location: "", zone: "Chuka Local" },
    custom: { name: "", phone: "", location: "", zone: "Chuka Local", notes: "" },
  },
};

const categoryPhotoUrls = {
  Fruit: "https://images.unsplash.com/photo-1743844915173-77338dfce094?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
  Vegetables: "https://images.unsplash.com/photo-1741515043161-e97d05e5cfcc?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
  Greens: "https://images.unsplash.com/photo-1768700469272-1065ada09ba8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
  Herbs: "https://images.unsplash.com/photo-1751777814352-f72726451024?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
  Pantry: "https://images.unsplash.com/photo-1752908922387-9cd70ee6b5eb?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
  Staples: "https://images.unsplash.com/photo-1723879683304-599f00775e7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
};

const packagePhotoUrls = {
  nyumbani: "https://images.unsplash.com/photo-1768734831381-39336657aae9?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
  sheree: "https://images.unsplash.com/photo-1771659753573-e8498a262168?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
  pamoja: "https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
};

const productPlaceholderThemes = {
  apples: { start: "#e74646", end: "#ffcab8", accent: "#7d1010" },
  bananas: { start: "#f4d03f", end: "#fff3a3", accent: "#8d6a00" },
  beetroot: { start: "#9b2242", end: "#f0b0c1", accent: "#5b1230" },
  beans: { start: "#8a5a3c", end: "#e4c9b2", accent: "#52301c" },
  cabbage: { start: "#7fbf5b", end: "#dff3cc", accent: "#3a6a26" },
  carrots: { start: "#f28c28", end: "#ffd4a6", accent: "#9a4f00" },
  celery: { start: "#76b852", end: "#d8f5c7", accent: "#355f21" },
  cilantro: { start: "#2f8f46", end: "#ccefd4", accent: "#18552a" },
  "cooking-oil": { start: "#f0c24b", end: "#ffe9a6", accent: "#8d6300" },
  cucumber: { start: "#4ca45d", end: "#d2f0d4", accent: "#20572c" },
  garlic: { start: "#efe6d6", end: "#fffaf1", accent: "#8a7660" },
  ginger: { start: "#c98b52", end: "#f3d5b2", accent: "#7c4a1f" },
  grapes: { start: "#7a3fb2", end: "#e3cdf8", accent: "#4b2472" },
  kale: { start: "#2e7d32", end: "#cdeccd", accent: "#17471a" },
  lemon: { start: "#f7dc4b", end: "#fff7b8", accent: "#8c7700" },
  "maize-flour": { start: "#efe7bb", end: "#fff9df", accent: "#88712e" },
  mangoes: { start: "#f59f3a", end: "#ffd9a3", accent: "#8a4d00" },
  onions: { start: "#b86aa5", end: "#efd0e7", accent: "#6b2f5c" },
  oranges: { start: "#f97316", end: "#ffd3ac", accent: "#8a3f00" },
  pears: { start: "#9fc54d", end: "#e4f4b8", accent: "#55731b" },
  pineapple: { start: "#d8b022", end: "#f9e690", accent: "#6f5600" },
  pomegranate: { start: "#b11226", end: "#f3b9c2", accent: "#6b0715" },
  potatoes: { start: "#b88a5a", end: "#e9d0b4", accent: "#6b4725" },
  rice: { start: "#f7f1de", end: "#fffdf6", accent: "#92866e" },
  spinach: { start: "#257a3e", end: "#c9edd3", accent: "#124322" },
  strawberries: { start: "#ef476f", end: "#ffc1d0", accent: "#8d1734" },
  sukuma: { start: "#3d8b3d", end: "#d4efd4", accent: "#205120" },
  tomatoes: { start: "#d63c2f", end: "#ffb8ad", accent: "#7c180f" },
  watermelon: { start: "#f15b6c", end: "#ffc8d0", accent: "#8a2130" },
};

const elements = {
  packageGrid: document.getElementById("package-grid"),
  packageNotes: document.getElementById("package-notes"),
  productGrid: document.getElementById("product-grid"),
  cartItems: document.getElementById("cart-items"),
  cartSummary: document.getElementById("cart-summary"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  checkoutButton: document.getElementById("checkout-button"),
  stickyCart: document.getElementById("sticky-cart"),
  stickyCartCount: document.getElementById("sticky-cart-count"),
  packageModal: document.getElementById("package-modal"),
  packageDetailsModal: document.getElementById("package-details-modal"),
  customModal: document.getElementById("custom-modal"),
  packageSelectedCopy: document.getElementById("package-selected-copy"),
  packageTierSelect: document.getElementById("package-tier"),
  packageName: document.getElementById("package-name"),
  packageForm: document.getElementById("package-form"),
  packageError: document.getElementById("package-error"),
  packageDetailsCopy: document.getElementById("package-details-copy"),
  packageDetailsItems: document.getElementById("package-details-items"),
  packageDetailsUseCases: document.getElementById("package-details-use-cases"),
  packageDetailsPricing: document.getElementById("package-details-pricing"),
  packageDetailsOrderButton: document.getElementById("package-details-order-button"),
  customForm: document.getElementById("custom-form"),
  customError: document.getElementById("custom-error"),
  checkoutPreview: document.getElementById("checkout-preview"),
  productSearch: document.getElementById("product-search"),
  searchButton: document.getElementById("search-button"),
  filterBar: document.getElementById("filter-bar"),
  collectionGrid: document.getElementById("collection-grid"),
  collectionFeedback: document.getElementById("collection-feedback"),
  testimonialGrid: document.getElementById("testimonial-grid"),
  mixesGrid: document.getElementById("mixes-grid"),
};

function formatCurrency(value) {
  return `KES ${value.toLocaleString()}`;
}

function slugToGradient(seed) {
  const gradients = [
    "linear-gradient(135deg, #ffe1cd, #fff4d4)",
    "linear-gradient(135deg, #d9f2d8, #f8f6ce)",
    "linear-gradient(135deg, #ffe0e5, #ffeac7)",
    "linear-gradient(135deg, #d7ecff, #eef4d9)",
  ];
  const total = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return gradients[total % gradients.length];
}

function escapeSvgText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createProductPlaceholder(product) {
  const theme = productPlaceholderThemes[product.id] || { start: "#6ba36b", end: "#d8ecd3", accent: "#214c21" };
  const label = escapeSvgText((product.imageLabel || product.name).toUpperCase());
  const category = escapeSvgText(product.category.toUpperCase());
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="${escapeSvgText(product.name)}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${theme.start}" />
          <stop offset="100%" stop-color="${theme.end}" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#g)" />
      <circle cx="520" cy="88" r="88" fill="rgba(255,255,255,0.18)" />
      <circle cx="108" cy="378" r="132" fill="rgba(255,255,255,0.14)" />
      <rect x="42" y="44" rx="18" ry="18" width="180" height="42" fill="rgba(255,255,255,0.24)" />
      <text x="62" y="72" fill="${theme.accent}" font-size="22" font-family="Arial, sans-serif" font-weight="700">${category}</text>
      <text x="56" y="250" fill="#ffffff" font-size="68" font-family="Arial, sans-serif" font-weight="800">${label}</text>
      <text x="56" y="302" fill="rgba(255,255,255,0.86)" font-size="28" font-family="Arial, sans-serif">Mama Fresh product</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getPageKey() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function getPageStorageKey() {
  return `${config.pageStoragePrefix}${getPageKey()}`;
}

function saveState() {
  const sharedPayload = {
    cart: state.cart,
    selectedPackageTierById: state.selectedPackageTierById,
    customerDrafts: state.customerDrafts,
  };
  const pagePayload = {
    searchTerm: state.searchTerm,
    activeCategory: state.activeCategory,
    activeCollection: state.activeCollection,
  };

  localStorage.setItem(config.sharedStorageKey, JSON.stringify(sharedPayload));
  localStorage.setItem(getPageStorageKey(), JSON.stringify(pagePayload));
}

function loadSavedState() {
  try {
    const sharedRaw = localStorage.getItem(config.sharedStorageKey);
    if (sharedRaw) {
      const parsedShared = JSON.parse(sharedRaw);
      state.cart = parsedShared.cart || [];
      state.selectedPackageTierById = parsedShared.selectedPackageTierById || {};
      state.customerDrafts = {
        package: { ...state.customerDrafts.package, ...(parsedShared.customerDrafts && parsedShared.customerDrafts.package) },
        custom: { ...state.customerDrafts.custom, ...(parsedShared.customerDrafts && parsedShared.customerDrafts.custom) },
      };
    }

    const pageRaw = localStorage.getItem(getPageStorageKey());
    if (pageRaw) {
      const parsedPage = JSON.parse(pageRaw);
      state.searchTerm = parsedPage.searchTerm || "";
      state.activeCategory = parsedPage.activeCategory || "All";
      state.activeCollection = parsedPage.activeCollection || "all";
    }
  } catch (error) {
    console.error("Failed to load saved state", error);
  }
}

async function loadData() {
  const [packages, products, collections, testimonials, mixes] = await Promise.all([
    fetch("data/packages.json").then((response) => response.json()),
    fetch("data/products.json").then((response) => response.json()),
    fetch("data/collections.json").then((response) => response.json()),
    fetch("data/testimonials.json").then((response) => response.json()),
    fetch("data/mixes.json").then((response) => response.json()),
  ]);

  state.packages = packages;
  state.products = products;
  state.collections = collections;
  state.testimonials = testimonials;
  state.mixes = mixes;
}

function getProduct(productId) {
  return state.products.find((product) => product.id === productId);
}

function getPackage(packageId) {
  return state.packages.find((entry) => entry.id === packageId);
}

function getCategories() {
  return ["All", ...new Set(state.products.map((product) => product.category))];
}

function getSelectedTier(packageItem) {
  const selectedLabel = state.selectedPackageTierById[packageItem.id];
  return packageItem.pricing.find((tier) => tier.label === selectedLabel) || packageItem.pricing[0] || null;
}

function getPackageImageUrl(packageItem) {
  return packageItem.imageUrl || packagePhotoUrls[packageItem.id] || packagePhotoUrls.nyumbani;
}

function getProductImageUrl(product) {
  if (product.imageUrl && !product.imageUrl.includes("loremflickr.com")) {
    return product.imageUrl;
  }
  return createProductPlaceholder(product);
}

function renderPackages() {
  elements.packageGrid.innerHTML = state.packages
    .map((pkg) => {
      const tier = getSelectedTier(pkg);
      return `
        <article class="package-card">
          <div class="package-image">
            <img
              class="package-photo"
              src="${getPackageImageUrl(pkg)}"
              alt="${pkg.name} package"
              loading="lazy"
            >
          </div>
          <span class="package-badge">${pkg.badge}</span>
          <div>
            <h3>${pkg.name}</h3>
            <p class="package-copy">${pkg.description}</p>
          </div>
          <div class="package-items">
            ${pkg.highlights.map((item) => `<span>${item}</span>`).join("")}
          </div>
          <div class="package-footer">
            <div>
              <div class="package-speed">${pkg.speed}</div>
              ${tier ? `<div class="package-tier-copy">${tier.label} · ${formatCurrency(tier.price)}</div>` : ""}
            </div>
            <div class="package-actions">
              <button class="details-button" type="button" data-package-details-id="${pkg.id}">What's Inside</button>
              <button class="package-cta" type="button" data-package-id="${pkg.id}">Order Package</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPackageNotes() {
  elements.packageNotes.innerHTML = `
    <article class="note-card">
      <h3>Delivery coverage</h3>
      <ul>
        <li>Chuka local delivery</li>
        <li>Nairobi parcel service</li>
      </ul>
    </article>
    <article class="note-card">
      <h3>Why packages work</h3>
      <ul>
        <li>Fast ordering with minimal checkout</li>
        <li>Clear package use cases before selection</li>
        <li>Easy to extend later with package customization</li>
      </ul>
    </article>
    <article class="note-card">
      <h3>Flexible next steps</h3>
      <ul>
        <li>Great base for saved frequent orders</li>
        <li>Ready for backend storage later</li>
        <li>Easy to connect to vendor assignment logic later</li>
      </ul>
    </article>
  `;
}

function getFilteredProducts() {
  const searchTerm = state.searchTerm.trim().toLowerCase();
  const collection = state.collections.find((entry) => entry.id === state.activeCollection);
  return state.products.filter((product) => {
    if (state.activeCategory !== "All" && product.category !== state.activeCategory) {
      return false;
    }
    if (collection && !collection.productIds.includes(product.id)) {
      return false;
    }
    if (!searchTerm) {
      return true;
    }
    return [product.name, product.category, product.detail, product.unit]
      .some((value) => value.toLowerCase().includes(searchTerm));
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  if (!filteredProducts.length) {
    elements.productGrid.innerHTML = `
      <div class="empty-state full-width">
        <strong>No matching products.</strong>
        <p>Try another search or clear your current filters.</p>
      </div>
    `;
    return;
  }

  elements.productGrid.innerHTML = filteredProducts
    .map((product) => `
      <article class="product-card">
        <div class="product-image">
          <img
            class="product-photo"
            src="${getProductImageUrl(product)}"
            alt="${product.name}"
            loading="lazy"
          >
        </div>
        <span class="product-badge">${product.category}</span>
        <div>
          <h3>${product.name}</h3>
          <p class="product-copy">${product.detail}</p>
        </div>
        <div class="product-meta">
          <span>${product.unit}</span>
          <span>${formatCurrency(product.price)} / ${product.unit === "kg" ? "kg" : product.unit.replace(/s$/, "")}</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <button class="add-button" type="button" data-product-id="${product.id}">Add</button>
        </div>
      </article>
    `)
    .join("");
}

function renderFilters() {
  elements.filterBar.innerHTML = getCategories()
    .map((category) => `
      <button class="filter-chip ${state.activeCategory === category ? "active" : ""}" type="button" data-category="${category}">
        ${category}
      </button>
    `)
    .join("");
}

function renderCollections() {
  elements.collectionGrid.innerHTML = `
    <button class="collection-card ${state.activeCollection === "all" ? "active" : ""}" type="button" data-collection-id="all">
      <strong>All products</strong>
      <span>See the full basket catalog.</span>
    </button>
    ${state.collections.map((collection) => `
      <button class="collection-card ${state.activeCollection === collection.id ? "active" : ""}" type="button" data-collection-id="${collection.id}">
        <strong>${collection.title}</strong>
        <span>${collection.description}</span>
      </button>
    `).join("")}
  `;

  if (state.activeCollection === "all") {
    elements.collectionFeedback.textContent = "Showing all products.";
    return;
  }

  const collection = state.collections.find((entry) => entry.id === state.activeCollection);
  if (!collection) {
    elements.collectionFeedback.textContent = "Showing all products.";
    return;
  }

  const productNames = collection.productIds
    .map((productId) => getProduct(productId))
    .filter(Boolean)
    .map((product) => product.name);

  elements.collectionFeedback.textContent = `Showing ${collection.title}: ${productNames.join(", ")}.`;
}

function getCartTotals() {
  return state.cart.reduce((accumulator, item) => {
    accumulator.units += item.quantity;
    accumulator.subtotal += item.price * item.quantity;
    return accumulator;
  }, { units: 0, subtotal: 0 });
}

function renderCart() {
  if (!state.cart.length) {
    elements.cartItems.innerHTML = `
      <div class="empty-state">
        <strong>Your basket is empty.</strong>
        <p>Add products to build a custom order before checkout.</p>
      </div>
    `;
    elements.cartSummary.textContent = "No items yet.";
    elements.cartSubtotal.textContent = "Estimated subtotal: KES 0";
    elements.stickyCartCount.textContent = "0 items";
    elements.checkoutButton.disabled = true;
    return;
  }

  const totals = getCartTotals();
  elements.cartSummary.textContent = `${state.cart.length} item types, ${totals.units} total units.`;
  elements.cartSubtotal.textContent = `Estimated subtotal: ${formatCurrency(totals.subtotal)}`;
  elements.stickyCartCount.textContent = `${totals.units} item${totals.units === 1 ? "" : "s"}`;
  elements.checkoutButton.disabled = false;

  elements.cartItems.innerHTML = state.cart.map((item) => `
    <article class="cart-item">
      <div class="cart-line">
        <div>
          <h4>${item.name}</h4>
          <div class="cart-item-meta">${item.quantity} ${item.unit} · ${formatCurrency(item.price * item.quantity)}</div>
        </div>
        <button class="remove-button" type="button" data-remove-product-id="${item.id}">Remove</button>
      </div>
      <div class="cart-controls">
        <button class="quantity-button" type="button" data-cart-action="decrease" data-product-id="${item.id}" aria-label="Reduce ${item.name}">-</button>
        <input class="quantity-input" type="number" min="1" value="${item.quantity}" data-quantity-input-id="${item.id}" aria-label="${item.name} quantity">
        <button class="quantity-button" type="button" data-cart-action="increase" data-product-id="${item.id}" aria-label="Increase ${item.name}">+</button>
      </div>
    </article>
  `).join("");
}

function renderTestimonials() {
  elements.testimonialGrid.innerHTML = state.testimonials.map((item) => `
    <article class="testimonial-card">
      <p>"${item.quote}"</p>
      <strong>${item.name}</strong>
    </article>
  `).join("");
}

function renderMixes() {
  elements.mixesGrid.innerHTML = state.mixes.map((mix) => `
    <article class="inspiration-card">
      <h3>${mix.title}</h3>
      <p>${mix.description}</p>
    </article>
  `).join("");
}

function syncDraftInputs() {
  const packageCustomerName = document.getElementById("package-customer-name");
  if (packageCustomerName) packageCustomerName.value = state.customerDrafts.package.name;
  
  const packagePhone = document.getElementById("package-phone");
  if (packagePhone) packagePhone.value = state.customerDrafts.package.phone;
  
  const packageLocation = document.getElementById("package-location");
  if (packageLocation) packageLocation.value = state.customerDrafts.package.location;
  
  const packageZone = document.getElementById("package-zone");
  if (packageZone) packageZone.value = state.customerDrafts.package.zone;
  
  const customCustomerName = document.getElementById("custom-customer-name");
  if (customCustomerName) customCustomerName.value = state.customerDrafts.custom.name;
  
  const customPhone = document.getElementById("custom-phone");
  if (customPhone) customPhone.value = state.customerDrafts.custom.phone;
  
  const customLocation = document.getElementById("custom-location");
  if (customLocation) customLocation.value = state.customerDrafts.custom.location;
  
  const customZone = document.getElementById("custom-zone");
  if (customZone) customZone.value = state.customerDrafts.custom.zone;
  
  const customNotes = document.getElementById("custom-notes");
  if (customNotes) customNotes.value = state.customerDrafts.custom.notes;
  
  if (elements.productSearch) elements.productSearch.value = state.searchTerm;
}

function addToCart(productId) {
  const product = getProduct(productId);
  if (!product) {
    return;
  }
  const existing = state.cart.find((entry) => entry.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      unit: product.unit,
      price: product.price,
      quantity: 1,
    });
  }
  saveState();
  renderCart();
}

function adjustQuantity(productId, change) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) {
    return;
  }
  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  saveState();
  renderCart();
}

function setQuantity(productId, nextValue) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) {
    return;
  }
  const value = Number.parseInt(nextValue, 10);
  if (Number.isNaN(value) || value <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  } else {
    item.quantity = value;
  }
  saveState();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((entry) => entry.id !== productId);
  saveState();
  renderCart();
}

function openModal(modal) {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) {
    return;
  }
  modal.hidden = true;
  if (elements.packageModal.hidden && elements.packageDetailsModal.hidden && elements.customModal.hidden) {
    document.body.style.overflow = "";
  }
}

function validateRequiredFields(fields) {
  const missing = fields.find((field) => !field.value.trim());
  if (missing) {
    return `Please enter your ${missing.label}.`;
  }
  const phoneField = fields.find((field) => field.type === "phone");
  if (phoneField) {
    const digits = phoneField.value.replace(/[^\d+]/g, "");
    if (digits.length < 10) {
      return "Please enter a valid phone number.";
    }
  }
  return "";
}

function createOrderId(prefix) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 12);
  return `${prefix}-${stamp}`;
}

function buildPackageMessage(data) {
  return [
    "Hello Mama Fresh,",
    "",
    "I would like to order the following package:",
    "",
    `Package: ${data.packageName}`,
    `Option: ${data.packageTier}`,
    `Estimated Budget: ${data.priceLabel}`,
    `Order ID: ${data.orderId}`,
    `Time: ${data.timestamp}`,
    "",
    `Name: ${data.customerName}`,
    `Phone: ${data.phone}`,
    "",
    `Delivery Zone: ${data.zone}`,
    `Delivery Location: ${data.location}`,
    "",
    "END.",
  ].join("\n");
}

function buildCustomMessage(data) {
  const lines = data.items.map((item, index) => `${index + 1}. ${item.name} (${item.quantity} ${item.unit}) - ${formatCurrency(item.price * item.quantity)}`);
  return [
    "Hello Mama Fresh,",
    "",
    `Name: ${data.customerName}`,
    `Phone: ${data.phone}`,
    `Order ID: ${data.orderId}`,
    `Time: ${data.timestamp}`,
    "",
    "Custom Order:",
    "",
    ...lines,
    "",
    `Estimated Subtotal: ${formatCurrency(data.subtotal)}`,
    `Delivery Zone: ${data.zone}`,
    `Delivery Location: ${data.location}`,
    `Notes: ${data.notes || "None"}`,
    "",
    "END.",
  ].join("\n");
}

function sendToWhatsApp(message) {
  const targetUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const popup = window.open(targetUrl, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.assign(targetUrl);
  }
}

function populatePackageTierSelect(packageItem) {
  const currentTier = getSelectedTier(packageItem);
  elements.packageTierSelect.innerHTML = packageItem.pricing.map((tier) => `
    <option value="${tier.label}" ${currentTier && currentTier.label === tier.label ? "selected" : ""}>
      ${tier.label} - ${formatCurrency(tier.price)}
    </option>
  `).join("");
}

function openPackageCheckout(packageId) {
  const packageItem = getPackage(packageId);
  if (!packageItem) {
    return;
  }
  state.activePackageId = packageItem.id;
  elements.packageName.value = packageItem.name;
  populatePackageTierSelect(packageItem);
  const tier = getSelectedTier(packageItem);
  elements.packageSelectedCopy.textContent = `${packageItem.name}: ${packageItem.description}${tier ? ` Selected option: ${tier.label}.` : ""}`;
  elements.packageError.textContent = "";
  syncDraftInputs();
  openModal(elements.packageModal);
}

function openPackageDetails(packageId) {
  const packageItem = getPackage(packageId);
  if (!packageItem) {
    return;
  }
  state.activePackageId = packageItem.id;
  elements.packageDetailsCopy.textContent = `${packageItem.name}: ${packageItem.description}`;
  elements.packageDetailsItems.innerHTML = packageItem.contents.map((item) => `<span>${item}</span>`).join("");
  elements.packageDetailsUseCases.innerHTML = packageItem.useCases.map((item) => `<li>${item}</li>`).join("");
  elements.packageDetailsPricing.innerHTML = packageItem.pricing.map((tier) => `<li><strong>${tier.label}</strong> - ${formatCurrency(tier.price)}. ${tier.summary}</li>`).join("");
  openModal(elements.packageDetailsModal);
}

function openCustomCheckout() {
  if (!state.cart.length) {
    elements.customError.textContent = "Add at least one item before checkout.";
    return;
  }
  const totals = getCartTotals();
  elements.customError.textContent = "";
  elements.checkoutPreview.textContent = [
    ...state.cart.map((item, index) => `${index + 1}. ${item.name} (${item.quantity} ${item.unit}) - ${formatCurrency(item.price * item.quantity)}`),
    "",
    `Estimated subtotal: ${formatCurrency(totals.subtotal)}`,
  ].join("\n");
  syncDraftInputs();
  openModal(elements.customModal);
}

function updateDraftsFromForms() {
  const packageCustomerName = document.getElementById("package-customer-name");
  const packagePhone = document.getElementById("package-phone");
  const packageLocation = document.getElementById("package-location");
  const packageZone = document.getElementById("package-zone");
  
  if (packageCustomerName && packagePhone && packageLocation && packageZone) {
    state.customerDrafts.package = {
      name: packageCustomerName.value,
      phone: packagePhone.value,
      location: packageLocation.value,
      zone: packageZone.value,
    };
  }
  
  const customCustomerName = document.getElementById("custom-customer-name");
  const customPhone = document.getElementById("custom-phone");
  const customLocation = document.getElementById("custom-location");
  const customZone = document.getElementById("custom-zone");
  const customNotes = document.getElementById("custom-notes");
  
  if (customCustomerName && customPhone && customLocation && customZone && customNotes) {
    state.customerDrafts.custom = {
      name: customCustomerName.value,
      phone: customPhone.value,
      location: customLocation.value,
      zone: customZone.value,
      notes: customNotes.value,
    };
  }
  
  saveState();
}

function handlePackageSubmit(event) {
  event.preventDefault();
  const packageItem = getPackage(state.activePackageId);
  const customerName = document.getElementById("package-customer-name");
  const phone = document.getElementById("package-phone");
  const location = document.getElementById("package-location");
  const zone = document.getElementById("package-zone");
  const error = validateRequiredFields([
    { label: "name", value: customerName.value },
    { label: "phone number", value: phone.value, type: "phone" },
    { label: "delivery location", value: location.value },
  ]);
  if (error) {
    elements.packageError.textContent = error;
    return;
  }
  const tierLabel = elements.packageTierSelect.value;
  state.selectedPackageTierById[packageItem.id] = tierLabel;
  updateDraftsFromForms();
  const tier = packageItem.pricing.find((entry) => entry.label === tierLabel) || packageItem.pricing[0];
  const timestamp = new Date().toLocaleString();
  const message = buildPackageMessage({
    packageName: packageItem.name,
    packageTier: tier.label,
    priceLabel: formatCurrency(tier.price),
    orderId: createOrderId("PKG"),
    timestamp,
    customerName: customerName.value.trim(),
    phone: phone.value.trim(),
    zone: zone.value.trim(),
    location: location.value.trim(),
  });
  sendToWhatsApp(message);
}

function handleCustomSubmit(event) {
  event.preventDefault();
  const customerName = document.getElementById("custom-customer-name");
  const phone = document.getElementById("custom-phone");
  const location = document.getElementById("custom-location");
  const zone = document.getElementById("custom-zone");
  const notes = document.getElementById("custom-notes");
  const error = validateRequiredFields([
    { label: "name", value: customerName.value },
    { label: "phone number", value: phone.value, type: "phone" },
    { label: "delivery location", value: location.value },
  ]);
  if (error) {
    elements.customError.textContent = error;
    return;
  }
  const totals = getCartTotals();
  updateDraftsFromForms();
  const message = buildCustomMessage({
    customerName: customerName.value.trim(),
    phone: phone.value.trim(),
    orderId: createOrderId("CUS"),
    timestamp: new Date().toLocaleString(),
    items: state.cart,
    subtotal: totals.subtotal,
    zone: zone.value.trim(),
    location: location.value.trim(),
    notes: notes.value.trim(),
  });
  sendToWhatsApp(message);
}

function applySearch() {
  state.searchTerm = elements.productSearch.value;
  saveState();
  renderProducts();
}

function applyCategory(category) {
  state.activeCategory = category;
  saveState();
  renderFilters();
  renderProducts();
}

function applyCollection(collectionId) {
  state.activeCollection = collectionId;
  saveState();
  
  // Update the UI on the current page
  if (elements.collectionGrid) renderCollections();
  if (elements.productGrid) renderProducts();
  scrollToCustomOrder();
}

function scrollToCustomOrder() {
  const target = document.getElementById("custom-order");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleDocumentClick(event) {
  const packageButton = event.target.closest("[data-package-id]");
  if (packageButton) {
    openPackageCheckout(packageButton.dataset.packageId);
    return;
  }
  const packageDetailsButton = event.target.closest("[data-package-details-id]");
  if (packageDetailsButton) {
    openPackageDetails(packageDetailsButton.dataset.packageDetailsId);
    return;
  }
  const addButton = event.target.closest("[data-product-id]");
  if (addButton && addButton.classList.contains("add-button")) {
    addToCart(addButton.dataset.productId);
    return;
  }
  const quantityButton = event.target.closest("[data-cart-action]");
  if (quantityButton) {
    adjustQuantity(quantityButton.dataset.productId, quantityButton.dataset.cartAction === "increase" ? 1 : -1);
    return;
  }
  const removeButton = event.target.closest("[data-remove-product-id]");
  if (removeButton) {
    removeFromCart(removeButton.dataset.removeProductId);
    return;
  }
  const filterButton = event.target.closest("[data-category]");
  if (filterButton) {
    applyCategory(filterButton.dataset.category);
    return;
  }
  const collectionButton = event.target.closest("[data-collection-id]");
  if (collectionButton) {
    applyCollection(collectionButton.dataset.collectionId);
    return;
  }
  const closeButton = event.target.closest("[data-close]");
  if (closeButton) {
    closeModal(document.getElementById(closeButton.dataset.close));
  }
}

function handleInput(event) {
  const quantityInput = event.target.closest("[data-quantity-input-id]");
  if (quantityInput) {
    setQuantity(quantityInput.dataset.quantityInputId, quantityInput.value);
    return;
  }
  if (event.target.matches("#package-customer-name, #package-phone, #package-location, #package-zone, #custom-customer-name, #custom-phone, #custom-location, #custom-zone, #custom-notes")) {
    updateDraftsFromForms();
  }
}

function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
    });

    // Close menu when clicking on a link
    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

function updateActiveNav() {
  const navLinks = document.getElementById("nav-links");
  if (!navLinks) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = navLinks.querySelectorAll('a[href]');
  
  links.forEach(link => {
    link.classList.remove('current-page');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('current-page');
    }
  });
}

async function initialize() {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
  loadSavedState();
  await loadData();
  
  // Initialize navigation and update active nav
  initNavigation();
  updateActiveNav();
  
  // Only render elements that exist on the current page
  if (elements.packageNotes) renderPackageNotes();
  if (elements.packageGrid) renderPackages();
  if (elements.collectionGrid) renderCollections();
  if (elements.filterBar) renderFilters();
  if (elements.productGrid) renderProducts();
  if (elements.cartItems) renderCart();
  if (elements.testimonialGrid) renderTestimonials();
  if (elements.mixesGrid) renderMixes();
  syncDraftInputs();

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("input", handleInput);
  
  if (elements.searchButton) elements.searchButton.addEventListener("click", applySearch);
  if (elements.productSearch) elements.productSearch.addEventListener("input", applySearch);
  if (elements.checkoutButton) elements.checkoutButton.addEventListener("click", openCustomCheckout);
  if (elements.packageForm) elements.packageForm.addEventListener("submit", handlePackageSubmit);
  if (elements.customForm) elements.customForm.addEventListener("submit", handleCustomSubmit);
  
  if (elements.packageTierSelect) {
    elements.packageTierSelect.addEventListener("change", (event) => {
      if (state.activePackageId) {
        state.selectedPackageTierById[state.activePackageId] = event.target.value;
        saveState();
        const packageItem = getPackage(state.activePackageId);
        const tier = packageItem.pricing.find((entry) => entry.label === event.target.value);
        elements.packageSelectedCopy.textContent = `${packageItem.name}: ${packageItem.description} Selected option: ${tier.label}.`;
        renderPackages();
      }
    });
  }
  
  if (elements.packageDetailsOrderButton) {
    elements.packageDetailsOrderButton.addEventListener("click", () => {
      if (state.activePackageId) {
        closeModal(elements.packageDetailsModal);
        openPackageCheckout(state.activePackageId);
      }
    });
  }
  
  if (elements.stickyCart) {
    elements.stickyCart.addEventListener("click", () => {
      scrollToCustomOrder();
      if (state.cart.length) {
        openCustomCheckout();
      }
    });
  }

  [elements.packageModal, elements.packageDetailsModal, elements.customModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(elements.packageModal);
      closeModal(elements.packageDetailsModal);
      closeModal(elements.customModal);
    }
  });
}

initialize().catch((error) => {
  console.error(error);
  document.body.innerHTML = "<main style='padding:2rem;font-family:sans-serif'>The website could not load its product data. Please refresh and try again.</main>";
});
