/**
 * Define all environment variables in this file and then
 * export across other modules.
 */

const env = process.env;

export const ENV_VARS = Object.freeze({
  env: env.NODE_ENV ?? 'development',
  port: env.PORT ?? 5000
});
