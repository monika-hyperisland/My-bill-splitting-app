export default function PersonList({ people, expenses, selectedPerson, onSelect, onDelete }) {
  return (
    <div className="person-list">
      {people.map((p) => {
        const hasExpenses = expenses.some((e) => e.paidBy === p.name);
        return (
          <div key={p._id} className="person-item">
            <button className="addedPerson"
               const Name={selectedPerson === p.name ? "selected" : ""}
              onClick={() => onSelect(selectedPerson === p.name ? null : p.name)}
            >
              {p.name}
            </button>
            {!hasExpenses && (
              <button
                className="delete-person"
                onClick={() => onDelete(p._id)}
                title="Delete person"
              >
                <>Delete</>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
