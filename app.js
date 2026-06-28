let user = JSON.parse(localStorage.getItem("user"));

if(!user){
  window.location.href = "index.html";
}

document.getElementById("name").innerText = "Welcome " + user.name;
document.getElementById("balance").innerText = "Balance ₱" + user.balance;

function update(){
  document.getElementById("balance").innerText = "Balance ₱" + user.balance;
  localStorage.setItem("user", JSON.stringify(user));
}

function cashIn(){
  const amt = Number(prompt("Cash In:"));
  user.balance += amt;

  addTx("Cash In", amt, user.balance);

  update();
  render();
  updateChart();
}

function withdraw(){
  const amt = Number(prompt("Withdraw:"));
  if(amt > user.balance) return alert("Insufficient balance");

  user.balance -= amt;

  addTx("Withdraw", amt, user.balance);

  update();
  render();
  updateChart();
}

function logout(){
  localStorage.removeItem("user");
  location.href = "index.html";
}

function render(){
  document.getElementById("tx").innerHTML =
    transactions.slice(-5).reverse().map(t =>
      `<li>${t.type} - ₱${t.amount}<br>${t.date} ${t.time}</li>`
    ).join("");
}

/* MONTHLY GRAPH */
let chart = new Chart(document.getElementById("chart"), {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Monthly Spending",
      data: [1000,2000,1500,3000,2500,4000],
      borderColor: "#10b981"
    }]
  }
});

function updateChart(){
  chart.data.datasets[0].data = chart.data.datasets[0].data.map(v =>
    v + Math.random()*300
  );
  chart.update();
}
