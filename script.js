/**
 * ============================================================================
 * AURA ECOSYSTEM — JAVASCRIPT CORE INTERACTION ENGINE
 * ============================================================================
 * Production-ready Vanilla JS implementation handling:
 * - Product data catalog & dynamic showcase filtering
 * - Interactive Flagship Configurator (Finishes, Storage, Network, Live Pricing)
 * - Persistent Cart & Wishlist with localStorage synchronization
 * - Full-Text Search Modal with keyboard shortcuts & live indexing
 * - Letter-by-Letter Interactive Morphing Buttons
 * - IntersectionObserver scroll reveals & Sticky Nav state
 * - Multi-step Demo Checkout simulation
 * - Keynote video player simulation & Toast notifications
 */

'use strict';

/* ============================================================================
   1. PRODUCT CATALOG & LOCAL DATA
   ============================================================================ */
const PRODUCTS_DATA = [
  {
    id: 'aura-one-pro',
    name: 'Aura One Pro',
    category: 'phone',
    tagline: 'Intelligence in pure light',
    description: 'The world\'s first photonic-silicon superphone with sculpted Grade 5 Titanium chassis and 100 TOPS neural processing.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
    specs: ['Photonic M5 Quantum', '4000 nits Micro-OLED', '48h Quantum Battery', 'Grade 5 Titanium'],
    colors: ['Natural Titanium', 'Space Obsidian', 'Cosmic Silver', 'Deep Aurora Blue']
  },
  {
    id: 'aura-studio-m5',
    name: 'Aura Studio M5',
    category: 'studio',
    tagline: 'Zero-thermal desktop workstation',
    description: '192-billion photonic laser junctions orchestrating 128 compute cores with 1.2 TB/s unified optical memory.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    specs: ['128-Core Photonic Silicon', '1.2 TB/s Bandwidth', 'Zero Fan Acoustic Decibel', '100% Recycled Aluminum'],
    colors: ['Space Obsidian', 'Cosmic Silver']
  },
  {
    id: 'aura-neural-glass',
    name: 'Aura Neural Glass',
    category: 'spatial',
    tagline: 'True-depth spatial optical canvas',
    description: '42-gram dual holographic optics delivering 64 PPD retina clarity, gaze-tracking, and sub-vocal neural command.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop',
    specs: ['64 PPD Holographic Waveguide', '42g Ultralight Weight', 'Sub-Vocal Neural Telemetry', '16h Continuous Battery'],
    colors: ['Titanium Graphite', 'Frost White']
  },
  {
    id: 'aura-chronos',
    name: 'Aura Chronos',
    category: 'wearables',
    tagline: 'Atomic precision biometric timekeeper',
    description: 'Continuous optical cardiovascular spectrometry, blood glucose estimation, and cellular satellite uplink in ceramic titanium.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    specs: ['Optical Spectrometry', 'Ceramic Titanium Bezel', '7-Day Battery', '100m Hydro-Sealed'],
    colors: ['Titanium Natural', 'Space Obsidian']
  },
  {
    id: 'aura-pods-ultra',
    name: 'Aura Pods Ultra',
    category: 'wearables',
    tagline: 'Lossless spatial acoustic soundstage',
    description: 'Bespoke carbon-nanotube drivers delivering 24-bit 192kHz uncompressed lossless audio with active acoustic isolation.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    specs: ['24-bit 192kHz Lossless', 'Spatial Beamforming', '40h Total Listening', 'Active Acoustic Cancellation'],
    colors: ['Space Obsidian', 'Cosmic Silver']
  }
];

