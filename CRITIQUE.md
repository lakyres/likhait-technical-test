### Bonus / Going Above and Beyond: System Critique

Thank you for the opportunity to review the codebase! During my sprint, I identified a few key areas for future optimization, architectural improvements, and security:

**1. React State Management & Over-fetching**
Currently, `ExpenseForm` manually re-fetches the dynamic categories every time it mounts. As the application scales across multiple views (Dashboards, Settings, Analytics), localized state prop-drilling will become a performance bottleneck. 
*Fix:* Moving away from localized state directly into a server-state library like TanStack Query (React Query) or Redux Toolkit will automatically cache, synchronize, and invalidate Categories and Expenses across the app, eliminating redundant network requests and the need for hard reloads.

**2. Pagination / Lazy Loading Data**
The backend `Api::ExpensesController#index` currently sends the entire month's ledger in one massive JSON response. If a user logs 500 expenses in a month, rendering them all simultaneously into the DOM will freeze the browser's main thread.
*Fix:* Implement Server-Side Pagination using a gem like `pagy` or `kaminari` on the Rails controller, alongside an Infinite Scroll or explicit pagination in React to keep the initial page load blazing fast.

**3. API Serialization & Payload Bloat**
Right now, `render json: expenses` returns the full database record, including internal Rails timestamps (`created_at`, `updated_at`) which bloats the network payload.
*Fix:* The Rails models should implement explicit serializers (e.g., `ActiveModel::Serializers`, `Jbuilder`, or Netflix's `fast_jsonapi`) to strictly control the payload, only sending the exact fields React needs.

**4. Security: Environment Variables (Addressed)**
During development, I noticed that `config/database.yml` relied on a hardcoded blank fallback for the database password. 
*Fix:* I removed the empty fallback and bundled the `dotenv-rails` gem to enforce strict environment configuration, adhering to standard Twelve-Factor App deployment methodologies.
