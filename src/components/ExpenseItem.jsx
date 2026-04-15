import buildDebtLines from "../utils/buildDebtLines";

// REVIEW: expense.amount.toFixed(2) on line 12 will throw if amount is undefined or not a number.
// Add a type guard (e.g. Number(expense.amount).toFixed(2)) for safety.
export default function ExpenseItem({ expense, people, onDelete, onEdit }) {
  const paidByPerson = people.find((p) => p._id === expense.paidBy);
  const debtLines = buildDebtLines(expense, people);

  return (
    <div className="expense-item">
      <span className="expense-title">{expense.description}</span>

      <span className="expense-amount">
        Spent : €{expense.amount.toFixed(2)}
      </span>

      {/* REVIEW: Using array index as key (key={idx}) is an anti-pattern when the list can
          reorder or change. Use a stable identifier derived from the line content instead. */}
      {debtLines.map((line, idx) => (
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
