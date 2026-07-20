# Exclusive — E-Commerce Website

A React rebuild of the "Exclusive" e-commerce Figma design, built as the Stage 6 promotion
task for **Advanced Component Patterns**. Alongside matching the design screen-for-screen,
the app is built to demonstrably use a custom hook, a Higher-Order Component, and a render
prop component as real, load-bearing parts of the app — not demo code bolted on the side.

## Links

- GitHub: _add your repo link here_
- Live demo (Vercel): _add your deployed link here_

---

## Approach

The task brief had two halves that had to work together, not separately: (1) rebuild the
Figma screens with working sign-up/login, cart, and state management, and (2) prove out
three specific advanced patterns inside that same app. So instead of designing the patterns
first and retrofitting screens around them, I worked outward from the real e-commerce flows
already in the design and let the patterns fall out of genuine duplication points:

1. **Sign Up and Log In both need Firebase calls and both need form validation** →
   that duplication is exactly what a custom hook is for, so `useAuth` and `useForm` exist.
2. **Cart, Wishlist, Account, and Checkout all need to check "is someone logged in?"** →
   that's the textbook case for a Higher-Order Component, so `withAuth` wraps all four.
3. **The wishlist heart and the account dropdown are both "just an on/off boolean with
   different UI"** → that's a render prop, so `Toggle` powers both.

Build order followed the same logic: routing skeleton → Redux store → the two hooks → the
HOC → the render prop → then the individual screens, each pulling from the same shared
pieces instead of reimplementing them. That ordering matters for this brief specifically,
because the common pitfalls it calls out (Firebase called directly in components, two
separate validators, manual auth checks per page, a heart icon that's a one-off) are all
things that only happen when screens get built before the shared logic does.

## Project structure

```
src/
├── app/store.js                  Redux Toolkit store (auth, cart, wishlist, products)
├── features/*/*.js               One slice per domain, with memoized selectors
├── hooks/
│   ├── useAuth.js                ALL Firebase auth logic — no JSX
│   ├── useForm.js                Shared form state + validation, used by every form
│   ├── useFetch.js               URL-gated fetch hook
│   └── useCountdown.js           Ticking countdown, used by two different banners
├── hocs/withAuth.jsx             Route guard for Cart / Wishlist / Account / Checkout
├── components/
│   ├── Toggle.jsx                Render-prop on/off component
│   ├── AccountDropdown.jsx       Toggle usage site #2
│   ├── ProductCard.jsx           Toggle usage site #1 (wishlist heart)
│   ├── AssetImage.jsx            <img> with graceful fallback while assets are pending
│   └── Navbar.jsx / Footer.jsx / CategorySidebar.jsx
├── constants/icons.js            Single source of truth for every icon file path
├── data/mockProducts.js          Product catalog matching the Figma product names/prices
├── firebase/config.js            Firebase app + auth initialization
└── pages/*.jsx                   One file per screen
```

## How the three required patterns are load-bearing

### 1. Custom Hooks

- **`useAuth`** is the only file that imports from `firebase/auth`. It returns
  `{ user, signUp, logIn, logOut, loading, error }`, keeps Redux's `auth` slice in sync via
  `onAuthStateChanged`, and contains no JSX. Both `SignUpPage` and `LoginPage` call it —
  neither talks to Firebase directly.
- **`useForm`** is shared by Sign Up, Log In, Checkout, Contact, and the Account profile
  form. Each screen only supplies a `validationRules` object built from shared `rules`
  helpers (`required`, `email`, `password`, `matchesField`, `compose`) — there is exactly
  one implementation of "how a form validates," not one per screen.

### 2. Higher-Order Component

- **`withAuth`** wraps `CartPage`, `WishlistPage`, `AccountPage`, and `CheckoutPage`. Each
  exports `withAuth(ComponentName)` instead of checking `user` internally, forwards all
  props with `{...props}`, and is named `WithAuth(ComponentName)` for DevTools.

### 3. Render Prop Component

- **`Toggle`** holds only an `on` boolean and a `toggle` function — no opinions about hearts
  or dropdowns. Used in two unrelated places: the filled/outline wishlist heart on
  `ProductCard` / `ProductDetailsPage`, and the expanded/collapsed state of the Navbar's
  account dropdown.

## Core requirements

- **Firebase Email/Password auth**, chosen because the Figma Sign Up / Log In screens use
  email + password fields specifically.
- **On successful sign up → redirect to Login**, handled in `SignUpPage`'s submit handler.
- **React Router** for all navigation; **Redux Toolkit** for global state (`auth`, `cart`,
  `wishlist`, `products` slices).
- **Form validation** matches the Figma spec (required fields, email format, password rules)
  via the shared `useForm` + `rules` combination.
- **Responsive layout** using Tailwind's breakpoint utilities throughout.

## Images and icons

The design's images/icons aren't baked into the repo as binary assets yet. Instead, every
image goes through a shared `AssetImage` component: it renders the real file if it exists at
the given path, and falls back to a placeholder if it doesn't — so every screen already
references its final image path, and nothing needs to change once real files are dropped
into `public/images/...`. The exact expected path for every image and icon is documented in
`ASSETS_NEEDED.md`.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Firebase config — see below
npm run dev
```

### Firebase setup

1. Create a project at https://console.firebase.google.com (free Spark plan is enough).
2. Build → Authentication → Sign-in method → enable **Email/Password**.
3. Project settings → General → Your apps → add a **Web app** → copy the config values.
4. Paste them into `.env` (already gitignored — never commit real keys).

## Known simplifications

- Product catalog is local mock data, not Firestore — the brief only requires Firebase for
  _auth_, not the catalog.
- Checkout's "Place Order" clears the cart and redirects home rather than writing an order
  document.
- Account page's "Save Changes" validates but doesn't yet call Firebase's
  `updateProfile()`/`updatePassword()` to persist changes.
- The coupon code field on Cart/Checkout is inert, matching the static demo behavior implied
  by the design.
