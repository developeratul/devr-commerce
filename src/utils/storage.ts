import Cookies from "universal-cookie";

const cookie = new Cookies();

const storage = {
  setItem: (key: string, item: unknown) => {
    console.log(key, item);
    cookie.set(key, item);
  },
  getItem(key: string) {
    return cookie.get(key);
  },
  removeItem(key: string) {
    cookie.remove(key);
  },
};

export default storage;
