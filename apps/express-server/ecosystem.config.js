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
			env_file: '.env',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
