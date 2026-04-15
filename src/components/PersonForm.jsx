import { useState } from "react";

// REVIEW: No duplicate name validation — users can add multiple people with the same name,
// which will cause confusion in dropdowns and balance displays.
// REVIEW: No max-length constraint on the name input. Very long names will break the layout.
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
