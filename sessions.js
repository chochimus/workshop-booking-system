import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

let manager;
const filePath = path.join(import.meta.dirname, 'dataStorage.json');

class SessionManager {
  constructor(sessions=[]) {
    this.sessions = sessions;
  }
  getNextSessionID() {
    return this.sessions.length === 0 ? 1 : Math.max(...this.sessions.map(session => session.id)) + 1;
  }
  getSessions() {
    return [...this.sessions];
  }
  getSession(id) {
    if (!this.isValidId(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      throw err;
    }

    const session = this.sessions.find(session => session.id === id);
    
    if (!session) {
      const err = new Error('No matching session');
      err.status = 404;
      throw err;
    }

    return session;
  }
  async createSession(data) {
    if (!this.isValidSessionPost(data)) {
      const err = new Error('Invalid session data');
      err.status = 422;
      throw err;
    }

    const session = {
      ...data,
      id:this.getNextSessionID(), 
    };
    const updatedSessions = [...this.sessions, session];
    await writeFile(filePath, JSON.stringify({sessions: updatedSessions}));
    this.sessions = updatedSessions;
    return session;
  }
  isValidId(id) {
    return /^\d+$/.test(id) && Number(id) > 0;
  }
  isValidObject(data) {
    return (data !== null && typeof data === 'object' && !Array.isArray(data));
  }
  isValidSessionPost(data) {
    return (this.isValidObject(data) && 
      Object.keys(data).length === 4 && 
      this.isValidSession(data) &&
      this.hasValidSessionTimes(data)
    );
  }

  isValidSession(data) {
    const sessionProperties = ['title', 'startTime', 'endTime', 'capacity'];
    for (const property of Object.keys(data)) {
      if (!sessionProperties.includes(property)) {
        return false;
      }
      switch (property) {
        case 'title':
          if (
            typeof data[property] !== 'string' || 
            data[property].length > 100 ||
            data[property].trim().length === 0
          ) return false;
          break;
        case 'startTime':
        case 'endTime':
          if (!this.isValidDateTime(data[property])) return false;
          break;
        case 'capacity':
          if (
            !Number.isInteger(data[property]) || 
            data[property] <= 0
          ) return false;
          break;
      }
    }

    return true;
  }
  isValidDateTime(value) {
  if (typeof value !== 'string') return false;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return false;


  return date.toISOString() === value;
  }
  
  hasValidSessionTimes(session) {
    return Date.parse(session.endTime) > Date.parse(session.startTime);
  }
}

async function initializeData() {
  try { 
    let fileData = await readFile(filePath, 'utf8');
    manager = new SessionManager(JSON.parse(fileData).sessions);
  } catch (error) {
    if (error.code === 'ENOENT') {
      manager = new SessionManager();
      await writeFile(filePath, JSON.stringify(manager));
    } else {
      throw error;
    }
  }
}

export { 
  initializeData,
  manager
};