const BENCHMARK_METRICS = {
  neural: [
    { name: 'Aura Photonic M5 Max', value: 100, unit: 'TOPS', isAura: true },
    { name: 'Previous Gen M4 Pro', value: 38, unit: 'TOPS', isAura: false },
    { name: 'Industry Flagship X-Elite', value: 45, unit: 'TOPS', isAura: false },
    { name: 'Standard Neural Core', value: 24, unit: 'TOPS', isAura: false }
  ],
  gpu: [
    { name: 'Aura Photonic M5 Max', value: 48.6, unit: 'TFLOPS', isAura: true },
    { name: 'Previous Gen M4 Pro', value: 22.4, unit: 'TFLOPS', isAura: false },
    { name: 'Desktop Ultra Compute', value: 36.1, unit: 'TFLOPS', isAura: false },
    { name: 'Mobile Workstation GPU', value: 18.2, unit: 'TFLOPS', isAura: false }
  ],
  efficiency: [
    { name: 'Aura Photonic M5 Max (Photonic Cores)', value: 98, unit: 'Index', isAura: true },
    { name: 'Silicon 3nm Architecture', value: 52, unit: 'Index', isAura: false },
    { name: 'Standard 4nm Architecture', value: 41, unit: 'Index', isAura: false },
    { name: 'Legacy 7nm Node', value: 22, unit: 'Index', isAura: false }
  ]
};

/* ============================================================================
   2. GLOBAL STATE & LOCAL STORAGE SYNC
   ============================================================================ */
class AppState {
  constructor() {
    this.cart = this.loadFromStorage('aura_cart', []);
    this.wishlist = this.loadFromStorage('aura_wishlist', []);
    
    // Configurator state for Aura One Pro
    this.configurator = {
      product: PRODUCTS_DATA[0],
      finish: 'natural',
      finishName: 'Natural Titanium',
      storage: '512gb',
      storageLabel: '512 GB',
      storagePrice: 0,
      connectivity: 'wifi',
      connectivityLabel: 'Wi-Fi 7 + Spatial Mesh',
      connectivityPrice: 0,
      quantity: 1,
      basePrice: 1499,
      activeAngle: 'hero'
    };
  }

  loadFromStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`Error loading localStorage key "${key}":`, e);
      return defaultValue;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving to localStorage key "${key}":`, e);
    }
  }

  // Cart actions
  addToCart(item) {
    const existingIndex = this.cart.findIndex(
      cartItem => cartItem.id === item.id && 
                  cartItem.finish === item.finish && 
                  cartItem.storage === item.storage &&
                  cartItem.connectivity === item.connectivity
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += item.quantity;
    } else {
      this.cart.push(item);
    }

    this.saveToStorage('aura_cart', this.cart);
    this.updateCartBadges();
    this.renderCartItems();
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveToStorage('aura_cart', this.cart);
    this.updateCartBadges();
    this.renderCartItems();
  }

  updateCartQuantity(index, delta) {
    if (!this.cart[index]) return;
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.saveToStorage('aura_cart', this.cart);
      this.updateCartBadges();
      this.renderCartItems();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage('aura_cart', this.cart);
    this.updateCartBadges();
    this.renderCartItems();
  }

  // Wishlist actions
  toggleWishlist(item) {
    const existingIndex = this.wishlist.findIndex(w => w.id === item.id);
    let added = false;

    if (existingIndex > -1) {
      this.wishlist.splice(existingIndex, 1);
      added = false;
    } else {
      this.wishlist.push(item);
      added = true;
    }

    this.saveToStorage('aura_wishlist', this.wishlist);
    this.updateWishlistBadges();
    this.renderWishlistItems();
    return added;
  }

  isInWishlist(id) {
    return this.wishlist.some(w => w.id === id);
  }

  // Dynamic UI Badge updates
  updateCartBadges() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadgeCount');
    const drawerTag = document.getElementById('cartItemCountTag');

    if (badge) {
      badge.textContent = totalItems;
      badge.classList.toggle('visible', totalItems > 0);
    }

    if (drawerTag) {
      drawerTag.textContent = `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`;
    }
  }

  updateWishlistBadges() {
    const badge = document.getElementById('wishlistBadgeCount');
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.classList.toggle('visible', this.wishlist.length > 0);
    }
  }

  renderCartItems() {
    const container = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const grandTotalEl = document.getElementById('cartGrandTotal');
    const checkoutBtn = document.getElementById('checkoutTriggerBtn');

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="search-empty-state">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 1rem auto; opacity:0.4;">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p style="font-size:1.125rem; font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">Your Bag is empty.</p>
          <p style="color:var(--text-secondary); font-size:0.875rem;">Explore our groundbreaking photonic ecosystem to add items.</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      if (grandTotalEl) grandTotalEl.textContent = '$0.00';
      if (checkoutBtn) {
        checkoutBtn.setAttribute('disabled', 'true');
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.pointerEvents = 'none';
      }
      return;
    }

    if (checkoutBtn) {
      checkoutBtn.removeAttribute('disabled');
      checkoutBtn.style.opacity = '1';
      checkoutBtn.style.pointerEvents = 'auto';
    }

    let subtotal = 0;
    container.innerHTML = this.cart.map((item, index) => {
      const itemTotal = item.unitPrice * item.quantity;
      subtotal += itemTotal;
      return `
        <div class="cart-item-row" data-index="${index}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-spec">${item.finishName || item.finish || 'Titanium'} • ${item.storageLabel || ''}</div>
            <div class="cart-item-price">$${itemTotal.toLocaleString()}</div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-selector">
              <button type="button" class="qty-btn cart-qty-minus" data-index="${index}" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-count">${item.quantity}</span>
              <button type="button" class="qty-btn cart-qty-plus" data-index="${index}" aria-label="Increase quantity">&#43;</button>
            </div>
            <button type="button" class="cart-remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (grandTotalEl) grandTotalEl.textContent = `$${subtotal.toLocaleString()}`;
  }

  renderWishlistItems() {
    const container = document.getElementById('wishlistItemsList');
    if (!container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = `
        <div class="search-empty-state">
          <p style="font-size:1.125rem; font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">No saved items.</p>
          <p style="color:var(--text-secondary); font-size:0.875rem;">Click the heart icon on any device to save it to your wishlist.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.wishlist.map((item, index) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-spec">${item.tagline || 'Aura Hardware'}</div>
          <div class="cart-item-price">$${item.price.toLocaleString()}</div>
        </div>
        <div class="cart-item-actions">
          <button type="button" class="btn btn-secondary glass-btn wishlist-move-cart" data-id="${item.id}" style="padding:0.4rem 0.75rem; font-size:0.75rem;">Move to Bag</button>
          <button type="button" class="cart-remove-btn wishlist-remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join('');
  }
}

const state = new AppState();

/* ============================================================================
   3. TOAST NOTIFICATION UTILITY
   ============================================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-pill';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${type === 'success' ? '#30d158' : '#2997ff'}" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3200);
}

/* ============================================================================
   4. INTERACTIVE LETTER-BY-LETTER MORPH BUTTON COMPONENT
   ============================================================================ */
function initMorphButtons() {
  const morphButtons = document.querySelectorAll('.btn-morph');

  morphButtons.forEach(button => {
    const textWrapper = button.querySelector('.btn-text-wrapper');
    if (!textWrapper) return;

    const idleText = button.dataset.idleText || textWrapper.textContent.trim();
    const hoverText = button.dataset.hoverText || idleText;

    // Build letter spans with staggered delays
    function renderLetters(text) {
      textWrapper.innerHTML = '';
      const letters = text.split('');
      letters.forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char-item';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 25}ms`;
        textWrapper.appendChild(span);
      });
    }

    renderLetters(idleText);

    // Dynamic text morph on hover
    button.addEventListener('mouseenter', () => {
      renderLetters(hoverText);
    });

    button.addEventListener('mouseleave', () => {
      renderLetters(idleText);
    });
  });
}

