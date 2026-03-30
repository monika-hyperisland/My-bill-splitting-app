# Expense Splitter

A React app for tracking shared expenses, splitting costs, and showing each person’s balance.

## Overview

Expense Splitter helps groups manage shared spending by adding people, logging expenses, and calculating who owes what. It is built with React and follows a simple, component-driven structure.

## Features

- Add and remove people involved in expenses
- Add expenses with labels, amounts, and payer selection
- View an expense list with each entry displayed clearly
- Display a summary of total balances for every person
- Track who owes money and who should be reimbursed

## Built With

- React
- Create React App
- JavaScript
- CSS

## Project Structure

- `src/App.js` - main application layout and state management
- `src/components/BalanceSummary.jsx` - balance summary display
- `src/components/ExpenseForm.jsx` - form for creating expenses
- `src/components/ExpenseItem.jsx` - individual expense row
- `src/components/ExpenseList.jsx` - list of expense entries
- `src/components/PersonForm.jsx` - form for adding people
- `src/components/PersonList.jsx` - list of people
- `src/services/api.js` - helper logic for expense and person operations

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

You can also view the live demo at [https://my-bill-splitting-app.vercel.app/](https://my-bill-splitting-app.vercel.app/).

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

- This app currently runs entirely in the browser.
- You can extend it later with persistence, backend storage, or user accounts.
