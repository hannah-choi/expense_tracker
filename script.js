const $balance = document.querySelector(".balance");
const $expense = document.querySelector(".expense");
const $income = document.querySelector(".income");
const $history = document.querySelector(".history");
const form = document.getElementById("form");
let expenseList = null;

const getID = () => {
    return Math.floor(Math.random() * 1000000000);
};

let numberArray = [];

const formatNumber = amount => {
    return amount >= 0
        ? `£${Math.abs(amount).toFixed(2)}`
        : `-£${Math.abs(amount).toFixed(2)}`;
};

//update total, expense, income
const updateNumbers = () => {
    const amounts = numberArray.map(item => item.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    $income.innerText = formatNumber(income);
    $expense.innerText = `£${Math.abs(expense).toFixed(2)}`;
    $balance.innerText = formatNumber(total);
};

//when click the x button on each item on the list
const deleteItem = index => {
    numberArray = numberArray.filter(item => item.id !== index);
    init();
};

//when add item on the list
const addItemToList = target => {
    const amount = +target.amount.value;
    numberArray.push({ text: target.text.value, amount: amount, id: getID() });
    init();
    form.reset();
};

const updateUI = () => {
    expenseList = numberArray.map(
        item => `<li class="historyItem plus">
        <span class="${
            item.amount < 0 ? "itemColor plus" : "itemColor minus"
        }"></span><span class="itemName">${item.text}</span
    ><span class="amountValue">${
        item.amount > 0 ? "+" + item.amount.toFixed(2) : item.amount.toFixed(2)
    }</span>
    <span class="delete">
    <img data-desc="deleteButton" data-index=${item.id} src="delete.svg"></span>
    </li>`
    );
    $history.innerHTML = expenseList.join("");
};

const init = () => {
    updateUI();
    updateNumbers();
    localStorage.setItem("numberArray", JSON.stringify(numberArray));
};

const load = () => {
    if (localStorage.getItem("numberArray")) {
        numberArray = JSON.parse(localStorage.getItem("numberArray"));
    }
};

load();
init();

$history.addEventListener("click", ({ target }) => {
    if (target.dataset.desc === "deleteButton") {
        deleteItem(+target.dataset.index);
    } else {
        return;
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();
    addItemToList(e.target);
});
