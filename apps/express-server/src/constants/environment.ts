/**
 * Define all environment variables in this file and then
 * export across other modules.
 */

const env = process.env;

export const ENV_VARS = Object.freeze({
  /* `||` so empty values (eg. a blank .env_sample entry) fall back too */
  env: env.NODE_ENV || 'development',
  port: Number(env.PORT) || 8000
});
