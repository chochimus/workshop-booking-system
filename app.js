import express from 'express';
import { initializeData } from './sessions.js';

const app = express();
const port = 3000;
await initializeData();



app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});