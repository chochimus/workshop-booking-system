import express from 'express';
import {
  handleGetSessions,
  handlePostSession,
  handleGetSession,
  handlePatchSession,
  handleDeleteSession
} from './sessionsHandler.js';

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

export default sessionsRouter;