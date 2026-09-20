import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createApp } from "./app.js";
import { getServerPort } from "./config/environment.js";

// Resolve from this module so `npm start` works from any working directory.
dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) });

const port = getServerPort();
const app = createApp();

app.listen(port, () => {
  console.log(`KrishiMitra API listening on http://localhost:${port}`);
});
