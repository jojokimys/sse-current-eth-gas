import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4001;
const ethers = require("ethers");

const currentGasFee = async () => {
  const provider = new ethers.providers.EtherscanProvider("mainnet", process.env.ETHERSCAN_KEY || "");
  try {
    return (await provider.getGasPrice()).toNumber();
  } catch (e) {
    return -1000000000;
  }
};

app.get("/api/gas", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  setInterval(async function () {
    const gas = await currentGasFee();
    console.log(gas);
    res.write("data: " + gas);
    res.flush();
  }, 3000);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
