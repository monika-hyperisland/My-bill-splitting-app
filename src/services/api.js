// REVIEW: Hardcoded API key will expire and is exposed in source code.
// Move this to an environment variable (e.g. REACT_APP_API_URL) and read via process.env.
// REVIEW: Constant naming convention — should be BASE_URL (all uppercase) per JS conventions.
export const Base_URL =
  "https://crudcrud.com/api/e47e1fdea5c24c68b32baf80d7d612b9";

// REVIEW: No error handling on any fetch call in this file. If the API returns a non-2xx status,
// res.json() may throw or return unexpected data. Check res.ok before parsing, and add .catch()
// handlers so callers can react to failures.
export function getPeople() {
  return fetch(`${Base_URL}/people`).then((res) => res.json());
}

export function addPerson(person) {
  return fetch(`${Base_URL}/people`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  }).then((res) => res.json());
}

export function deletePerson(id) {
  return fetch(`${Base_URL}/people/${id}`, { method: "DELETE" });
}

export function getExpenses() {
  return fetch(`${Base_URL}/expenses`).then((res) => res.json());
}

export function addExpense(expense) {
  return fetch(`${Base_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  }).then((res) => res.json());
}

export function deleteExpense(id) {
  return fetch(`${Base_URL}/expenses/${id}`, {
    method: "DELETE",
  });
}

// REVIEW: updateExpense doesn't return parsed JSON (unlike addExpense/addPerson), so the caller
// has no way to confirm what the server actually saved. Add .then(res => res.json()) for consistency.
// REVIEW: Inconsistent indentation — the destructuring line is indented with 4 spaces while the
// rest of the file uses 2 spaces.
export function updateExpense(id, expense) {
  const { _id, ...expenseWithoutId } = expense;

  return fetch(`${Base_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenseWithoutId),
  });
}
