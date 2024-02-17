import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductRoutes from "./routes/product.routes.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Mongodb Conntected Successfully...`);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  // Add other CORS options as needed
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public/images"));

app.use("/products", ProductRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
