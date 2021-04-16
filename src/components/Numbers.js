import React from "react";

export default function Numbers({ numberArray }) {
    const amounts = numberArray.map(item => item.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    return (
        <>
            <div className="balanceWrapper">
                <small>Your balance</small>
                <span className="balance">
                    {total < 0 ? `-£` : `£`}
                    {Math.abs(total).toFixed(2)}
                </span>
            </div>
            <div className="income_expenseWrapper">
                <div className="incomeDiv">
                    <small>Income</small>
                    <span className="income">
                        £{Math.abs(income).toFixed(2)}
                    </span>
                </div>
                <div className="expenseDiv">
                    <small>Expense</small>
                    <span className="expense">
                        £{Math.abs(expense).toFixed(2)}
                    </span>
                </div>
            </div>
        </>
    );
}
