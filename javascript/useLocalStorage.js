// custom hook code

const useLocalStorage = () => ({
  get: (key) => {
    if (typeof window === "undefined") {
      return null;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  },
  set: (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove: (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
});

export default useLocalStorage;

// test code

import { LocalStorageMock } from "mocks";
import { useLocalStorage } from "hooks";

const unmockedLocalStorage = global.localStorage;

beforeAll(() => {
  global.localStorage = new LocalStorageMock();
});

afterAll(() => {
  global.localStorage = unmockedLocalStorage;
});

describe("get", () => {
  it("retrieves a JSON parsed obj from local storage", () => {
    global.localStorage.setItem("key", '{"value": 10}');
    const { get } = useLocalStorage();

    const actual = get("key");
    expect(actual).toEqual({ value: 10 });
  });
});

describe("set", () => {
  it("adds a stringified obj to local storage", () => {
    const { set } = useLocalStorage();

    set("key", "value");
    expect(global.localStorage.getItem("key")).toEqual('"value"');
  });
});

describe("remove", () => {
  it("removes the saved value for a given key", () => {
    global.localStorage.setItem("key", "{'value': 10}");
    const { remove } = useLocalStorage();

    remove("key");
    expect(global.localStorage.getItem("key")).toBeNull();
  });
});

describe("clear", () => {
  it("removes all saved values", () => {
    global.localStorage.setItem("key1", "{'value': 10}");
    global.localStorage.setItem("key2", "{'value': 'abc'}");
    const { clear } = useLocalStorage();

    clear("");
    expect(global.localStorage.getItem("key1")).toBeNull();
    expect(global.localStorage.getItem("key2")).toBeNull();
  });
});

// local storage mock

export default class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}
