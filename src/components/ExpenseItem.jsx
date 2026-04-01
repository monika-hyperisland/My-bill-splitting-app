export default function ExpenseItem({ expense, people, onDelete, onEdit }) {
  const paidByPerson = people.find((p) => p._id === expense.paidBy);

  function computeDebts(expense) {
    if (!expense.sharedWith || expense.sharedWith.length === 0) return [];
    const splitAmount = expense.amount / expense.sharedWith.length;

    return expense.sharedWith
      .filter((id) => id !== expense.paidBy)
      .map((id) => {
        const person = people.find((p) => p._id === id);
        if (!person || !paidByPerson) return null;
        return `${person.name} owes ${paidByPerson.name} €${splitAmount.toFixed(2)}`;
      })
      .filter(Boolean);
  }

  return (
    <div className="expense-item">
      <span className="expense-title">{expense.description}</span>

      <span className="expense-amount">
        Spent : €{expense.amount.toFixed(2)}
      </span>

      {computeDebts(expense).map((line, idx) => (
        <span key={idx} className="expense-owes">
          {line}
        </span>
      ))}

      <span className="expense-paid-by">
        Paid by: {paidByPerson ? paidByPerson.name : "Unknown"}
      </span>

      <div className="expense-actions">
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button className="delete-person" onClick={() => onDelete(expense._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}