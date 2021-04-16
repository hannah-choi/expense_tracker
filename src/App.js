import "./App.css";
import { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import HistoryList from "./components/HistoryList";
import Form from "./components/Form";
import { v4 } from "uuid";

function App() {
    const savedArray = localStorage.getItem("numberArray")
        ? JSON.parse(localStorage.getItem("numberArray"))
        : [];
    const [numberArray, setNumberArray] = useState(savedArray);

    useEffect(() => {
        localStorage.setItem("numberArray", JSON.stringify(numberArray));
    }, [numberArray]);

    const deleteItem = id => {
        setNumberArray(numberArray.filter(item => item.id !== id));
    };

    const addItem = e => {
        e.preventDefault();
        setNumberArray([
            ...numberArray,
            {
                id: v4(),
                text: e.target.text.value,
                amount: +e.target.amount.value,
            },
        ]);
        e.target.reset();
    };

    return (
        <div className="wrapper">
            <h2>Expense Tracker</h2>
            <Numbers numberArray={numberArray} />
            <HistoryList numberArray={numberArray} deleteItem={deleteItem} />
            <Form addItem={addItem} />
        </div>
    );
}

export default App;
