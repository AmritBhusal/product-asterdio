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

*   **`app/`**: All the routing and layouts. I've also included some API routes here to act as a proxy for client-side calls.
*   **`services/`**: This is where all the API logic lives. It handles the communication with DummyJSON and switches between server and client calls automatically.
*   **`hooks/`**: Custom hooks to keep the components clean. `useProducts` is the main one—it handles all the search, filtering, and pagination logic.
*   **`context/`**: Used for global states like the Wishlist so you don't have to pass props through every single component.
*   **`components/`**: Split into `shared` (headers/footers), `home` (homepage specific stuff), and `ui` (reusable base components).

---

## Technical Decisions

*   **Native Fetch over Axios**: I decided to stick with the native Fetch API. It's built into Next.js, supports great caching out of the box, and keeps the bundle size smaller.
*   **URL-Synced States**: When you filter or search, the URL updates. This means you can refresh the page or share a link, and the exact same results will show up.
*   **State Lifting**: Instead of putting everything in a global store (like Redux), I kept the logic local to the features that actually use it. It makes the code easier to follow.

---

## What I'd add next

If I had more time to work on this, here are a few things I'd focus on:

*   **Real Checkout**: Setting up a full flow with payment partners like **Esewa** and others.
*   **User Accounts**: Adding authentication so people can save their addresses and see past orders.
*   **Better Testing**: I'd like to add some unit tests for the core services and maybe some E2E tests for the "Add to Cart" flow.
*   **Performance**: There's always room for more image optimization and better loading skeletons to make it feel even snappier on slow connections.
