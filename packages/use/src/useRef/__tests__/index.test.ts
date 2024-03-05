import { useRef } from "../index";

describe("useRef", () => {
  it("should binding value", () => {
    const target = { test: "Vitest" };
    const ref = useRef(target);

    expect(ref.value).toEqual(target);
  });

  it("should reset binding value", () => {
    const target = { test: "Vitest" };
    const ref = useRef(target);

    ref.value = { test: "Vitest2" };
    ref.reset();

    expect(ref.value).toEqual(target);
  });
});
