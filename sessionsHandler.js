import { manager } from './sessions.js'; 

export function handleGetSessions(req, res, next) {
  try {
    const sessions = manager.getSessions();
    res.status(200).send(JSON.stringify(sessions));
  } catch (error) {
    next(error);
  }
}

export async function handlePostSession(req, res, next) {
  try {
    const sessionData = req.body;
    const session = await manager.createSession(sessionData);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
}

export function handleGetSession(req, res, next) {
  try {
    const id = req.params.id;
    const session = manager.getSession(id);
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
}

export function handlePatchSession(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const session = manager.updateSession(id, data);
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
}

export function handleDeleteSession(req, res, next) {
  try {

  } catch (error) {
    next(error);
  }
}