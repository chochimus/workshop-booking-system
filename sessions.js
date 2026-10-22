import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

let manager;

class SessionManager {
  constructor(sessions=[]) {
    this.sessions = sessions;
  }

}

async function initializeData() {
  let filePath = path.join(import.meta.dirname, 'dataStorage.json');
  try { 
    let fileData = await readFile(filePath, 'utf8');
    manager = new SessionManager(JSON.parse(fileData).sessions);
  } catch (error) {
    if (error.code === 'ENOENT') {
      manager = new SessionManager();
      await writeFile(filePath, JSON.stringify(manager));
    }
    throw error;
  }
}

export { initializeData };