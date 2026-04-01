export default function buildDebtLines(expense, people) {
  const paidByPerson = people.find((person) => person._id === expense.paidBy);
  if (!paidByPerson || !Array.isArray(expense.sharedWith)) return [];

  const splitAmount = expense.amount / expense.sharedWith.length;

  return expense.sharedWith
    .filter((personId) => personId !== expense.paidBy)
    .map((personId) => {
      const person = people.find((p) => p._id === personId);
      if (!person) return null;
      return `${person.name} owes ${paidByPerson.name} €${splitAmount.toFixed(2)}`;
    })
    .filter(Boolean);
}
