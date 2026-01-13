# Copilot / AI agent instructions for this repository

This repository is a small React + Vite single-page app (Tailwind CSS) that showcases product listings and a minimal cart UI. The goal of these notes is to give an AI coding agent immediate, actionable context so it can make safe, consistent edits.

- **Big picture**: Vite + React app. Entry: [src/main.jsx](src/main.jsx). App-level state and UI live in [src/App.jsx](src/App.jsx). Components are in [src/components/]. Product data comes from [src/data/products.js](src/data/products.js) and can be overridden by a runtime `window.PRODUCTS` variable.

- **Build / run / debug**:
  - Install: `npm install`
  - Dev server: `npm run dev` (Vite default port, e.g. http://localhost:5173)
  - Build: `npm run build`
  - Preview build: `npm run preview`
  - Files: built site artifacts appear under `docs/` in this repo (deploy-ready static copy).

- **Project structure & important files** (examples):
  - `src/main.jsx` — wraps app with `BrowserRouter` and `ToastProvider`.
  - `src/App.jsx` — central app: cart state, selected product modal, filter logic, scroll helpers (`scrollToSection`, `scrollToProduct`) and product grid.
  - `src/data/products.js` — canonical product shape and fallback; note it uses `window.PRODUCTS` if present. When adding products, follow the existing object shape: `id`, `name`, `category`, `price`, `mrp`, `description`, `image`, `images`, `features`, `specifications`, `badges`, `rating`, `reviewCount`.
  - `src/components/ProductCard.jsx` / `src/components/Products.jsx` — examples of presentational components using Tailwind classes and `framer-motion` for animation.
  - `tailwind.config.js`, `vite.config.js` — standard Vite + Tailwind setup.

- **Conventions & patterns to preserve**:
  - Files use `.jsx` for React components; prefer functional components + hooks.
  - UI uses Tailwind utility classes in `className` strings — avoid refactoring into CSS files without a clear reason.
  - Animations use `framer-motion` patterns (see `motion` usages in `ProductCard` and `Products`). Keep animation props consistent with existing small durations and subtle transforms.
  - Icons use `lucide-react` — prefer reusing `lucide` icon components rather than importing other icon sets.
  - Global toasts: use the `ToastProvider`/`useToast()` pattern in `src/App.jsx` (call `addToast(message)` to show notifications).
  - Product DOM IDs: product cards use `id={\`product-card-${product.id}\`}` — keep this exact format if you rely on `scrollToProduct` behavior.

- **Data & integration notes**:
  - `src/data/products.js` provides a fallback dataset and supports runtime injection via `window.PRODUCTS`. Production environments may inject `window.PRODUCTS` into the page to replace the static data.
  - `firebase` is listed in `package.json` but there is no obvious firebase config in repository root — check for environment-specific files before adding Firebase code.
  - `docs/` contains a built static version of the site; changes to UI should be tested by running `npm run dev` and also by running a production preview after `npm run build`.

- **Typical edit examples** (copy/paste-ready):
  - Add a product entry (follow this shape):

```js
{
  id: 'new-sample-1',
  name: 'New Product',
  category: 'Home Inverters',
  price: '₹9,999',
  description: 'Short description',
  image: 'https://.../image.png',
  images: ['https://.../image.png'],
  features: ['Feature A', 'Feature B'],
  specifications: { Capacity: '900 VA' },
  badges: ['New'],
  rating: 4.5,
  reviewCount: 0
}
```

- **When changing behavior or layout**:
  - Update the component in `src/components/` and run `npm run dev` to validate. Use `src/App.jsx` as the integration point — it wires cart, modal, and navigation.
  - Avoid global CSS changes; prefer Tailwind utility class updates to preserve design consistency.

- **What to watch for / gotchas**:
  - `src/data/products.js` contains long arrays and duplicated sample ids — ensure new product `id` values are unique strings.
  - `scrollToProduct` relies on DOM ids and a 600ms timeout to allow layout. If you change rendering timing or lazy-loading, adjust the timeout or use `IntersectionObserver` instead.
  - No automated tests are present; validate changes locally using `npm run dev` and `npm run build` + `npm run preview`.

If any piece of this guidance is unclear or you'd like more examples (e.g., where to add Firebase hooks or how to extend product data shape), tell me which area to expand and I'll iterate. 
