/**
 * Define all route path-names here, so that any
 * future change can be easily applied across throughout
 * your application.
 */

const RouteNames = {
  home: '/',
  account: {
    rootPath: '/account',
    subRoutes: { manage: 'manage' },
  },
};

export default RouteNames;
