import calculateBalances from "../utils/calculateBalances";
import EmptyState from "./EmptyState";

export default function BalanceSummary({ people, expenses, selectedPerson }) {
  const balances = calculateBalances(people, expenses);

  return (
    <div className="panel">
      <h3 className="section-title">Balances</h3>

      <div className="balance">
        {people.length === 0 ? (
          <EmptyState message="No people yet." />
        ) : expenses.length === 0 ? (
          <EmptyState message="No expenses recorded yet." />
        ) : null}

        {people.map((p) => {
          const value = balances[p._id] || 0;

          return (
            <p
              key={p._id}
              className={
                `${
                  value > 0
                    ? "positive"
                    : value < 0
                    ? "negative"
                    : "neutral"
                }${selectedPerson === p._id ? " selected-balance" : ""}`
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