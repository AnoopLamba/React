import { useState, useReducer, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [action.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== action.id)
      };
    }
    case "UPDATE_EXPENSE": {
      return {
        expenses: action.updatedExpenses
      }
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.removeItem("text");
    localStorage.removeItem("amount");
  }, []);

  const addExpense = (expense, editIndex) => {
    if (editIndex !== undefined) {
      let updatedExpenses = [...state.expenses];
      updatedExpenses[editIndex] = expense;
      dispatch({ type: "UPDATE_EXPENSE", updatedExpenses: updatedExpenses });
    } else {
      dispatch({ type: "ADD_EXPENSE", expense: expense });
    }
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", id: id });
  };

  const changeExpenseToUpdate = (id, index) => {
    const expenseToEdit = state.expenses.find((expense) => expense.id === id);
    localStorage.setItem("text", expenseToEdit.text);
    localStorage.setItem("amount", expenseToEdit.amount);
    console.log(`index: ${index}, text: ${localStorage.getItem("text")}, and amount: ${localStorage.getItem("amount")}`);
    setIsEditing(true);
    setIndexToEdit(index);
  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} indexToEdit={indexToEdit} isEditing={isEditing} setIsEditing={setIsEditing} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={changeExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;