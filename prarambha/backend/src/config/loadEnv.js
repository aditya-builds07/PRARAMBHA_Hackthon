import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

// Load environment variables before any other application modules are evaluated.
dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) });
