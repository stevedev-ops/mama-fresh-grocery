const config = {
  whatsappNumber: (window.MAMA_FRESH_CONFIG && window.MAMA_FRESH_CONFIG.whatsappNumber) || "254792705921",
  storageKey: "mama-fresh-state-v1",
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

function saveState() {
  const payload = {
    cart: state.cart,
    searchTerm: state.searchTerm,
    activeCategory: state.activeCategory,
    activeCollection: state.activeCollection,
    selectedPackageTierById: state.selectedPackageTierById,
    customerDrafts: state.customerDrafts,
  };
  localStorage.setItem(config.storageKey, JSON.stringify(payload));
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(config.storageKey);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    state.cart = parsed.cart || [];
    state.searchTerm = parsed.searchTerm || "";
    state.activeCategory = parsed.activeCategory || "All";
    state.activeCollection = parsed.activeCollection || "all";
    state.selectedPackageTierById = parsed.selectedPackageTierById || {};
    state.customerDrafts = {
      package: { ...state.customerDrafts.package, ...(parsed.customerDrafts && parsed.customerDrafts.package) },
      custom: { ...state.customerDrafts.custom, ...(parsed.customerDrafts && parsed.customerDrafts.custom) },
    };
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

function renderPackages() {
  elements.packageGrid.innerHTML = state.packages
    .map((pkg) => {
      const tier = getSelectedTier(pkg);
      return `
        <article class="package-card">
          <div class="package-image">
            <img
              class="package-photo"
              src="${packagePhotoUrls[pkg.id] || packagePhotoUrls.nyumbani}"
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
            src="${categoryPhotoUrls[product.category] || categoryPhotoUrls.Vegetables}"
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
  document.getElementById("package-customer-name").value = state.customerDrafts.package.name;
  document.getElementById("package-phone").value = state.customerDrafts.package.phone;
  document.getElementById("package-location").value = state.customerDrafts.package.location;
  document.getElementById("package-zone").value = state.customerDrafts.package.zone;
  document.getElementById("custom-customer-name").value = state.customerDrafts.custom.name;
  document.getElementById("custom-phone").value = state.customerDrafts.custom.phone;
  document.getElementById("custom-location").value = state.customerDrafts.custom.location;
  document.getElementById("custom-zone").value = state.customerDrafts.custom.zone;
  document.getElementById("custom-notes").value = state.customerDrafts.custom.notes;
  elements.productSearch.value = state.searchTerm;
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
  state.customerDrafts.package = {
    name: document.getElementById("package-customer-name").value,
    phone: document.getElementById("package-phone").value,
    location: document.getElementById("package-location").value,
    zone: document.getElementById("package-zone").value,
  };
  state.customerDrafts.custom = {
    name: document.getElementById("custom-customer-name").value,
    phone: document.getElementById("custom-phone").value,
    location: document.getElementById("custom-location").value,
    zone: document.getElementById("custom-zone").value,
    notes: document.getElementById("custom-notes").value,
  };
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
  renderCollections();
  renderProducts();
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

async function initialize() {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
  loadSavedState();
  await loadData();
  renderPackageNotes();
  renderPackages();
  renderCollections();
  renderFilters();
  renderProducts();
  renderCart();
  renderTestimonials();
  renderMixes();
  syncDraftInputs();

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("input", handleInput);
  elements.searchButton.addEventListener("click", applySearch);
  elements.productSearch.addEventListener("input", applySearch);
  elements.checkoutButton.addEventListener("click", openCustomCheckout);
  elements.packageForm.addEventListener("submit", handlePackageSubmit);
  elements.customForm.addEventListener("submit", handleCustomSubmit);
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
  elements.packageDetailsOrderButton.addEventListener("click", () => {
    if (state.activePackageId) {
      closeModal(elements.packageDetailsModal);
      openPackageCheckout(state.activePackageId);
    }
  });
  elements.stickyCart.addEventListener("click", () => {
    scrollToCustomOrder();
    if (state.cart.length) {
      openCustomCheckout();
    }
  });

  [elements.packageModal, elements.packageDetailsModal, elements.customModal].forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
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
