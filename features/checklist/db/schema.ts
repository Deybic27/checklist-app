export const createChecklistTable = `
  CREATE TABLE IF NOT EXISTS checklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL
  );
`;