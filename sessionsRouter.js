import express from 'express';
import {
  handleGetSessions,
  handlePostSession,
  handleGetSession,
  handlePatchSession,
  handleDeleteSession
} from './sessionsHandler.js';
import {
  handlePostBooking,
  handleGetBookings
} from './bookingsHandler.js';

const sessionsRouter = express.Router();

sessionsRouter
  .route('/')
  .get(handleGetSessions)
  .post(handlePostSession);

sessionsRouter
  .route('/:id')
  .get(handleGetSession)
  .patch(handlePatchSession)
  .delete(handleDeleteSession);

const sessionBookingRouter = express.Router({mergeParams: true});
sessionBookingRouter
  .route('/')
  .post(handlePostBooking)
  .get(handleGetBookings)

sessionsRouter.use('/:id/bookings', sessionBookingRouter);

export default sessionsRouter;