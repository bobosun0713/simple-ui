import { mount } from "@vue/test-utils";
import Button from "../Button.vue";

describe("Button.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Button);

    expect(wrapper.classes()).toContain("su-button-info");
    expect(wrapper.classes()).toContain("su-button-size-md");
  });

  describe("when set props", () => {
    it("should have `su-button-success` class", () => {
      const wrapper = mount(Button, {
        props: {
          type: "success"
        }
      });

      expect(wrapper.classes("su-button-success")).toBeTruthy();
    });

    it("should have `su-button-warning` class", () => {
      const wrapper = mount(Button, {
        props: {
          type: "warning"
        }
      });

      expect(wrapper.classes("su-button-warning")).toBeTruthy();
    });

    it("should have `su-button-danger` class", () => {
      const wrapper = mount(Button, {
        props: {
          type: "error"
        }
      });

      expect(wrapper.classes("su-button-error")).toBeTruthy();
    });
  });

  describe("when size props is set", () => {
    it("should have sm class", () => {
      const wrapper = mount(Button, {
        props: {
          size: "sm"
        }
      });

      expect(wrapper.classes()).toContain("su-button-size-sm");
    });
    it("should have md class", async () => {
      const wrapper = mount(Button, {
        props: {
          size: "md"
        }
      });

      expect(wrapper.classes()).toContain("su-button-size-md");
    });
    it("should have lg class", async () => {
      const wrapper = mount(Button, {
        props: {
          size: "lg"
        }
      });

      expect(wrapper.classes()).toContain("su-button-size-lg");
    });
    it("should have xl class", async () => {
      const wrapper = mount(Button, {
        props: {
          size: "xl"
        }
      });

      expect(wrapper.classes()).toContain("su-button-size-xl");
    });
  });

  describe("when button has different states", () => {
    it("should show rounded button", () => {
      const wrapper = mount(Button, {
        props: {
          size: "sm",
          rounded: true
        }
      });

      expect(wrapper.classes()).toContain("su-button-rounded-sm");
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
