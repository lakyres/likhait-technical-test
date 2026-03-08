### Title: Bonus/Feature: Prevent users from logging expenses in the future

#### Description
**The Problem:**
Currently, the expense form allows a user to select any arbitrary date, including dates in the future. This breaks the logical constraint of an expense tracker—you cannot record money spent on a day that hasn't happened yet. Allowing future dates leads to cluttered data and breaks the accuracy of the calendar visualizations.

**The Solution:**
This PR introduces a robust, 3-layer defense system to prevent future dates from being entered, validated, or saved to the database.

#### Changes Made
- **HTML/UI Layer (Frontend):**
  - Added the `max` attribute to the HTML5 date input in `ExpenseForm.tsx`, calculating today's date dynamically via `new Date().toISOString().split("T")[0]`. This provides immediate visual feedback by disabling future days on the calendar picker.
- **React Validation Layer (Frontend):**
  - Updated the `validateForm` logic inside `useExpenseForm.ts` to strictly compare the selected calendar day against the local `today` object (with time zeroed out). This catches edge cases where a user manually types a future date bypassing the UI picker.
- **ActiveRecord Validation Layer (Backend):**
  - Implemented a custom `date_cannot_be_in_the_future` validator in the `Expense` model (`expense.rb`), comparing the date against Rails' time-zone-aware `Date.current`.
  - Added strict presence validations for core attributes (`description`, `amount`, `date`) ensuring absolute data integrity at the database boundary.

#### Note for Reviewer
I applied a " Defense-in-Depth " strategy here. While standard HTML validation handles 90% of user interactions, the React layer ensures complex manual inputs are caught cleanly, and the final Rails backend validation guarantees that malicious or broken API calls cannot pollute the database with future timestamps.
