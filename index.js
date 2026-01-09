const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();
app.use(express.json());

let count = 0;

if (fs.existsSync("count.txt")) {
  count = parseInt(fs.readFileSync("count.txt", "utf8")) || 0;
}

app.post("/log", async (req, res) => {
  const { name, id } = req.body;

  count++;
  fs.writeFileSync("count.txt", count.toString());

  await fetch("TON_WEBHOOK_DISCORD", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
`**TRICERATOPZ LOGGER COUNTER**
Player Name: ${name}
Player ID: ${id}
Count: ${count}`
    })
  });

  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server running"));
