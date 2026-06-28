let user = JSON.parse(localStorage.getItem("user"));

if(!user){
  window.location.href = "index.html";
}

document.getElementById("name").innerText = "Welcome " + user.name;
document.getElementById("balance").innerText = "₱" + user.balance;

function update(){
  document.getElementById("balance").innerText = "₱" + user.balance;
  localStorage.setItem("user", JSON.stringify(user));
}

function cashIn(){
  let amt = Number(prompt("Cash In:"));
  user.balance += amt;

  addTransaction("Cash In", amt, user.balance);
  update();
  renderTx();
  updateChart();
}

function withdraw(){
  let amt = Number(prompt("Withdraw:"));
  if(amt > user.balance) return alert("Insufficient Balance");

  user.balance -= amt;

  addTransaction("Withdraw", amt, user.balance);
  update();
  renderTx();
  updateChart();
}

function logout(){
  localStorage.removeItem("user");
  location.href = "index.html";
}

function renderTx(){
  document.getElementById("tx").innerHTML =
    transactions.slice(-5).reverse().map(t =>
      `<div class="toast">${t.type} ₱${t.amount} | ${t.date}</div>`
    ).join("");
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

function updateChart(){
  chart.data.datasets[0].data = chart.data.datasets[0].data.map(v =>
    v + Math.random()*400
  );
  chart.update();
}
