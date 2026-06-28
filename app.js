
let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "index.html";
}

document.getElementById("name").innerText = "Welcome " + user.name;

/* BALANCE DISPLAY */
function update() {
  document.getElementById("balance").innerText = "₱" + user.balance;
  localStorage.setItem("user", JSON.stringify(user));
}

/* TRANSACTION STORAGE (PER USER) */
function getKey(user) {
  return "tx_" + user.account;
}

function getTransactions(user) {
  return JSON.parse(localStorage.getItem(getKey(user))) || [];
}

function saveTransactions(user, txs) {
  localStorage.setItem(getKey(user), JSON.stringify(txs));
}

function addTransaction(type, amount, target = "-") {
  let txs = getTransactions(user);

  const now = new Date();

  txs.push({
    type,
    amount,
    target,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  });

  saveTransactions(user, txs);
}

/* CASH IN */
function cashIn() {
  let amt = Number(prompt("Cash In:"));
  if (!amt) return;

  user.balance += amt;

  addTransaction("Cash In", amt);

  update();
  renderTx();
  updateChart();
}

/* WITHDRAW */
function withdraw() {
  let amt = Number(prompt("Withdraw:"));
  if (!amt) return;

  if (amt > user.balance) {
    alert("Insufficient Balance");
    return;
  }

  user.balance -= amt;

  addTransaction("Withdraw", amt);

  update();
  renderTx();
  updateChart();
}

/* TRANSFER (GCASH / MAYA / KOOP) */
function transfer() {
  let amt = Number(prompt("Transfer amount:"));
  let target = prompt("Send to (GCash / Maya / KOOP):");

  if (!amt || !target) return;

  if (amt > user.balance) {
    alert("Insufficient Balance");
    return;
  }

  user.balance -= amt;

  addTransaction("Transfer to " + target, amt, target);

  update();
  renderTx();
  updateChart();
}

/* TRANSACTION RENDER */
function renderTx() {
  let txs = getTransactions(user);

  document.getElementById("tx").innerHTML =
    txs.slice(-5).reverse().map(t =>
      `<div class="toast">
        ${t.type} ₱${t.amount}<br>
        To: ${t.target}<br>
        <small>${t.date} ${t.time}</small>
      </div>`
    ).join("");
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("user");
  location.href = "index.html";
}

/* CHART */
let chart = new Chart(document.getElementById("chart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Monthly Spending",
      data: [2000, 3000, 2500, 4000, 3500, 5000],
      borderColor: "#10b981",
      fill: true
    }]
  }
});

function updateChart() {
  chart.data.datasets[0].data = chart.data.datasets[0].data.map(v =>
    v + Math.random() * 300
  );
  chart.update();
}

/* INIT */
update();
renderTx();
