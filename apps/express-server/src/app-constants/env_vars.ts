/**
 * Define all environment variables in this file and then
 * export across other modules.
 */

const env = process.env;

export const ENV_VARS = Object.freeze({
  client_url: env.CLIENT_URL ?? 'http://localhost:3000/',
  port: env.port ?? 5000,
});
