import { useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [expenseDetail, setExpenseDetail] = useState({ text: "", amount: "" });

  const { handleAdd } = props;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Logic to add expense here
    handleAdd(expenseDetail.text, expenseDetail.amount);
    setExpenseDetail({text: "", amount: ""})
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>Add new transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        value={expenseDetail.text}
        onChange={(e) => setExpenseDetail({ text: e.target.value, amount: expenseDetail.amount })}
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        value={expenseDetail.amount}
        onChange={(e) => setExpenseDetail({ text: expenseDetail.text, amount: e.target.value })}
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        required
      />
      <button className={styles.submitBtn}>Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;
