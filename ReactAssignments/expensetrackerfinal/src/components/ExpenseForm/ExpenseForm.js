import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";

function ExpenseForm(props) {
  const { addExpense, indexToEdit, isEditing, setIsEditing } = props;
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (isEditing) {
      expenseTextInput.current.focus();
      expenseTextInput.current.value = localStorage.getItem("text");
      expenseAmountInput.current.value = localStorage.getItem("amount");
    }
  }, [isEditing]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      setIsEditing(false);
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: new Date().getTime()
    };

    if (isEditing) {
      addExpense(expense, indexToEdit);
    } else {
      addExpense(expense);
    }

    localStorage.removeItem("text");
    localStorage.removeItem("amount");
    setIsEditing(false);
    clearInput();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{isEditing ? "Edit" : "Add new"} transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {isEditing ? "Edit" : "Add"} Transaction
      </button>
    </form>
  );
};

export default ExpenseForm;