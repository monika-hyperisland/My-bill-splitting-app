export default function calculateBalances(people, expenses) {
  const balances = {};

  people.forEach((person) => {
    balances[person._id] = 0;
  });

  expenses.forEach((expense) => {
    const sharedWith = Array.isArray(expense.sharedWith) ? expense.sharedWith : [];
    if (sharedWith.length === 0) return;

    const splitAmount = expense.amount / sharedWith.length;

    sharedWith.forEach((personId) => {
      if (personId === expense.paidBy) {
        balances[personId] += expense.amount - splitAmount;
      } else {
        balances[personId] -= splitAmount;
      }
    });
  });

  return balances;
}
