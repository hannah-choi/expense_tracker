const $balance = document.querySelector(".balance");
const $expense = document.querySelector(".expense");
const $income = document.querySelector(".income");
const $history = document.querySelector(".history");
const form = document.getElementById("form");
let expenseList = null;
let income = 0;
let expense = 0;
let balance = 200;

let numberArray = [
    // { text: "Sauvignon blanc", amount: -7 },
    // { text: "Goat Cheese", amount: -1.5 },
];

const formatNumber = amount => {
    return `£${Math.abs(amount).toFixed(2)}`;
};

const updateDOM = () => {
    $income.innerHTML = formatNumber(income);
    $expense.innerHTML = formatNumber(expense);
    $balance.innerHTML = formatNumber(balance);

    expenseList = numberArray.map(
        (item, i) => `<li class="historyItem plus" data-index=${i}>
        <span class="${
            item.amount < 0 ? "itemColor plus" : "itemColor minus"
        }"></span><span class="itemName">${item.text}</span
    ><span class="amountValue">${
        item.amount > 0 ? "+" + item.amount.toFixed(2) : item.amount.toFixed(2)
    }</span>
    
    <span class="delete">
    <img src="delete.svg"></span>
    </li>`
    );
    $history.innerHTML = expenseList.join("");
};

const updateNumbers = () => {
    income = numberArray
        .map(item => item.amount)
        .filter(item => item > 0)
        .reduce((acc, i) => acc + i);
    expense = numberArray
        .map(item => item.amount)
        .filter(item => item < 0)
        .reduce((acc, i) => acc + i);
    balance = numberArray.map(item => item.amount).reduce((acc, i) => acc + i);

    updateDOM();
};

const addItemToList = target => {
    const amount = +target.amount.value;
    numberArray.push({ text: target.text.value, amount: amount });
    updateNumbers(amount);
    form.reset();
};

updateDOM();

form.addEventListener("submit", e => {
    e.preventDefault();
    addItemToList(e.target);
});
