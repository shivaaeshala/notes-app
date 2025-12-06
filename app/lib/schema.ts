export const enableExtensions = `
-- enable uuid generation and citext (case-insensitive text for emails)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";
`;

export const users = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT NOT NULL UNIQUE,
  name TEXT,
  hashed_password TEXT,         -- store password hash (bcrypt/argon2)
  email_verified TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
-- index for fast lookup by email
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users (email);
`;

export const sessions = `
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions (user_id);
CREATE UNIQUE INDEX IF NOT EXISTS sessions_token_idx ON sessions (session_token);
`;

export const accounts = `
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  access_token TEXT,
  refresh_token TEXT,
  id_token TEXT,
  expires_at TIMESTAMPTZ,
  access_token_expires_at TIMESTAMPTZ,
  password TEXT,
  scope TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(provider_id, account_id)
);
CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON accounts (user_id);
`;

export const notes = `
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  is_archived BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes (user_id);
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes (created_at DESC);
`;
