import express from "express";
import fetch from "node-fetch";
import fs from "fs";

const app = express();
app.use(express.json());

let count = 36;

if (fs.existsSync("count.txt")) {
  count = parseInt(fs.readFileSync("count.txt", "utf8")) || 0;
}

app.post("/log", async (req, res) => {
  const { name, id } = req.body;

  count++;
  fs.writeFileSync("count.txt", count.toString());

  await fetch("https://discord.com/api/webhooks/1458857007896592384/KYE0-NNHGwtKJGQA85AoPdtTa2hsYM-QmBcEN0H6VnKbSAG0rVSJK-lwjk7PbHj_F7qM", {
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

// ⚠️ IMPORTANT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
