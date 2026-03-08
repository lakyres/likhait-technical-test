# Submission Guide: Pull Requests & Final Email

This document contains the finalized, professionally written Pull Request (PR) messages and the final email draft for your tech assessment. **DO NOT PUSH THIS FILE TO GITHUB.** Simply copy and paste the content into the GitHub PR forms and your email client.

---

## 1. Pull Request #1: Bug Fix (Task 1)
**Branch:** `bugfix/order-expenses-by-date`
**Title:** `Fix: Correct expense ordering and month filtering to use actual dates instead of created_at`

### Description:
#### The Problem
Users expect their expense tracker to be organized by the date the expense actually occurred. Previously, the application was sorting and filtering expenses based on the database `created_at` timestamp. This meant that historical data entered out of order would appear incorrectly in the current month's view, leading to inaccurate financial reporting.

#### The Solution
This PR refactors the `Api::ExpensesController#index` action to query against the `date` attribute instead of `created_at`. This change ensures the frontend accurately reflects the user's chronological finances across all views.

#### Key Changes
- **Primary Sort Logic**: Updated ActiveRecord ordering to `order(date: :desc, created_at: :desc)`. The `created_at` secondary fallback ensures stable sorting for multiple expenses on the same day.
- **Filtering Logic**: Replaced the `.where(created_at: ...)` range query with `.where(date: start_date..end_date)`.
- **Infrastructure Fixes**: Resolved Windows/WSL build issues by explicitly adding `@rollup/rollup-linux-x64-musl` to dependencies for environment stability.

#### How to Verify
1. Create an expense for a past month (e.g., February 2026).
2. Confirm it no longer appears in the March 2026 view.
3. Switch the calendar back to February and verify the expense appears on the correct day.

---

## 2. Pull Request #2: Feature (Task 2)
**Branch:** `feature/category-management`
**Title:** `Feature: Dynamic Category Management with Full-Stack Persistency`

### Description:
#### The Problem
The original application used a static set of categories, which limited the user's ability to track personalized expenses such as "Subscriptions" or "Medical".

#### The Solution
Implemented a full-stack Dynamic Category Management feature, allowing users to create custom categories that persist in the database and are instantly available in the expense tracker UI.

#### Key Changes
- **Backend Architecture**: Implemented `Api::CategoriesController#create` and updated Rails routes to support POST requests for new categories.
- **Frontend Components**: Developed a new `CategoryForm` React component with real-time UI updates upon successful creation.
- **State Integration**: Refactored the Sidebar and the Expense Form to fetch the latest categories dynamically via the API, removing hardcoded values.
- **Test Coverage**: Updated RSpec specs to verify dynamic category creation and ensure alphabetical sorting in the dropdown.

#### How to Verify
1. Click the "Add Category" button in the sidebar.
2. Enter a new category name (e.g., "Tech Gadgets") and save.
3. Verify the new category appears in the dropdown list when adding a new expense.

---

## 3. Pull Request #3: Bonus & Critique (Task 3 & Initiative)
**Branch:** `bonus/prevent-future-dates`
**Title:** `Bonus: Multi-Layer Date Validation and Comprehensive Infrastructure Audit`

### Description:
#### The Problem
Data integrity was at risk because the system lacked constraints against future-dated expenses. Additionally, the development setup required stabilization for local Windows/WSL2 environments.

#### The Solution (Bonus Task)
Implemented a **Defensive Programming** strategy by adding 3-layer validations to prevent future-dated expenses:
- **UI Level**: Restricted the date picker range in the browser UI.
- **Frontend Logic**: Added React-level guards during the form submission process.
- **Backend Schema**: Implemented Rails model-level validations to reject future dates at the API level.

#### Going Above and Beyond (System Audit)
- **Technical Critique**: Included a comprehensive system audit and technical critique in the `CRITIQUE.md` file located at the root of the repository.
- **Security Hardening**: Replaced hardcoded database credentials with a secure `.env` (dotenv-rails) workflow.
- **Environment Stability**: Standardized the `db/init.sql` script to support a dedicated `test` environment, ensuring automated suites are robust and all RSpec tests are 100% passing.
- **WSL & Timezone Fixes**: Patched Docker entrypoints and refined JavaScript date parsing to handle local timezone offsets, ensuring "Today's" date is correctly validated as the current day rather than a future date.
- **Code Quality**: Performed a final TypeScript audit, resolving linting errors and enforcing stricter typing in the custom `useExpenseForm` hook.
- **Clean Repository**: Final branch cleanup removing all temporary development logs and patches for a professional code review.

#### How to Verify
1. Attempt to manually enter a future date in the expense form.
2. Verify the backend returns a `422 Unprocessable Entity` error with the message: "Date can't be in the future".

---

## 4. Final Submission Email Draft
**Subject:** Technical Assessment - Expense Tracker Submission - [Kyla Marjes]

**Hi Team,**

I have successfully completed the technical assessment for the Expense Tracker application. You may review my submission through the following Pull Requests in my repository:

- **BUG FIX (Task 1):** [PASTE PR LINK 1 HERE]
- **FEATURE (Task 2):** [PASTE PR LINK 2 HERE]
- **BONUS & CRITIQUE (Task 3):** [PASTE PR LINK 3 HERE]

**Summary of Initiative:**
Beyond the core requirements, I have addressed several infrastructure, security, and build-stability gaps to ensure the project is developer-friendly and production-ready. I have also included a detailed technical critique in the `CRITIQUE.md` file located at the root directory of the project.

Thank you for your time, and I look forward to your feedback.

Best regards,

Kyla Marjes
