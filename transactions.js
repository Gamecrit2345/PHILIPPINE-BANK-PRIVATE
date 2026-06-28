function getKey(user){
  return "tx_" + user.account;
}

function getTransactions(user){
  return JSON.parse(localStorage.getItem(getKey(user))) || [];
}

function saveTransactions(user, txs){
  localStorage.setItem(getKey(user), JSON.stringify(txs));
}

function addTransaction(user, type, amount, target = "-"){
  let txs = getTransactions(user);

  const now = new Date();

  txs.push({
    id: "TX-" + Date.now(),
    type,
    amount,
    target,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  saveTransactions(user, txs);
}
