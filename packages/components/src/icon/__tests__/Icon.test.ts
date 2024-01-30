import Icon from "../Icon.vue";
import { mount } from "@vue/test-utils";

describe("Icon.vue", () => {
  it("should render default structure", async () => {
    const wrapper = mount(Icon);

    await vi.dynamicImportSettled();
    expect(wrapper.attributes("width")).toBe("20");
    expect(wrapper.attributes("height")).toBe("20");
  });

  describe("when set props", () => {
    it("should render correctly width and height size", async () => {
      const wrapper = mount(Icon, {
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
