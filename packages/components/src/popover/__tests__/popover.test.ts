import { shallowMount } from "@vue/test-utils";

import Popover from "../Popover.vue";

describe("Popover.vue", () => {
  it("should render default structure", () => {
    const wrapper = shallowMount(Popover, {
      slots: {
        default: "Demo"
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    });

    expect(wrapper.find(".su-popover").exists()).toBeTruthy();
    expect(wrapper.find(".su-popover").text()).toBe("Demo");
  });

  describe("when set props", () => {
    it("should show content prop", () => {
      const wrapper = shallowMount(Popover, {
        props: {
          modelValue: true,
          content: "Popover content"
        },
        slots: {
          default: "Demo"
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-popover__content").text()).toBe("Popover content");
    });

    it("should disabled arrow style", () => {
      const wrapper = shallowMount(Popover, {
        props: {
          modelValue: true,
          content: "Popover content",
          hasArrow: false
        },
        slots: {
          default: "Demo"
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-popover__arrow").exists()).toBeFalsy();
    });
  });

  describe("when set slots", () => {
    it("should show content slot", () => {
      const wrapper = shallowMount(Popover, {
        props: { modelValue: true },
        slots: {
          default: "Demo",
          content: "Popover slots content"
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-popover__content").text()).toBe("Popover slots content");
    });
  });

  describe("when set trigger", () => {
    it.each([
      { props: { trigger: "click" as const }, event: "click", expectedDisplay: "" },
      { props: { trigger: "hover" as const }, event: "mouseenter", expectedDisplay: "" },
      { props: { trigger: "hover" as const, modelValue: true }, event: "mouseleave", expectedDisplay: "none" }
    ])("should trigger $event event", async ({ props, event, expectedDisplay }) => {
      const wrapper = shallowMount(Popover, {
        props: { ...props },
        slots: { default: "Demo" },
        global: { stubs: { teleport: true } }
      });

      const contentEl = wrapper.find(".su-popover__content").element as HTMLElement;

      await wrapper.find(".su-popover").trigger(event);

      expect(contentEl.style.display).toBe(expectedDisplay);
    });

    it("should only allow trigger actions `click` and `hover`", async () => {
      const wrapper = shallowMount(Popover, {
        props: { trigger: [] },
        slots: { default: "Demo" },
        global: { stubs: { teleport: true } }
      });

      const contentEl = wrapper.find(".su-popover__content").element as HTMLElement;

      await wrapper.find(".su-popover").trigger("click");
      expect(contentEl.style.display).toBe("none");

      await wrapper.find(".su-popover").trigger("mouseenter");
      expect(contentEl.style.display).toBe("none");
    });
  });
});
