import Icon from "../Icon.vue";
import { mount } from "@vue/test-utils";

describe("Button.vue", () => {
  it("should render default structure", async () => {
    const wrapper = mount(Icon);

    await vi.dynamicImportSettled();
    expect(wrapper.attributes("width")).toBe("20");
    expect(wrapper.attributes("height")).toBe("20");
  });

  describe("when props are set", () => {
    it("should render correctly structure", async () => {
      const wrapper = mount(Icon, {
        props: {
          name: "add",
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
