import { useState } from "react";

export default function ExpenseForm({ people, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [sharedWith, setSharedWith] = useState([]);
  const [error, setError] = useState("");

  function toggleShare(personId) {
    setSharedWith((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid expense amount.");
      return;
    }

    if (!paidBy) {
      setError("Please choose who paid the expense.");
      return;
    }

    if (sharedWith.length === 0) {
      setError("Please select at least one person who shares this expense.");
      return;
    }

    onAdd({
      description: description.trim(),
      amount: Number(amount),
      paidBy,
      sharedWith,
    });

    setDescription("");
    setAmount("");
    setPaidBy("");
    setSharedWith([]);
  }

  const hasPeople = people.length > 0;

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add Expense</h3>

      {!hasPeople && (
        <p className="info-message">
          Add at least one person before recording expenses.
        </p>
      )}

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={!hasPeople}
      />

      {/* REVIEW: The number input allows typing negative values. Add min="0.01" and step="0.01"
          to prevent invalid amounts at the HTML level, not just on submit. */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={!hasPeople}
      />

      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        disabled={!hasPeople}
      >
        <option value="">Paid by...</option>
        {people.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* REVIEW: There's no guidance about whether the payer should also be checked in "Shared with".
          If the payer is not included, the split calculation in calculateBalances won't credit them,
          leading to incorrect balances. Consider auto-including the payer or adding a hint. */}
      <fieldset>
        <legend>Shared with</legend>
        {people.length === 0 ? (
          <p className="info-message">Add people to choose sharing options.</p>
        ) : (
          people.map((p) => (
            <label key={p._id} className="shared-with-item">
              <input
                type="checkbox"
                checked={sharedWith.includes(p._id)}
                onChange={() => toggleShare(p._id)}
              />
              <span>{p.name}</span>
            </label>
          ))
        )}
      </fieldset>

      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={!hasPeople}>
        Add Expense
      </button>
    </form>
  );
}
