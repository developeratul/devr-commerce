const storage = {
  setItem(key: string, item: unknown) {
    window.localStorage.setItem(key, JSON.stringify(item));
  },
  getItem(key: string) {
    return JSON.parse((window.localStorage.getItem(key) as string) ?? null);
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
  },
};

export default storage;
