import { useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function expenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [action.newExpense, ...state];
    
    case "Delete":
      return state.filter((expense)=> expense.id !== action.id);

    default:
      return [];
  }
}

function App() {
  const [expenses, dispatchExpenses] = useReducer(expenseReducer, []);

  function addExpense(expense) {
    dispatchExpenses({type: "Add", newExpense: expense});
  }

  function deleteExpense(id) {
    dispatchExpenses({type: "Delete", id: id});
  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense}/>
        </div>
      </div>
    </>
  );
}

export default App;
