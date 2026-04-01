
# Expense Splitter

Expense Splitter is a modern React app for tracking shared expenses, splitting costs, and showing each person’s balance. It is designed for scalability, maintainability, and a polished user experience.


## Overview

Expense Splitter helps groups manage shared spending by adding people, logging expenses, and calculating who owes what. The app is built with React using a modular, component-driven structure and thoughtful state management.


## Features

- Add and remove people involved in expenses
- Add, edit, and delete expenses with labels, amounts, and payer selection
- View an expense list with clear entries and inline editing
- Display a summary of total balances for every person
- Track who owes money and who should be reimbursed
- Highlight selected people and scroll to balances for better UX
- Responsive design and clear visual hierarchy
- Handles empty states and validation gracefully


## Built With

- React (functional components, hooks)
- JavaScript (ES6+)
- CSS (responsive, accessible)


## Project Structure
- `src/App.js` – main application layout, state management, and selection logic
- `src/components/BalanceSummary.jsx` – balance summary display, highlights selected person
- `src/components/ExpenseForm.jsx` – form for creating expenses with validation
- `src/components/ExpenseEditForm.jsx` – inline editing of expenses with validation
- `src/components/ExpenseItem.jsx` – individual expense row, uses utility logic
- `src/components/ExpenseList.jsx` – list of expense entries, manages editing state
- `src/components/PersonForm.jsx` – form for adding people with validation
- `src/components/PersonList.jsx` – list of people, selection logic
- `src/components/EmptyState.jsx` – reusable empty state messaging
- `src/services/api.js` – helper logic for expense and person operations
- `src/utils/calculateBalances.js` – balance calculation logic
- `src/utils/buildDebtLines.js` – debt summary logic


## Scalability & Maintainability

- Components are modular and focused on a single responsibility
- Utility files separate business logic from UI
- Easy to add new features or extend existing ones
- Code is readable and well-structured for other developers

## Validation & User Experience

- All forms include required field validation and error handling
- Empty lists and edge cases are handled with a reusable `EmptyState` component
- UI is responsive, accessible, and user-focused
- Smooth interactions: selection, editing, and scrolling are intuitive

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm


### Installation

```bash
npm install
```


### Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

You can use the deployed app here:

[https://my-bill-splitting-app.vercel.app/](https://my-bill-splitting-app.vercel.app/)


## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production into the `build` folder.

### `npm run eject`

Removes the Create React App build dependency and copies all configuration files into the project.


## Notes
- You can view the app live at https://my-bill-splitting-app.vercel.app

- The app uses a hosted REST endpoint (`crudcrud.com`) via `src/services/api.js`
- Data persistence depends on the external endpoint token and may reset when the token expires

- You can replace this with your own backend/API for stable long-term storage
