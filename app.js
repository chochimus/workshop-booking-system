import express from 'express';
import { initializeData } from './sessions.js';
import sessionsRouter from './sessionsRouter.js';
import bookingsRouter from './bookingRouter.js';

const app = express();
const port = 3000;
await initializeData();
app.use(express.json());

app.use('/api/sessions', sessionsRouter);
app.use('/api/bookings', bookingsRouter);

app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  return res.status(statusCode).json({error: `${err.message}`});
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});