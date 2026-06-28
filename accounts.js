const accounts = [];

// 100+ fake accounts
for (let i = 1; i <= 120; i++) {
  accounts.push({
    account: "100000" + (7000 + i),
    password: "1234",
    name: "Customer " + i,
    balance: Math.floor(Math.random() * 50000) + 5000
  });
}

// demo special users (SAFE VERSION)
accounts.push(
  { account: "100000573092", password: "admin123", name: "Denton Admin", balance: 90000 },
  { account: "100000573178", password: "emp123", name: "Jhez Employee", balance: 60000 }
);
