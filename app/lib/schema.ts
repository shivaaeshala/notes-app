export const enableExtensions = `
-- enable uuid generation and citext (case-insensitive text for emails)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";
`;

export const users = `
CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  email CITEXT NOT NULL UNIQUE,
  name TEXT,
  image TEXT,
  "hashedPassword" TEXT,
  "emailVerified" BOOLEAN,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS user_email_idx ON "user" (email);
`;

export const sessions = `
CREATE TABLE IF NOT EXISTS session (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  "expiresAt" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "ipAddress" TEXT,
  "userAgent" TEXT
);
CREATE INDEX IF NOT EXISTS session_user_id_idx ON session ("userId");
CREATE UNIQUE INDEX IF NOT EXISTS session_token_idx ON session (token);
`;

export const accounts = `
CREATE TABLE IF NOT EXISTS account (
  id TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "expiresAt" TIMESTAMPTZ,
  "accessTokenExpiresAt" TIMESTAMPTZ,
  password TEXT,
  scope TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("providerId", "accountId")
);
CREATE INDEX IF NOT EXISTS account_user_id_idx ON account ("userId");
`;

export const verification = `
CREATE TABLE IF NOT EXISTS verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS verification_identifier_idx ON verification (identifier);
CREATE INDEX IF NOT EXISTS verification_value_idx ON verification (value);
CREATE INDEX IF NOT EXISTS verification_expires_at_idx ON verification ("expiresAt");
`;

export const notes = `
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
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
