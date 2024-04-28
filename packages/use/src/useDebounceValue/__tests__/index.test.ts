import { useDebounceValue } from "../index";

describe("useDebounceValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should binding value", () => {
    const debouncedValue = useDebounceValue("test");

    expect(debouncedValue.value).toBe("test");
  });

  it("should update value after the delay", () => {
    const initialValue = "test";
    const updatedValue = "updated...";
    const debouncedValue = useDebounceValue(initialValue, 3000);

    expect(debouncedValue.value).toBe(initialValue);

    debouncedValue.value = updatedValue;

    vi.advanceTimersByTime(3000);

    expect(debouncedValue.value).toEqual("updated...");
  });
});
