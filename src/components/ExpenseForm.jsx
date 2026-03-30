import { useState } from "react";

export default function ExpenseForm({ people, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [sharedWith, setSharedWith] = useState([]);

  function toggleShare(personId) {
    setSharedWith((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description || !amount || !paidBy || sharedWith.length === 0) {
      alert("All fields are required");
      return;
    }

    onAdd({
      description,
      amount: Number(amount),
      paidBy,
      sharedWith,
    });

    setDescription("");
    setAmount("");
    setPaidBy("");
    setSharedWith([]);
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} >
      <h3>Add Expense</h3>

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
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
          <label key={p._id} className ="shared-with-item">
            <input
              type="checkbox"
              checked={sharedWith.includes(p._id)}
              onChange={() => toggleShare(p._id)}
            />
            <span>{p.name}</span>
          </label>
        ))}
      </fieldset>

      <button type="submit">Add Expense</button>
    </form>
  );
}