import { template } from "@babel/core";
import React from "react";
import HistoryListItem from "./HistoryListItem";

export default function HistoryList({ numberArray, deleteItem }) {
    return (
        <div className="historyWrapper">
            <h3>History</h3>
            <hr />
            <div className="history">
                {numberArray.map(item => (
                    <HistoryListItem
                        item={item}
                        key={item.id}
                        deleteItem={deleteItem}
                    />
                ))}
            </div>
        </div>
    );
}
