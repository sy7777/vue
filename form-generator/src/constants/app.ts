const debug = Boolean(process.env.VUE_APP_DEBUG);

export default {
  ENV: process.env.NODE_ENV,
  DEBUG: debug,

  CDN_URL: process.env.VUE_APP_CDN_URL,
  API_URL: process.env.VUE_APP_API_URL,
  GRAPHQL_URL: process.env.VUE_APP_GRAPHQL_URL,

  LIMIT_PER_PAGE: 20,
};
