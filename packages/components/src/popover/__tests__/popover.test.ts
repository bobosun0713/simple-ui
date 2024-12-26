import { mount } from "@vue/test-utils";

import Popover from "../Popover.vue";

// Close appendToBody because of this issue https://github.com/vuejs/test-utils/issues/2554

describe("Popover.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Popover, {
      props: {
        appendToBody: false
      }
    });

    expect(wrapper.find(".su-popper-reference").exists()).toBeTruthy();
    expect(wrapper.find(".su-popper").exists()).toBeFalsy();
    expect(wrapper.find(".su-popover").exists()).toBeFalsy();
  });

  describe("when set slots", () => {
    it("should show `default` and `content` slots", () => {
      const wrapper = mount(Popover, {
        props: {
          appendToBody: false
        },
        slots: {
          default: "Reference",
          content: "Popover content"
        }
      });

      expect(wrapper.find(".su-popper-reference").text()).toBe("Reference");
      expect(wrapper.find(".su-popover").text()).toBe("Popover content");
    });
  });

  describe("when trigger event", () => {
    it("should be able to `open` and `close` popover", async () => {
      const wrapper = mount(Popover, {
        props: {
          appendToBody: false
        },
        slots: {
          default: "Reference",
          content: "Popover content"
        },
        attachTo: document.body
      });

      const contentEl = wrapper.find(".su-popover");
      const referenceEl = wrapper.find(".su-popper-reference");

      await referenceEl.trigger("click");

      expect(contentEl.isVisible()).toBeTruthy();

      await referenceEl.trigger("click");

      expect(contentEl.isVisible()).toBeFalsy();
    });
  });
});
