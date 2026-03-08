### Bonus / Going Above and Beyond: System Critique

Thank you for the opportunity to review the codebase! During my sprint, I identified several key areas for future optimization, architectural improvements, and security. Beyond code changes, I also focused on improving the **Infrastructure and Developer Experience (DX)**.

---

### 🏛️ Architectural Improvements

**1. React State Management & Over-fetching**
Currently, `ExpenseForm` manually re-fetches dynamic categories every time it mounts. As the application scales, localized state prop-drilling will become a performance bottleneck.
*   **Recommendation:** Implementing a server-state library like **TanStack Query (React Query)** or **Redux Toolkit** would allow for automatic caching and synchronization of Categories and Expenses across the app, eliminating redundant network requests.

**2. Pagination / Lazy Loading Data**
The backend currently sends the entire month's ledger in one massive JSON response. Large datasets would eventually freeze the browser's main thread during rendering.
*   **Recommendation:** Implement Server-Side Pagination using gems like `pagy` or `kaminari`, paired with Infinite Scroll or explicit pagination in the React frontend to maintain performance.

**3. API Serialization & Payload Bloat**
The API currently returns full database records, including internal Rails timestamps, which increases payload size.
*   **Recommendation:** Use explicit serializers (e.g., `Jbuilder`, `ActiveModel::Serializers`, or `fast_jsonapi`) to strictly control the fields sent to the frontend, reducing network overhead.

---

### 🛠️ Infrastructure & Developer Experience (DX)

I took the initiative to harden the development environment and ensure a seamless "out-of-the-box" setup for other developers:

**4. Docker & WSL Compatibility (Fixed)**
The initial setup lacked dependencies for building the `psych` gem on certain Linux distributions.
*   **Fix:** Updated the `Dockerfile` to include `libyaml-dev` and normalized entrypoint execution to handle Windows CRLF line-ending conflicts, ensuring the project starts reliably on both Windows (WSL) and Linux.

**5. Port Conflict Management (Fixed)**
Mapping the database to the default `3306` can fail if a developer has a local MySQL instance running.
*   **Fix:** Mapped the host port to **`3307`**, providing a conflict-free environment while keeping the internal container architecture intact.

**6. Security: Environment Variables (Fixed)**
`config/database.yml` relied on insecure hardcoded blank fallbacks for passwords.
*   **Fix:** Bundled `dotenv-rails` and refactored the database configuration to enforce strict environment variable usage, adhering to standard **Twelve-Factor App** methodologies.

---
