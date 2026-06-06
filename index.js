require("dotenv").config();

const express = require("express");
const cors = require("cors");
const api = require("./config/prisma");

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});