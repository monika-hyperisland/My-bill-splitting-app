import EmptyState from "./EmptyState";

// REVIEW: The hasExpenses logic (lines 10-13) is duplicated from App.js handleDeletePerson.
// If the condition changes, both places must stay in sync. Consider a shared helper function.
export default function PersonList({
  people,
  expenses,
  selectedPerson,
  onSelect,
  onDelete,
}) {
  return (
    <div className="person-list">
      {people.length === 0 ? (
        <EmptyState message="No people added yet." />
      ) : (
        people.map((p) => {
          const hasExpenses = expenses.some((e) => {
            const sharedWith = Array.isArray(e.sharedWith) ? e.sharedWith : [];
            return e.paidBy === p._id || sharedWith.includes(p._id);
          });
          return (
            <div key={p._id} className="person-item">
              <button
                className={`addedPerson ${selectedPerson === p._id ? "selected" : ""}`}
                onClick={() =>
                  onSelect(selectedPerson === p._id ? null : p._id)
                }
              >
                {p.name}
              </button>
              {!hasExpenses && (
                <button
                  className="delete-person"
                  onClick={() => onDelete(p._id)}
                  title="Delete person"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
