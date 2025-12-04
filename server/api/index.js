import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from '../configs/mongodb.js';
import { stripeWebhooks } from '../controllers/webhooks.js';
import educatorRouter from '../routes/educatorRoutes.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
import connectCloudinay from '../configs/cloudinary.js';
import courseRouter from '../routes/courseRoute.js';
import userRouter from '../routes/userRoutes.js';
import authRouter from '../routes/authRoutes.js';

// initialize express 
const app = express();

// connect to db
let isConnected = false;

const connectToServices = async () => {
    if (!isConnected) {
        await connectDB();
        await connectCloudinay();
        isConnected = true;
    }
}

// middleware
app.use(cors({
    origin: "*",
}));

// Connect before handling requests
app.use(async (req, res, next) => {
    await connectToServices();
    next();
});

// Routes
app.get('/', (req, res) => { res.send("Edemy API is working fine!") })
app.get('/api', (req, res) => { res.send("Edemy API is working fine!") })
app.use('/api/auth', express.json(), authRouter);
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), protectRoute, userRouter);
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

export default app;
