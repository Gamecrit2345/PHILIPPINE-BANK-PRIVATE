const accounts = [];

// 100+ fake bank accounts
for (let i = 1; i <= 120; i++) {
  accounts.push({
    account: "100000" + (5000 + i),
    password: "1234",
    name: "Customer " + i,
    balance: Math.floor(Math.random() * 50000) + 5000
  });
}

// special demo users (safe version)
accounts.push(
  { account: "100000573092", password: "admin123", name: "Denton Admin", balance: 80000 },
  { account: "100000573178", password: "emp123", name: "Jhez Employee", balance: 50000 }
);
