import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(morgan("div"));
app.use('/api/auth',authRouter)

export default app