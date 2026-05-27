document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', function(){
    nav.classList.toggle('open');
    if(nav.classList.contains('open')){
      nav.querySelector('ul').style.display = 'flex';
    } else {
      nav.querySelector('ul').style.display = '';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Cart interactions
  const cartCountEl = document.getElementById('cart-count');
  let cartCount = 0;
  function updateCart(n){
    cartCount = n;
    cartCountEl.textContent = cartCount;
  }

  document.querySelectorAll('.add-cart').forEach(btn=>{
    btn.addEventListener('click', function(){
      // read product info from DOM
      const id = this.dataset.id || this.closest('.product-card')?.dataset.id;
      const price = parseFloat(this.dataset.price || this.closest('.product-card')?.querySelector('.price')?.textContent.replace(/[^0-9.]/g,'')) || 0;
      const name = this.closest('.product-card')?.querySelector('h3')?.textContent || 'Product';
      const img = this.closest('.product-card')?.querySelector('img')?.getAttribute('src') || '';
      addToCart({id,name,price,img,quantity:1});
      // little feedback
      const msg = document.createElement('div');
      msg.className = 'toast';
      msg.textContent = 'Added to cart';
      document.body.appendChild(msg);
      setTimeout(()=> msg.classList.add('visible'), 10);
      setTimeout(()=>{ msg.classList.remove('visible'); setTimeout(()=>msg.remove(),300); }, 1800);
    });
  });
});

// Minimal styles for toast (injected so no CSS change required)
;(function(){
  const style = document.createElement('style');
  style.textContent = `.toast{position:fixed;right:18px;bottom:18px;background:#111;color:#fff;padding:10px 14px;border-radius:10px;opacity:0;transform:translateY(8px);transition:all .25s ease} .toast.visible{opacity:1;transform:translateY(0)} `;
  document.head.appendChild(style);
})();

/* Cart persistence and drawer UI */
(function(){
  const STORAGE_KEY = 'ai-shop-cart';
  let cart = [];

  function loadCart(){
    try{ cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }catch(e){ cart = [] }
    renderCart();
  }

  function saveCart(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }

  function addToCart(item){
    const existing = cart.find(i=>i.id === item.id);
    if(existing){ existing.quantity += item.quantity; }
    else cart.push(Object.assign({},item));
    saveCart();
    renderCart();
    updateCartCount();
    openCart();
  }

  function removeFromCart(id){ cart = cart.filter(i=>i.id !== id); saveCart(); renderCart(); updateCartCount(); }

  function clearCart(){ cart = []; saveCart(); renderCart(); updateCartCount(); }

  function getTotal(){ return cart.reduce((s,i)=> s + (i.price * (i.quantity||1)), 0); }

  function updateCartCount(){ const el = document.getElementById('cart-count'); el && (el.textContent = cart.reduce((s,i)=>s + (i.quantity||1), 0)); }

  function renderCart(){
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    container.innerHTML = '';
    if(!cart.length){ container.innerHTML = '<p class="empty">Your cart is empty</p>'; totalEl.textContent = '$0'; return; }
    cart.forEach(item=>{
      const row = document.createElement('div'); row.className = 'cart-item';
      row.innerHTML = `<img src="${item.img}" alt="${item.name}"><div class="meta"><h4>${item.name}</h4><div class="qty">${item.quantity} × $${item.price}</div></div><div><button class="remove" data-id="${item.id}">Remove</button></div>`;
      container.appendChild(row);
    });
    totalEl.textContent = `$${getTotal().toFixed(2)}`;
    // attach removes
    container.querySelectorAll('.remove').forEach(btn=> btn.addEventListener('click', ()=> removeFromCart(btn.dataset.id)));
  }

  function openCart(){ const drawer = document.getElementById('cart-drawer'); drawer && drawer.classList.add('open'); drawer && drawer.setAttribute('aria-hidden','false'); }
  function closeCart(){ const drawer = document.getElementById('cart-drawer'); drawer && drawer.classList.remove('open'); drawer && drawer.setAttribute('aria-hidden','true'); }

  document.addEventListener('DOMContentLoaded', function(){
    loadCart();
    updateCartCount();
    const cartBtn = document.getElementById('cart-btn');
    const cartClose = document.getElementById('cart-close');
    const clearBtn = document.getElementById('clear-cart');
    const checkout = document.getElementById('checkout-btn');
    cartBtn && cartBtn.addEventListener('click', openCart);
    cartClose && cartClose.addEventListener('click', closeCart);
    clearBtn && clearBtn.addEventListener('click', ()=>{ clearCart(); });
    checkout && checkout.addEventListener('click', ()=>{
      alert('Checkout is a demo. Implement real checkout to process orders.');
      clearCart();
      closeCart();
    });
  });

  // expose for other functions
  window.__aiShop = { addToCart, loadCart };

})();
