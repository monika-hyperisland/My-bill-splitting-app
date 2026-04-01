export default function BalanceSummary({ people, expenses }) {
  const balances = {};

  people.forEach((p) => {
    balances[p._id] = 0;
  });

  expenses.forEach((exp) => {
    const sharedWith = Array.isArray(exp.sharedWith) ? exp.sharedWith : [];
    if (sharedWith.length === 0) return;

    const splitAmount = exp.amount / sharedWith.length;

    sharedWith.forEach((personId) => {
      if (personId === exp.paidBy) {
        balances[personId] += exp.amount - splitAmount;
      } else {
        balances[personId] -= splitAmount;
      }
    });
  });

  return (
    <div className="panel">
      <h3 className="section-title">Balances</h3>

      <div className="balance">
        {people.length === 0 && <p>No people yet</p>}

        {people.map((p) => {
          const value = balances[p._id];

          return (
            <p
              key={p._id}
              className={
                value > 0
                  ? "positive"
                  : value < 0
                  ? "negative"
                  : "neutral"
              }
            >
              {p.name}: €{value.toFixed(2)}
            </p>
          );
        })}
      </div>
    </div>
  );
}