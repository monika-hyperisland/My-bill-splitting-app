import { useEffect, useState } from "react";

export default function ExpenseEditForm({ expense, people, onSave, onCancel }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    paidBy: "",
    sharedWith: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      description: expense.description,
      amount: expense.amount,
      paidBy: expense.paidBy,
      sharedWith: Array.isArray(expense.sharedWith) ? expense.sharedWith : [],
    });
    setError("");
  }, [expense]);

  function toggleShare(personId) {
    setForm((prev) => ({
      ...prev,
      sharedWith: prev.sharedWith.includes(personId)
        ? prev.sharedWith.filter((id) => id !== personId)
        : [...prev.sharedWith, personId],
    }));
  }

  function handleSave() {
    setError("");

    if (!form.description.trim()) {
      setError("Please enter a description.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!form.paidBy) {
      setError("Please select who paid the expense.");
      return;
    }

    if (form.sharedWith.length === 0) {
      setError("Please select at least one shared person.");
      return;
    }

    onSave({
      ...expense,
      description: form.description.trim(),
      amount: Number(form.amount),
      paidBy: form.paidBy,
      sharedWith: form.sharedWith,
    });
  }

  return (
    <div className="expense-card">
      <input
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <select
        value={form.paidBy}
        onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
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
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
