/**
 * Define all environment variables in this file and then
 * export across other modules.
 */

const env = process.env;

export const ENV_VARS = Object.freeze({
  /* `||` so empty values (eg. a blank .env_sample entry) fall back too */
  env: env.NODE_ENV || 'development',
  /* Not `Number(..) || 8000`, that would turn PORT=0 (ephemeral port) into 8000 */
  port: env.PORT ? Number(env.PORT) : 8000
});
