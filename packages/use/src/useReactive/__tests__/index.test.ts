import { useReactive } from "../index";

describe("useReactive", () => {
  it("should binding value", () => {
    const target = { test: "Vitest" };
    const reactive = useReactive(target);

    expect(reactive).toEqual(target);
  });

  it("should reset binding value", () => {
    const target = { test: "Vitest" };
    const reactive = useReactive(target);

    reactive.test = "Vitest2";
    reactive.reset();

    expect(reactive).toEqual(target);
  });
});
