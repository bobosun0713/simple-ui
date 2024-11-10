import { mount } from "@vue/test-utils";

import SIcon from "../Icon.vue";

describe("Icon.vue", () => {
  it("should render default structure", async () => {
    const wrapper = mount(SIcon);

    await vi.dynamicImportSettled();
    expect(wrapper.attributes("width")).toBe("20");
    expect(wrapper.attributes("height")).toBe("20");
  });

  describe("when set props", () => {
    it("should render correctly width and height size", async () => {
      const wrapper = mount(SIcon, {
        props: {
          width: 30,
          height: 30
        }
      });

      await vi.dynamicImportSettled();
      expect(wrapper.attributes("width")).toBe("30");
      expect(wrapper.attributes("height")).toBe("30");
    });
  });
});
