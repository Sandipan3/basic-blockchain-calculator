import express from "express";
import morgan from "morgan";
import { ethers } from "ethers";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const contractAbi = [
  "function add(int a , int b) public returns (int)",
  "function subtract(int a , int b) public returns (int)",
  "function multiply(int a , int b) public returns (int)",
  "function divide(int a , int b) public returns (int)",
  "function getLastState() public  view returns (int)",
];

//blockchain connection setup
const contractAddress = process.env.CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

//api routes
app.post("/add", async (req, res) => {
  const { a, b } = req.body;
  try {
    const tx = await contract.add(a, b);
    await tx.wait();
    const lastRes = await contract.getLastState();
    return res.status(200).json({
      result: lastRes.toString(),
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});
app.post("/subtract", async (req, res) => {
  const { a, b } = req.body;
  try {
    const tx = await contract.subtract(a, b);
    await tx.wait();
    const lastRes = await contract.getLastState();

    return res.status(200).json({
      result: lastRes.toString(),
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});
app.post("/multiply", async (req, res) => {
  const { a, b } = req.body;
  try {
    const tx = await contract.multiply(a, b);
    await tx.wait();
    const lastRes = await contract.getLastState();
    return res.status(200).json({
      result: lastRes.toString(),
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});
app.post("/divide", async (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).json({
      error: "Can't divide by 0",
    });
  }
  try {
    const tx = await contract.divide(a, b);
    await tx.wait();
    const lastRes = await contract.getLastState();

    const decimalUnit = Number(ethers.formatUnits(lastRes, 18));
    return res.status(200).json({
      result: decimalUnit.toString(),
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
