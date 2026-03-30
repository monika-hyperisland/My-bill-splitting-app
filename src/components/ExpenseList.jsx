import { useState } from "react";

export default function ExpenseList({
  expenses,
  people,
  onDelete,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    paidBy: "",
    sharedWith: [],
  });

  function startEdit(expense) {
    setEditingId(expense._id);
    setForm({
      description: expense.description,
      amount: expense.amount,
      paidBy: expense.paidBy,
      sharedWith: expense.sharedWith || [],
    });
  }

  function toggleShare(personId) {
    setForm((prev) => ({
      ...prev,
      sharedWith: prev.sharedWith.includes(personId)
        ? prev.sharedWith.filter((id) => id !== personId)
        : [...prev.sharedWith, personId],
    }));
  }

  function saveEdit(expense) {
    onUpdate({
      ...expense,
      description: form.description,
      amount: Number(form.amount),
      paidBy: form.paidBy,
      sharedWith: form.sharedWith,
    });
    setEditingId(null);
  }

    function computeDebts(expense) {
    if (!expense.sharedWith || expense.sharedWith.length === 0) return [];
    const splitAmount = expense.amount / expense.sharedWith.length;
    return expense.sharedWith
      .filter((id) => id !== expense.paidBy)
      .map((id) => {
        const person = people.find((p) => p._id === id);
        const payer = people.find((p) => p._id === expense.paidBy);
        if (!person || !payer) return null;
        return `${person.name} owes ${payer.name} €${splitAmount.toFixed(2)}`;
      })
      .filter(Boolean);
  }

  return (
    <div>
      <h3>Pending Payment</h3>
      {expenses.length === 0 && <p>No expenses yet</p>}
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-card">
          {editingId === expense._id ? (
            <>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />
              <select
                value={form.paidBy}
                onChange={(e) =>
                  setForm({ ...form, paidBy: e.target.value })
                }
              >
                <option value="">Paid by...</option>
                {people.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
<fieldset>
  <legend>Shared with</legend>
  {people.map((p) => (
    <label key={p._id} className="shared-with-item">
      <input
        type="checkbox"
        checked={form.sharedWith.includes(p._id)}
        onChange={() => toggleShare(p._id)}
      />
      <span>{p.name}</span>
    </label>
  ))}
</fieldset>
              <button onClick={() => saveEdit(expense)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <strong>Spent for {expense.description} </strong> €{expense.amount}
              <br />
              {computeDebts(expense).map((line, idx) => (
                <span key={idx}>{line}<br/></span>
              ))}
              <button onClick={() => startEdit(expense)}>Edit</button>
              <button onClick={() => onDelete(expense._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}