import Button from "../Button.vue";
import { mount } from "@vue/test-utils";

describe("Button.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Button);

    expect(wrapper.classes()).toContain("su-button-info");
    expect(wrapper.classes()).toContain("su-button-size-dft");
  });

  describe("when `type` prop is set", () => {
    it("should have different `type` class", async () => {
      const wrapper = mount(Button);

      await wrapper.setProps({ type: "success" });
      expect(wrapper.classes()).toContain("su-button-success");

      await wrapper.setProps({ type: "warning" });
      expect(wrapper.classes()).toContain("su-button-warning");

      await wrapper.setProps({ type: "danger" });
      expect(wrapper.classes()).toContain("su-button-danger");
    });
  });

  describe("when `size` prop is set", () => {
    it("should have different `size` class", async () => {
      const wrapper = mount(Button);

      await wrapper.setProps({ size: "sm" });
      expect(wrapper.classes()).toContain("su-button-size-sm");

      await wrapper.setProps({ size: "md" });
      expect(wrapper.classes()).toContain("su-button-size-md");

      await wrapper.setProps({ size: "lg" });
      expect(wrapper.classes()).toContain("su-button-size-lg");
    });
  });

  describe("when button has different states", () => {
    it("should show rounded button", () => {
      const wrapper = mount(Button, {
        props: {
          size: "dft",
          rounded: true
        }
      });

      expect(wrapper.classes()).toContain("su-button-rounded-dft");
    });

    it("should show outlined button", () => {
      const wrapper = mount(Button, {
        props: {
          outlined: true
        }
      });

      expect(wrapper.classes()).toContain("su-button--outlined");
    });

    it("should show disabled button", () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true
        }
      });

      expect(wrapper.classes()).toContain("su-button--disabled");
    });
  });
});
