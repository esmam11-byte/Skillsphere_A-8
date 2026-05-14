import Database from "better-sqlite3";

const db = new Database("skillsphere.db");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    image TEXT,
    password TEXT
  );
  
  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    userId TEXT,
    expiresAt INTEGER
  );
`);

export default db;
