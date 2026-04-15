import { useEffect, useMemo, useRef, useState } from "react";
import {
  getPeople,
  addPerson,
  deletePerson,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./services/api";

import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceSummary from "./components/BalanceSummary";

import "./App.css";

export default function App() {
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [feedback, setFeedback] = useState("");
  const balanceRef = useRef(null);

  // REVIEW: No .catch() on any API call in this component. If the backend is unreachable or
  // returns an error, failures are silently swallowed and the user sees no feedback.
  // REVIEW: No loading state — the UI renders immediately with empty arrays, giving no indication
  // that data is still being fetched.
  useEffect(() => {
    getPeople().then(setPeople);
    getExpenses().then(setExpenses);
  }, []);

  // REVIEW: Inconsistent indentation — this useEffect body is not indented to match the rest of the
  // component (missing 2-space indent for the inner block).
  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      setFeedback("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [feedback]);

  function handleAddPerson(name) {
    addPerson({ name }).then((newPerson) => {
      setPeople((prev) => [...prev, newPerson]);
      setFeedback("Person added");
    });
  }

  // REVIEW: The hasExpenses check is duplicated here and in PersonList.jsx. If the logic changes,
  // both locations must be updated. Extract this into a shared utility or keep it in one place only.
  function handleDeletePerson(id) {
    const hasExpenses = expenses.some((e) => {
      const sharedWith = Array.isArray(e.sharedWith) ? e.sharedWith : [];
      return e.paidBy === id || sharedWith.includes(id);
    });
    if (hasExpenses) {
      setFeedback("Cannot delete person with expenses");
      return;
    }

    deletePerson(id).then(() => {
      setPeople((prev) => prev.filter((p) => p._id !== id));
      setSelectedPerson(null);
      setFeedback("Person deleted");
    });
  }

  function handleAddExpense(expense) {
    addExpense(expense).then((newExpense) => {
      setExpenses((prev) => [...prev, newExpense]);
      setFeedback("Expense added");
    });
  }

  // REVIEW: After updateExpense(), the local state is set from the object passed by the client,
  // not the server response. If the server modifies or rejects fields, the UI will be out of sync.
  // Use the server's response body instead.
  function handleUpdateExpense(updatedExpense) {
    updateExpense(updatedExpense._id, updatedExpense).then(() => {
      setExpenses((prev) =>
        prev.map((e) => (e._id === updatedExpense._id ? updatedExpense : e)),
      );
      setFeedback("Expense updated");
    });
  }

  function handleDeleteExpense(id) {
    deleteExpense(id).then(() => {
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      setFeedback("Expense deleted");
    });
  }

  const visibleExpenses = useMemo(
    () =>
      selectedPerson
        ? expenses.filter((e) => {
            const sharedWith = Array.isArray(e.sharedWith) ? e.sharedWith : [];
            return (
              e.paidBy === selectedPerson || sharedWith.includes(selectedPerson)
            );
          })
        : expenses,
    [selectedPerson, expenses],
  );

  useEffect(() => {
    if (selectedPerson && balanceRef.current) {
      balanceRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedPerson]);

  return (
    <div className="app-container">
      <h1>Expense Splitter</h1>

      {feedback && <p className="feedback">{feedback}</p>}

      <div className="main-layout">
        <div className="panel">
          <h2>People</h2>

          <PersonForm onAdd={handleAddPerson} />

          <PersonList
            people={people}
            expenses={expenses}
            selectedPerson={selectedPerson}
            onSelect={setSelectedPerson}
            onDelete={handleDeletePerson}
          />
        </div>

        <div className="panel">
          <h2>Expenses</h2>

          <ExpenseForm people={people} onAdd={handleAddExpense} />

          <ExpenseList
            expenses={visibleExpenses}
            people={people}
            onDelete={handleDeleteExpense}
            onUpdate={handleUpdateExpense}
          />

          <div ref={balanceRef}>
            <BalanceSummary
              people={people}
              expenses={expenses}
              selectedPerson={selectedPerson}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
