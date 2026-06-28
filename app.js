let user = JSON.parse(localStorage.getItem("user"));

if(!user){
  window.location.href = "index.html";
}

document.getElementById("name").innerText = "Welcome " + user.name;
document.getElementById("balance").innerText = "Balance ₱" + user.balance;

let txList = [];

function update(){
  document.getElementById("balance").innerText = "Balance ₱" + user.balance;
  localStorage.setItem("user", JSON.stringify(user));
}

function cashIn(){
  let amt = Number(prompt("Cash In:"));
  user.balance += amt;
  txList.push("Cash In +₱" + amt);
  update();
  render();
  chartUpdate();
}

function withdraw(){
  let amt = Number(prompt("Withdraw:"));
  if(amt > user.balance) return alert("Insufficient Balance");

  user.balance -= amt;
  txList.push("Withdraw -₱" + amt);
  update();
  render();
  chartUpdate();
}

function logout(){
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function render(){
  document.getElementById("tx").innerHTML =
    txList.slice(-5).map(t => `<li>${t}</li>`).join("");
}

/* MONTHLY SPENDING GRAPH */
let chart = new Chart(document.getElementById("chart"), {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Monthly Spending",
      data: [1200, 2000, 1800, 3000, 2500, 4000],
      borderColor: "#10b981",
      fill: true
    }]
  }
});

function chartUpdate(){
  chart.data.datasets[0].data = chart.data.datasets[0].data.map(
    v => v + Math.random() * 300
  );
  chart.update();
}
