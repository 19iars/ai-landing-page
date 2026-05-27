# AIShop — Responsive Ecommerce Landing

AIShop is a clean, colorful, responsive ecommerce-style landing page built with plain HTML, CSS, and vanilla JavaScript. It's a lightweight demo storefront showcasing a modern hero, features, product grid, and a persistent mini-cart.

---

## 🚀 Live Demo
https://19iars.github.io/ai-landing-page/

---

## ✨ Key Features
- Modern hero with CTA and promotional media
- Feature cards that explain product benefits
- Responsive product grid with sample products
- Mini cart drawer with add/remove, totals, and persistent storage (localStorage)
- Mobile-friendly navigation and smooth scrolling
- Accessible focus states and responsive breakpoints

---

## 🛠️ Tech Stack
- HTML
- CSS (custom properties + responsive grid)
- JavaScript (DOM, events, localStorage)

---

## 📁 Project Structure
```text
ai-landing-page/
├── index.html        # Main markup (header, hero, products, cart drawer)
├── style.css         # Responsive styles, variables, cart drawer styles
├── script.js         # Nav, add-to-cart, cart persistence, drawer UI
└── assets/           # Images used by the demo
```

---

## 🎯 What this demo shows
- How to structure a marketing + storefront landing page
- Small, usable cart UX without a backend (suitable for demos or prototyping)
- Techniques for responsive layout (grid, clamp(), auto-fit)
- Lightweight patterns you can adapt to Shopify or other platforms

---

## ▶️ How to run
Open `index.html` in your browser (no build step required). For local development with live reload, run a simple static server:

```bash
# Python 3
python3 -m http.server 8000

# then open http://localhost:8000
```

---

## 🔧 Next steps (optional)
- Replace sample images and product data with real assets
- Persist cart server-side or integrate with a checkout provider
- Convert product data to JSON and load dynamically
- Export Shopify-compatible snippets or a theme section (TODO)

---

If you want, I can: replace sample images, generate product JSON, or prepare a Shopify-compatible export. Tell me which and I'll implement it.

---

## 🧩 Shopify Export
This repo includes a small Shopify export under `shopify/` containing:
- `sections/ai-shop.liquid` — a section you can add to your theme's `sections/` folder.
- `snippets/product-card.liquid` — a minimal snippet to render products and provide an add-to-cart form.

See `shopify/README_SHOPIFY.md` for installation notes.
