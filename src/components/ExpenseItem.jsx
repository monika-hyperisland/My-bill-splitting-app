import buildDebtLines from "../utils/buildDebtLines";

export default function ExpenseItem({ expense, people, onDelete, onEdit }) {
  const paidByPerson = people.find((p) => p._id === expense.paidBy);
  const debtLines = buildDebtLines(expense, people);

  return (
    <div className="expense-item">
      <span className="expense-title">{expense.description}</span>

      <span className="expense-amount">
        Spent : €{expense.amount.toFixed(2)}
      </span>

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