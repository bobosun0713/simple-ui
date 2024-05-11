import { useStorage } from "@use/useStorage";

describe("useStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set and get storage value correctly", () => {
    const key = "testKey";
    const value = "testValue";
    const [state, setStorage] = useStorage(key, value);

    expect(state.value).toBe(value);

    const newValue = "newTestValue";
    setStorage(newValue);

    expect(state.value).toBe(newValue);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
  });

  it("should remove storage value correctly", () => {
    const key = "testKey";
    const value = "testValue";
    const [state, , removeStorage] = useStorage(key, value);

    expect(state.value).toBe(value);

    removeStorage();

    expect(state.value).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
  });
});
