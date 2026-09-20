import "./config/loadEnv.js";
import { createApp } from "./app.js";
import { getServerPort } from "./config/environment.js";

const port = getServerPort();
const app = createApp();

app.listen(port, () => {
  console.log(`KrishiMitra API listening on http://localhost:${port}`);
});
