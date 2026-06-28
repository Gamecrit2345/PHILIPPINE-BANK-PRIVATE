let transactions = JSON.parse(localStorage.getItem("tx")) || [];

function addTx(type, amount, balanceAfter) {
  const now = new Date();

  const tx = {
    id: "TX-" + Date.now(),
    type,
    amount,
    balanceAfter,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

  transactions.push(tx);
  localStorage.setItem("tx", JSON.stringify(transactions));
}
