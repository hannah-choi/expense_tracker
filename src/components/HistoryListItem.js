import React from "react";

export default function HistoryListItem({ item, deleteItem }) {
    return (
        <li className="historyItem plus">
            <span
                className={
                    item.amount < 0 ? "itemColor plus" : "itemColor minus"
                }
            ></span>
            <span className="itemName">{item.text}</span>
            <span className="amountValue">
                {item.amount > 0
                    ? "+" + item.amount.toFixed(2)
                    : item.amount.toFixed(2)}
            </span>
            <span className="delete">
                <img
                    data-desc="deleteButton"
                    data-index={item.id}
                    src="/delete.svg"
                    alt="delete"
                    onClick={e => deleteItem(e.target.dataset.index)}
                />
            </span>
        </li>
    );
}