/* ============================================================================
   5. DYNAMIC PRODUCT SHOWCASE & CATEGORY FILTERING
   ============================================================================ */
function initProductShowcase() {
  const tabs = document.querySelectorAll('#showcaseTabList .segment-tab');
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;

  function renderCards(category = 'all') {
    const filtered = category === 'all' 
      ? PRODUCTS_DATA 
      : PRODUCTS_DATA.filter(p => p.category === category || (category === 'wearables' && p.category === 'wearables'));

    grid.innerHTML = filtered.map(product => `
      <article class="showcase-card reveal-item" data-id="${product.id}">
        <div class="showcase-img-wrap">
          <img src="${product.image}" alt="${product.name}" class="showcase-img" loading="lazy">
        </div>
        <div class="showcase-body">
          <span class="showcase-category-badge">${product.category.toUpperCase()}</span>
          <h3 class="showcase-name">${product.name}</h3>
          <p class="showcase-desc">${product.description}</p>
          <div class="showcase-footer">
            <span class="showcase-price">From $${product.price.toLocaleString()}</span>
            <div class="showcase-cta-group">
              <button type="button" class="btn btn-secondary glass-btn showcase-quick-buy" data-id="${product.id}">Quick Add</button>
              <a href="#configurator" class="btn btn-primary showcase-configure-link" data-id="${product.id}">Configure</a>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // Trigger reveal class
    setTimeout(() => {
      grid.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const category = tab.dataset.category;
      renderCards(category);
    });
  });

  // Initial render
  renderCards('all');

  // Delegated events for showcase quick buy
  grid.addEventListener('click', (e) => {
    const quickBuyBtn = e.target.closest('.showcase-quick-buy');
    if (quickBuyBtn) {
      const productId = quickBuyBtn.dataset.id;
      const product = PRODUCTS_DATA.find(p => p.id === productId);
      if (product) {
        state.addToCart({
          id: product.id,
          name: product.name,
          unitPrice: product.price,
          quantity: 1,
          image: product.image,
          finish: 'Default Finish',
          storageLabel: product.specs[0]
        });
        showToast(`${product.name} added to your Bag`, 'success');
        openDrawer('cartDrawerOverlay');
      }
    }
  });
}

/* ============================================================================
   6. FLAGSHIP PRODUCT CONFIGURATOR LOGIC
   ============================================================================ */
function initConfigurator() {
  const mainImg = document.getElementById('configMainImage');
  const colorBadge = document.getElementById('configColorBadge');
  const selectedColorName = document.getElementById('selectedColorName');
  const selectedStorageName = document.getElementById('selectedStorageName');
  const totalPriceEl = document.getElementById('configTotalPrice');
  const qtyCountEl = document.getElementById('configQty');
  const qtyMinusBtn = document.getElementById('qtyMinus');
  const qtyPlusBtn = document.getElementById('qtyPlus');
  const addToBagBtn = document.getElementById('configAddToBagBtn');
  const wishlistBtn = document.getElementById('configWishlistBtn');

  // Angle thumbnails
  const angleImages = {
    hero: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1400&auto=format&fit=crop',
    edge: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1400&auto=format&fit=crop',
    sensor: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1400&auto=format&fit=crop',
    back: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1400&auto=format&fit=crop'
  };

  function updatePriceCalculation() {
    const unitPrice = state.configurator.basePrice + state.configurator.storagePrice + state.configurator.connectivityPrice;
    const finalTotal = unitPrice * state.configurator.quantity;
    if (totalPriceEl) {
      totalPriceEl.textContent = `$${finalTotal.toLocaleString()}`;
    }
  }

  // Finish / Color swatches
  const colorSwatches = document.querySelectorAll('.swatch-btn');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => {
        s.classList.remove('active');
        s.setAttribute('aria-checked', 'false');
      });
      swatch.classList.add('active');
      swatch.setAttribute('aria-checked', 'true');

      state.configurator.finish = swatch.dataset.color;
      state.configurator.finishName = swatch.dataset.colorName;

      if (selectedColorName) selectedColorName.textContent = state.configurator.finishName;
      if (colorBadge) colorBadge.textContent = state.configurator.finishName;

      // Swap image with smooth crossfade
      if (mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = swatch.dataset.imgUrl;
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Thumbnail multi-angle views
  const thumbButtons = document.querySelectorAll('.thumb-btn');
  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const angle = btn.dataset.angle;
      state.configurator.activeAngle = angle;

      if (mainImg && angleImages[angle]) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = angleImages[angle];
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Storage selection
  const storagePills = document.querySelectorAll('.option-pills-grid button[data-storage]');
  storagePills.forEach(pill => {
    pill.addEventListener('click', () => {
      storagePills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-checked', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-checked', 'true');

      state.configurator.storage = pill.dataset.storage;
      state.configurator.storageLabel = pill.dataset.storageLabel;
      state.configurator.storagePrice = parseInt(pill.dataset.storagePrice, 10);

      if (selectedStorageName) selectedStorageName.textContent = state.configurator.storageLabel;
      updatePriceCalculation();
    });
  });

  // Connectivity selection
  const connectivityPills = document.querySelectorAll('.connectivity-grid button[data-connect]');
  connectivityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      connectivityPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-checked', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-checked', 'true');

      state.configurator.connectivity = pill.dataset.connect;
      state.configurator.connectivityLabel = pill.dataset.connectLabel;
      state.configurator.connectivityPrice = parseInt(pill.dataset.connectPrice, 10);

      updatePriceCalculation();
    });
  });

  // Quantity adjustments
  if (qtyMinusBtn && qtyPlusBtn && qtyCountEl) {
    qtyMinusBtn.addEventListener('click', () => {
      if (state.configurator.quantity > 1) {
        state.configurator.quantity--;
        qtyCountEl.textContent = state.configurator.quantity;
        updatePriceCalculation();
      }
    });

    qtyPlusBtn.addEventListener('click', () => {
      if (state.configurator.quantity < 10) {
        state.configurator.quantity++;
        qtyCountEl.textContent = state.configurator.quantity;
        updatePriceCalculation();
      }
    });
  }

  // Add to Bag action
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      const unitPrice = state.configurator.basePrice + state.configurator.storagePrice + state.configurator.connectivityPrice;
      const cartItem = {
        id: state.configurator.product.id,
        name: state.configurator.product.name,
        finish: state.configurator.finish,
        finishName: state.configurator.finishName,
        storage: state.configurator.storage,
        storageLabel: state.configurator.storageLabel,
        connectivity: state.configurator.connectivity,
        connectivityLabel: state.configurator.connectivityLabel,
        unitPrice: unitPrice,
        quantity: state.configurator.quantity,
        image: angleImages[state.configurator.activeAngle] || state.configurator.product.image
      };

      state.addToCart(cartItem);
      showToast(`Added ${state.configurator.quantity}x ${state.configurator.product.name} (${state.configurator.finishName}) to Bag`, 'success');
      openDrawer('cartDrawerOverlay');
    });
  }

  // Wishlist toggle action
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const isAdded = state.toggleWishlist(state.configurator.product);
      wishlistBtn.style.color = isAdded ? '#ff453a' : 'inherit';
      showToast(isAdded ? 'Saved Aura One Pro to your Wishlist' : 'Removed from Wishlist', isAdded ? 'success' : 'info');
    });
  }

  updatePriceCalculation();
}

/* ============================================================================
   7. INTERACTIVE BENCHMARKS BAR GRAPH COMPONENT
   ============================================================================ */
function initBenchmarks() {
  const buttons = document.querySelectorAll('.bench-btn');
  const graph = document.getElementById('benchmarkGraph');
  if (!graph) return;

  function renderMetric(metricKey) {
    const data = BENCHMARK_METRICS[metricKey] || BENCHMARK_METRICS.neural;
    const maxVal = Math.max(...data.map(d => d.value));

    graph.innerHTML = data.map(item => {
      const percent = Math.round((item.value / maxVal) * 100);
      return `
        <div class="bench-row">
          <div class="bench-meta">
            <span style="color:${item.isAura ? '#ffffff' : 'var(--text-secondary)'}; font-weight:${item.isAura ? '600' : '400'}">${item.name}</span>
            <span style="color:${item.isAura ? 'var(--accent-blue)' : 'var(--text-tertiary)'}; font-weight:600;">${item.value} ${item.unit}</span>
          </div>
          <div class="bench-bar-track">
            <div class="bench-bar-fill ${item.isAura ? '' : 'dimmed'}" style="width:0%;" data-target-width="${percent}%"></div>
          </div>
        </div>
      `;
    }).join('');

    // Trigger bar fill animation
    setTimeout(() => {
      graph.querySelectorAll('.bench-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.targetWidth;
      });
    }, 50);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMetric(btn.dataset.metric);
    });
  });

  renderMetric('neural');
}

/* ============================================================================
   8. FULL-TEXT SEARCH OVERLAY & KEYBOARD ACCESSIBILITY
   ============================================================================ */
function initSearch() {
  const trigger = document.getElementById('searchTrigger');
  const modal = document.getElementById('searchModal');
  const backdrop = document.getElementById('searchBackdrop');
  const closeBtn = document.getElementById('searchCloseBtn');
  const input = document.getElementById('searchInput');
  const resultsArea = document.getElementById('searchResultsArea');
  const quickTags = document.getElementById('searchQuickTags');

  if (!modal || !input || !resultsArea) return;

  function openSearch() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
  }

  function closeSearch() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    input.value = '';
  }

  if (trigger) trigger.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  if (backdrop) backdrop.addEventListener('click', closeSearch);

  // Global Keyboard shortcut (/ or Cmd+K / Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    } else if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && !modal.classList.contains('active')) {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) return;
      e.preventDefault();
      openSearch();
    }
  });

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsArea.innerHTML = '<div class="search-empty-state">Type a query or select a category above to filter instantly.</div>';
      return;
    }

    const matches = PRODUCTS_DATA.filter(p => {
      return p.name.toLowerCase().includes(q) ||
             p.tagline.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             p.specs.some(s => s.toLowerCase().includes(q));
    });

    if (matches.length === 0) {
      resultsArea.innerHTML = `<div class="search-empty-state">No matching Aura products found for "${query}". Try "Photonic", "Titanium", or "Glass".</div>`;
      return;
    }

    resultsArea.innerHTML = matches.map(item => `
      <a href="#configurator" class="search-result-item" data-id="${item.id}">
        <div>
          <div class="search-res-title">${item.name}</div>
          <div class="search-res-desc">${item.tagline}</div>
        </div>
        <div class="search-res-price">From $${item.price.toLocaleString()}</div>
      </a>
    `).join('');

    // Clicking a search result item jumps to configurator
    resultsArea.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        closeSearch();
      });
    });
  }

  input.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  if (quickTags) {
    quickTags.addEventListener('click', (e) => {
      const chip = e.target.closest('.tag-chip');
      if (chip) {
        input.value = chip.dataset.search;
        performSearch(chip.dataset.search);
      }
    });
  }
}

/* ============================================================================
   9. DRAWERS (CART & WISHLIST) & DEMO CHECKOUT MODAL
   ============================================================================ */
function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (drawer) {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (drawer) {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function initDrawersAndModals() {
  // Cart Drawer
  const cartTrigger = document.getElementById('cartTrigger');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartItemsList = document.getElementById('cartItemsList');

  if (cartTrigger) cartTrigger.addEventListener('click', () => openDrawer('cartDrawerOverlay'));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => closeDrawer('cartDrawerOverlay'));
  if (cartBackdrop) cartBackdrop.addEventListener('click', () => closeDrawer('cartDrawerOverlay'));

  // Delegated cart actions (quantity plus/minus, remove)
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const minus = e.target.closest('.cart-qty-minus');
      const plus = e.target.closest('.cart-qty-plus');
      const remove = e.target.closest('.cart-remove-btn');

      if (minus) {
        const index = parseInt(minus.dataset.index, 10);
        state.updateCartQuantity(index, -1);
      } else if (plus) {
        const index = parseInt(plus.dataset.index, 10);
        state.updateCartQuantity(index, 1);
      } else if (remove) {
        const index = parseInt(remove.dataset.index, 10);
        state.removeFromCart(index);
        showToast('Item removed from Bag', 'info');
      }
    });
  }

  // Wishlist Drawer
  const wishlistTrigger = document.getElementById('wishlistTrigger');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
  const wishlistBackdrop = document.getElementById('wishlistBackdrop');
  const wishlistItemsList = document.getElementById('wishlistItemsList');

  if (wishlistTrigger) wishlistTrigger.addEventListener('click', () => openDrawer('wishlistDrawerOverlay'));
  if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', () => closeDrawer('wishlistDrawerOverlay'));
  if (wishlistBackdrop) wishlistBackdrop.addEventListener('click', () => closeDrawer('wishlistDrawerOverlay'));

  if (wishlistItemsList) {
    wishlistItemsList.addEventListener('click', (e) => {
      const moveBtn = e.target.closest('.wishlist-move-cart');
      const removeBtn = e.target.closest('.wishlist-remove-btn');

      if (moveBtn) {
        const id = moveBtn.dataset.id;
        const product = PRODUCTS_DATA.find(p => p.id === id);
        if (product) {
          state.addToCart({
            id: product.id,
            name: product.name,
            unitPrice: product.price,
            quantity: 1,
            image: product.image,
            finish: 'Titanium'
          });
          state.toggleWishlist(product);
          showToast(`Moved ${product.name} to Bag`, 'success');
        }
      } else if (removeBtn) {
        const id = removeBtn.dataset.id;
        const product = PRODUCTS_DATA.find(p => p.id === id);
        if (product) {
          state.toggleWishlist(product);
          showToast('Removed from Saved Items', 'info');
        }
      }
    });
  }

  // Demo Checkout Flow
  const checkoutBtn = document.getElementById('checkoutTriggerBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutBackdrop = document.getElementById('checkoutBackdrop');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutBody = document.getElementById('checkoutBody');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeDrawer('cartDrawerOverlay');
      if (checkoutModal) {
        checkoutModal.classList.add('active');
        checkoutModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeCheckout() {
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      checkoutModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);
  if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', closeCheckout);

  // Multi-step form submission simulation
  if (checkoutBody) {
    checkoutBody.addEventListener('submit', (e) => {
      e.preventDefault();
      const step2Badge = document.getElementById('step2Badge');
      const step3Badge = document.getElementById('step3Badge');

      if (step2Badge && !step2Badge.classList.contains('active')) {
        // Step 1 to Step 2: Payment Simulator
        step2Badge.classList.add('active');
        checkoutBody.innerHTML = `
          <div class="payment-step-view">
            <h3 class="checkout-step-title">Select Secure Payment Method</h3>
            <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
              <button type="button" class="btn btn-secondary glass-btn w-full" id="simApplePay" style="padding:1rem; font-weight:600; font-size:1.125rem;">
                Pay One-Touch Quantum Pay
              </button>
              <button type="button" class="btn btn-primary w-full" id="simCardPay" style="padding:1rem;">
                Simulate Credit Card Authorization
              </button>
            </div>
            <p class="drawer-secure-note">Simulated sandbox transaction. No real payment required.</p>
          </div>
        `;

        const completeOrder = () => {
          if (step3Badge) step3Badge.classList.add('active');
          const orderNumber = 'AURA-' + Math.floor(100000 + Math.random() * 900000);
          checkoutBody.innerHTML = `
            <div class="text-center" style="padding:1.5rem 0;">
              <div style="width:64px; height:64px; border-radius:50%; background:rgba(48,209,88,0.2); border:1px solid #30d158; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem auto;">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#30d158" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 style="font-size:1.5rem; font-weight:700; margin-bottom:0.5rem;">Order Confirmed!</h3>
              <p style="color:var(--text-secondary); font-size:0.9375rem; margin-bottom:1.25rem;">Order #${orderNumber} is scheduled for Priority White-Glove Shipment via Quantum Express.</p>
              <button type="button" class="btn btn-primary" id="finishCheckoutBtn">Back to AURA Experience</button>
            </div>
          `;
          state.clearCart();
          showToast(`Order #${orderNumber} Confirmed!`, 'success');

          const finishBtn = document.getElementById('finishCheckoutBtn');
          if (finishBtn) {
            finishBtn.addEventListener('click', closeCheckout);
          }
        };

        const applePayBtn = document.getElementById('simApplePay');
        const cardPayBtn = document.getElementById('simCardPay');
        if (applePayBtn) applePayBtn.addEventListener('click', completeOrder);
        if (cardPayBtn) cardPayBtn.addEventListener('click', completeOrder);
      }
    });
  }

  // Keynote Modal
  const ribbonTrigger = document.getElementById('ribbonKeynoteTrigger');
  const heroKeynoteBtn = document.getElementById('heroKeynoteBtn');
  const keynoteModal = document.getElementById('keynoteModal');
  const keynoteBackdrop = document.getElementById('keynoteBackdrop');
  const keynoteCloseBtn = document.getElementById('keynoteCloseBtn');
  const filmPlayBtn = document.getElementById('filmPlayBtn');

  function openKeynote() {
    if (keynoteModal) {
      keynoteModal.classList.add('active');
      keynoteModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeKeynote() {
    if (keynoteModal) {
      keynoteModal.classList.remove('active');
      keynoteModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (ribbonTrigger) ribbonTrigger.addEventListener('click', (e) => { e.preventDefault(); openKeynote(); });
  if (heroKeynoteBtn) heroKeynoteBtn.addEventListener('click', openKeynote);
  if (keynoteCloseBtn) keynoteCloseBtn.addEventListener('click', closeKeynote);
  if (keynoteBackdrop) keynoteBackdrop.addEventListener('click', closeKeynote);
  if (filmPlayBtn) {
    filmPlayBtn.addEventListener('click', () => {
      showToast('Streaming Zurich Keynote in 4K HDR Dolby Vision', 'info');
    });
  }
}

/* ============================================================================
   10. NAVIGATION, MOBILE MENU & SCROLL LISTENERS
   ============================================================================ */
function initNavigation() {
  const globalNav = document.getElementById('globalNav');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileConfigJump = document.getElementById('mobileConfiguratorJump');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (globalNav) {
      globalNav.classList.toggle('scrolled', window.scrollY > 20);
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileOverlay.classList.toggle('active', isOpen);
      mobileOverlay.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.classList.remove('active');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    if (mobileConfigJump) {
      mobileConfigJump.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.classList.remove('active');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        window.location.hash = '#configurator';
      });
    }
  }
}

/* ============================================================================
   11. INTERSECTION OBSERVER SCROLL REVEAL ENGINE
   ============================================================================ */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ============================================================================
   12. APPLICATION INITIALIZATION
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  state.updateCartBadges();
  state.updateWishlistBadges();
  state.renderCartItems();
  state.renderWishlistItems();

  initNavigation();
  initMorphButtons();
  initProductShowcase();
  initConfigurator();
  initBenchmarks();
  initSearch();
  initDrawersAndModals();
  initScrollObserver();
});
