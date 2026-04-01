import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseEditForm from "./ExpenseEditForm";

export default function ExpenseList({
  expenses,
  people,
  onDelete,
  onUpdate,
}) {
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  function startEdit(expense) {
    setEditingExpenseId(expense._id);
  }

  function saveEdit(expense) {
    onUpdate(expense);
    setEditingExpenseId(null);
  }

  return (
    <div>
      <h3>Pending Payment</h3>
      {expenses.length === 0 && <p>No expenses yet</p>}
      {expenses.map((expense) =>
        editingExpenseId === expense._id ? (
          <ExpenseEditForm
            key={expense._id}
            expense={expense}
            people={people}
            onSave={saveEdit}
            onCancel={() => setEditingExpenseId(null)}
          />
        ) : (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            people={people}
            onDelete={onDelete}
            onEdit={startEdit}
          />
        )
      )}
    </div>
  );
}