### Title: Feature: Dynamic Category Management

#### Description
**The Problem:**
Currently, categories are hardcoded in the frontend (`EXPENSE_CATEGORIES` constant), limiting the user's ability to customize their workspace. If a user needs a specific category that isn't provided by default, they have no way to add it, restricting the application's overall utility.

**The Solution:**
This PR introduces full-stack Category Management, allowing users to dynamically add and fetch their own personalized expense categories. 

#### Changes Made
- **API & Routing (Backend):**
  - Added a new `create` action to `Api::CategoriesController`.
  - Configured strong parameters to securely handle the `name` attribute.
  - Added proper HTTP status responses (`201 Created`, `422 Unprocessable Entity`) and propagated ActiveRecord validation errors directly to the client.
  - Updated `config/routes.rb` to expose the new endpoint.
- **Service Layer (Frontend):**
  - Implemented the `createCategory` network request in `src/services/api.ts` with error handling that surfaces the backend's validation messages.
- **User Interface (Frontend):**
  - Built a new `CategoryForm` component utilizing the `vibes` UI library.
  - Added an "Add Category" button to the `Sidebar` component.
  - Refactored `App.tsx` to handle the modal state for creating a category.
  - Refactored `ExpenseForm.tsx` to dynamically query and map its category options via `fetchCategories()` on mount, completely removing the reliance on the hardcoded constants file.

#### How to Verify
1. Log into the application and observe the newly added "Add Category" action in the sidebar navigation.
2. Click the action to open the modal and create a new category (e.g., "Software Subscriptions").
3. Proceed to add a new Expense. Click the category dropdown and verify that your newly created category is present and selectable.

#### Notes for Reviewer
**Architectural Setup & Trade-offs:**
In `App.tsx`, I kept the `CategoryForm` state localized to a simple `useState` hook. Because of how the `<Modal>` component conditionally renders (`if (!isOpen) return null;`), when a user opens the "Add Expense" form, the `<ExpenseForm>` component cleanly mounts and fires its `useEffect` to `fetchCategories()`. This naturally fetches the newly created categories without needing a hard page refresh or a global state manager.

While this is functional and clean for an assessment setup, in a production-scale application with more complex category dependencies, the optimal next step would be "Lifting State Up". By managing the `categories` array globally (via React Context, Redux, or TanStack Query) at the top of the app tree, components could consume the data directly without redundant network requests on every mount.
