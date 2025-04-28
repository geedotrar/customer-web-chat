import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/lead.js';
import chatRoutes from './routes/chatBot.js';
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', leadRoutes);
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  