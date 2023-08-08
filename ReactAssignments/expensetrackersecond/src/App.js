import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  // Create function to add an expense
  function handleAdd(text, amount) {
    if (parseInt(amount) !== 0) {
      setExpenses([{ text: text, amount: amount, id: new Date().getTime() }, ...expenses]);
    }
  };

  // Create function to delete an expense
  function handleRemove(id) {
    setExpenses(expenses.filter((expnese) => expnese.id !== id));
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm handleAdd={handleAdd} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} handleRemove={handleRemove} />
        </div>
      </div>
    </>
  );
}

export default App;
