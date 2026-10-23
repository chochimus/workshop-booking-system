import express from 'express';
import { initializeData } from './sessions.js';
import sessionsRouter from './sessionsRouter.js'; 

const app = express();
const port = 3000;
await initializeData();
app.use(express.json());

app.use('/api/sessions', sessionsRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});