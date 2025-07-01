let tokenCache = {
  accessToken: null,
  expiresAt: null,
};

const cache = {
  setToken(token, expiresIn = 25 * 60 * 1000) {
    tokenCache = {
      accessToken: token,
      expiresAt: Date.now() + expiresIn,
    };
  },
  getToken() {
    return tokenCache.accessToken;
  },
  hasValidToken() {
    return tokenCache.accessToken && tokenCache.expiresAt > Date.now();
  },
  clearCache() {
    tokenCache = {
      accessToken: null,
      expiresAt: null,
    };
  },
};

export default cache;
