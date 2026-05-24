const { spawnSync } = require('child_process');

const result = spawnSync('npx', ['tsc'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
