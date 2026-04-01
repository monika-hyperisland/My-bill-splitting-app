
export const Base_URL = "https://crudcrud.com/api/e47e1fdea5c24c68b32baf80d7d612b9";

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

export function updateExpense(id, expense) {
    const { _id, ...expenseWithoutId } = expense;

  return fetch(`${Base_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenseWithoutId),
  });
}