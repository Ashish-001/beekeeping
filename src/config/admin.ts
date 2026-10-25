// Admin panel login. Hardcoded for now — change these before going live.
// Note: this file is committed, so anyone who can see the repo can see these values.
export const ADMIN_CONFIG = {
  username: "admin",
  password: "honey123",
  // Signs the login cookie. Any long random string works (e.g. `openssl rand -hex 32`).
  sessionSecret: "c8f1e0b6a4d94f2e9b7a3c5d1e8f60a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3",
};
