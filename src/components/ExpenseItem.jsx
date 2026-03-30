export default function ExpenseItem({ expense, people, onDelete, onEdit }) {
  const paidByPerson = people.find((p) => p._id === expense.paidBy);

  return (
    <div className="expense-item">
      <span className="expense-title">{expense.description}</span>

      <span className="expense-amount">
        Spent : €{expense.amount.toFixed(2)}
      </span>

      <span className="expense-owes">
        {expense.summary}
      </span>

      <span className="expense-paid-by">
        Paid by: {paidByPerson ? paidByPerson.name : "Unknown"}
      </span>

      <div className="expense-actions">
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => onDelete(expense._id)}>Delete</button>
      </div>
    </div>
  );
}