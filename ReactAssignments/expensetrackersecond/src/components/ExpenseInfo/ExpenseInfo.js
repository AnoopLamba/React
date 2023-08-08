import React, { useEffect, useState } from "react";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = (props) => {
  const { expenses } = props;
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    let p = 0;
    let l = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].amount > 0) {
        p += parseInt(expenses[i].amount);
      } else {
        l += parseInt(expenses[i].amount);
      }
    };
    setTotal(p+l);
    setProfit(p);
    setLoss(l);
  }, [expenses, setLoss, setProfit, setTotal]);

  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>${total}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +${profit}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -${loss}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInfo;
