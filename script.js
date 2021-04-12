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
    <img data-desc="deleteButton" data-index=${i} src="delete.svg"></span>
    </li>`
    );
    $history.innerHTML = expenseList.join("");
};

const updateNumbers = () => {
    const expenseFilter = numberArray
        .map(item => item.amount)
        .filter(item => item > 0);
    const incomeFilter = numberArray
        .map(item => item.amount)
        .filter(item => item < 0);
    income =
        expenseFilter.length > 0
            ? expenseFilter.reduce((acc, i) => acc + i)
            : 0;
    expense =
        incomeFilter.length > 0 ? incomeFilter.reduce((acc, i) => acc + i) : 0;
    balance =
        numberArray.length > 0
            ? numberArray.map(item => item.amount).reduce((acc, i) => acc + i) +
              200
            : 200;

    updateDOM();
};

const deleteItem = index => {
    numberArray.splice(index, 1);
    updateNumbers();
};

const addItemToList = target => {
    const amount = +target.amount.value;
    numberArray.push({ text: target.text.value, amount: amount });
    updateNumbers(amount);
    form.reset();
};

updateNumbers();

$history.addEventListener("click", ({ target }) => {
    if (target.dataset.desc === "deleteButton") {
        deleteItem(target.dataset.index);
    } else {
        return;
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();
    addItemToList(e.target);
});
