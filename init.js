const fs = require('fs');

fs.copyFileSync('.env.sample', '.env');
fs.copyFileSync('packages/client/.env.sample', 'packages/client/.env');

fs.mkdirSync('tmp/pgdata', { recursive: true });
