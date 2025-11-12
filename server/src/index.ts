import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
