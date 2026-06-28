let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

/* GENERATE TRANSACTION */
function addTransaction(type, amount, balanceAfter, target = "-") {
  let now = new Date();

  let tx = {
    id: "TX-" + Date.now(),
    type: type,
    amount: Number(amount),
    target: target,
    balanceAfter: balanceAfter,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

  transactions.push(tx);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

/* GET LAST TRANSACTIONS */
function getRecent(limit = 5) {
  return transactions.slice(-limit).reverse();
}

/* CLEAR ALL (optional admin tool) */
function clearTransactions() {
  transactions = [];
  localStorage.removeItem("transactions");
}
