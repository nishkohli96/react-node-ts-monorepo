const { name } = require('./package.json');

/**
 * For pm2 usage, esp in docker env, refer the notes
 * in README.md.
 */

module.exports = {
  apps: [
    {
      name,
      script: 'dist/index.js',
      watch: true,
      ignore_watch: ['logs'],
      /**
       * give src/index.ts time to drain requests before pm2 sends
       * SIGKILL (default 1600ms)
       */
      kill_timeout: 6000,
			env_file: '.env',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
