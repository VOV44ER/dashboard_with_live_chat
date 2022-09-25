const STORAGE_TOKEN = 'token';
const STORAGE_USER = 'user';

export const localStorageService = (() => {
  function privateGetToken() {
    return localStorage.getItem(STORAGE_TOKEN);
  }
  function privateSetToken(token: string) {
    localStorage.setItem(STORAGE_TOKEN, token);
  }
  function privateGetUser() {
    return localStorage.getItem(STORAGE_USER);
  }
  function privateSetUser(user: string) {
    localStorage.setItem(STORAGE_USER, user);
  }
  function privateClearStorage() {
    localStorage.clear();
  }

  return {
    getToken: privateGetToken,
    setToken: privateSetToken,
    getUser: privateGetUser,
    setUser: privateSetUser,
    clearStorage: privateClearStorage,
  };
})();
