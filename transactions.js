let transactions = JSON.parse(localStorage.getItem("tx")) || [];

function addTransaction(type, amount, balanceAfter) {
  const now = new Date();

  transactions.push({
    id: "TX-" + Date.now(),
    type,
    amount,
    balanceAfter,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  localStorage.setItem("tx", JSON.stringify(transactions));
}
