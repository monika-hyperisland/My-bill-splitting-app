import { useState } from "react";

export default function PersonForm({ onAdd }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="person-form">
      <input
        type="text"
        placeholder="Add Person..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}