// Play sound
function playSound() {
  const audio = document.querySelector("#hover-audio");
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(err => console.warn("Audio playback failed:", err));
  }
}

function stopSound() {
  const audio = document.querySelector("#hover-audio");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

// Animate on scroll
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".one, .two, .three");

  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  }

  // Show popup if it exists
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopup = document.getElementById("close-popup");

  if (popupOverlay) {
    window.addEventListener("load", () => {
      popupOverlay.style.display = "flex";
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });
  }

  // Cart logic
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.textContent = cart.length;
  }

  function handleAddToCart(button) {
    const card = button.closest("div");
    const productContainer = card.parentElement;

    const productName = productContainer.querySelector("h3")?.innerText;
    const priceText = productContainer.querySelector("h4")?.innerText;
    const price = priceText?.replace(/[^\d]/g, '') || "0";
    const imageSrc = productContainer.querySelector("img")?.src;

    const item = {
      name: productName,
      price: parseInt(price),
      image: imageSrc
    };

    cart.push(item);
    updateCart();
    alert("Item(product) added to cart!");
  }

  function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    if (!cartContainer || !totalPriceEl) return;

    cartContainer.innerHTML = "";
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is alone!</p>";
      totalPriceEl.textContent = "0";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <div class="card h-100">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Price: RS ${item.price}</p>
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(card);
    });

    totalPriceEl.textContent = total;
  }

  function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    renderCart();
  }

  function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
      cart = [];
      updateCart();
      renderCart();
    }
  }


  // Setup Add to Cart buttons
  document.querySelectorAll("a").forEach(link => {
    if (link.textContent.toLowerCase().includes("add to cart")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        handleAddToCart(link);
      });
    }
  });

  updateCartCount();
  renderCart(); // Only renders if you're on cart.html

  // Expose cart functions to global if needed
  window.removeItem = removeItem;
  window.clearCart = clearCart;
  window.checkout = checkout;
});



