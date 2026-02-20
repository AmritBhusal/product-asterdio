# Luxe — Modern E-Commerce Storefront

This is a project built as a high-performance e-commerce storefront. I used Next.js and TypeScript to keep it fast and type-safe, with Tailwind CSS handling the design. The goal was to build something that feels premium but stays simple under the hood.

## Getting Started

To get this running on your machine, just follow these steps:

1.  **Clone and Install**:
    ```bash
    git clone <repository-url>
    cd asterdio-assignment
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env.local` file in the root. You'll need these two variables:
    ```env
    BASE_URL=https://dummyjson.com
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

3.  **Run it**:
    ```bash
    npm run dev
    ```
    Head over to `http://localhost:3000` to see it in action.

---

## How the project is organized

I've tried to keep the folder structure as intuitive as possible:

*   **`app/`**: All the routing and layouts. Includes dynamic routes for product details and the new **Product Verification** system.
*   **`services/`**: API logic layer. Handles communication with DummyJSON and manages cross-environment (server/client) fetch logic.
*   **`hooks/`**: Custom hooks for business logic. `useProducts` handles search, filtering, and pagination.
*   **`context/`**: Global state management (e.g., Favorites) using React Context API.
*   **`components/`**: Modular component architecture split into `shared`, `home`, `product`, and `ui` for maximum reusability.

---

## Product Verification System

I implemented a robust product authenticity verification feature to enhance user trust:

*   **Static Guide**: A dedicated `/verification` page explains how users can verify products.
*   **Dynamic Verification**: A custom route `/product/verify/[id]/[sku]` that cross-references scanned product data with our catalog.
*   **Aesthetic Integration**: Highlighted Navbar links and integrated CTAs on product detail pages to encourage usage.

---

## Technical Decisions

*   **Native Fetch over Axios**: I decided to stick with the native Fetch API. It's built into Next.js, supports great caching out of the box, and keeps the bundle size smaller.
*   **URL-Synced States**: When you filter or search, the URL updates. This means you can refresh the page or share a link, and the exact same results will show up.
*   **State Lifting**: Instead of putting everything in a global store (like Redux), I kept the logic local to the features that actually use it. It makes the code easier to follow.

---

## What I'd add next

If I had more time to work on this, here are a few things I'd focus on:

*   **Real Checkout**: Setting up a full payment flow with partners like **Esewa** and Stripe.
*   **User Accounts**: Adding authentication so people can save their addresses, see past orders, and track verified products.
*   **Better Testing**: Adding Playwright for E2E testing of the scan-to-verify flow and Vitest for service-layer unit tests.
