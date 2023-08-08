import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = (props) => {
  const {expenses, handleRemove} = props;

  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {expenses.map((expense, index)=>(
          <Transaction key={expense.id} expense={expense} index={index} handleRemove={handleRemove}/>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
