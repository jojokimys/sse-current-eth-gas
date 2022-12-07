const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ethers = require("ethers");

const app = express();
const port = 3001;
app.use(cors());

const currentGasFee = async () => {
  const provider = new ethers.providers.EtherscanProvider("mainnet", process.env.ETHERSCAN_KEY || "");
  try {
    return (await provider.getGasPrice()).toNumber();
  } catch (e) {
    return -1000000000;
  }
};

app.get("/gas", (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  setInterval(async function () {
    const gas = await currentGasFee();
    res.write("data: " + gas + "\n\n");
  }, 3000);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
