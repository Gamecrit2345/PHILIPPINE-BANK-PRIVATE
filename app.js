let user = JSON.parse(localStorage.getItem("user"));

if(!user){
  window.location.href = "index.html";
}

document.getElementById("name").innerText = "Welcome " + user.name;

function getKey(){
  return "tx_" + user.account;
}

function getTx(){
  return JSON.parse(localStorage.getItem(getKey())) || [];
}

function saveTx(tx){
  localStorage.setItem(getKey(), JSON.stringify(tx));
}

function update(){
  document.getElementById("balance").innerText = "₱" + user.balance;
  localStorage.setItem("user", JSON.stringify(user));
}

function addTx(type, amount, target="-"){
  let tx = getTx();

  tx.push({
    type,
    amount,
    target,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  saveTx(tx);
}

function cashIn(){
  let amt = Number(prompt("Cash In:"));
  if(!amt) return;

  user.balance += amt;

  addTx("Cash In", amt);

  update();
  render();
  chartUpdate();
}

function withdraw(){
  let amt = Number(prompt("Withdraw:"));
  if(amt > user.balance) return alert("Insufficient");

  user.balance -= amt;

  addTx("Withdraw", amt);

  update();
  render();
  chartUpdate();
}

function transfer(){
  let amt = Number(prompt("Amount:"));
  let target = prompt("GCash / Maya / KOOP:");

  if(amt > user.balance) return alert("Insufficient");

  user.balance -= amt;

  addTx("Transfer", amt, target);

  update();
  render();
  chartUpdate();
}

function render(){
  let tx = getTx();

  document.getElementById("tx").innerHTML =
    tx.slice(-5).reverse().map(t =>
      `<div class="toast">
        ${t.type} ₱${t.amount}<br>
        To: ${t.target}<br>
        <small>${t.date} ${t.time}</small>
      </div>`
    ).join("");
}

function logout(){
  localStorage.removeItem("user");
  location.href = "index.html";
}

/* CHART */
let chart = new Chart(document.getElementById("chart"), {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Monthly Spending",
      data: [2000,3000,2500,4000,3500,5000],
      borderColor: "#10b981",
      fill: true
    }]
  }
});

function chartUpdate(){
  chart.data.datasets[0].data = chart.data.datasets[0].data.map(v =>
    v + Math.random()*300
  );
  chart.update();
}

/* INIT */
update();
render();
