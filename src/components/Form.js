import React from "react";

export default function Form({ addItem }) {
    return (
        <div className="addNewWrapper">
            <h3>Add new transaction</h3>
            <hr />
            <form id="form" onSubmit={e => addItem(e)}>
                <label htmlFor="text">
                    <small>Text</small>
                </label>
                <input type="text" name="text" required />
                <label htmlFor="amount">
                    <small>Amount</small>
                </label>
                <input type="number" name="amount" required />
                <input type="submit" value="Add transaction" />
            </form>
        </div>
    );
}
