import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});
