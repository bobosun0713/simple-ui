import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

import Tooltip from "@components/tooltip/Tooltip.vue";

describe("Tooltip.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Tooltip, {
      slots: {
        default: `<div>Demo</div>`
      }
    });

    expect(wrapper.find(".su-tooltip").exists()).toBe(true);
    expect(wrapper.find(".su-tooltip__trigger").exists()).toBe(true);
    expect(wrapper.find(".su-tooltip__trigger").text()).toBe("Demo");
  });

  describe("when set props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(Tooltip, {
        props: {
          content: "Tooltip content"
        },
        slots: {
          default: `<div>Demo</div>`
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });
    });

    it("should show content when content props is set", async () => {
      await wrapper.find(".su-tooltip__trigger").trigger("mouseenter");
      await nextTick();

      expect(wrapper.find(".su-tooltip__content").exists()).toBe(true);
      expect(wrapper.find(".su-tooltip__content").text()).toBe("Tooltip content");
    });

    it("should show content when modelValue set to true", async () => {
      await wrapper.setProps({ modelValue: true });
      await nextTick();

      expect(wrapper.find(".su-tooltip__content").exists()).toBe(true);
      expect(wrapper.find(".su-tooltip__content").text()).toBe("Tooltip content");
    });
  });

  describe("when set slots", () => {
    it("should show content when content slot is set", async () => {
      const wrapper = mount(Tooltip, {
        slots: {
          default: `<div>Demo</div>`,
          content: `Tooltip slots content`
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      await wrapper.find(".su-tooltip__trigger").trigger("mouseenter");
      await nextTick();

      expect(wrapper.find(".su-tooltip__content").exists()).toBe(true);
      expect(wrapper.find(".su-tooltip__content").text()).toBe("Tooltip slots content");
    });
  });

  describe("when set events", () => {
    it("should emits update:modelValue event when tooltip trigger is clicked", async () => {
      const wrapper = mount(Tooltip, {
        props: {
          trigger: "click"
        }
      });

      await wrapper.find(".su-tooltip__trigger").trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(true);
    });

    it("should emit update:modelValue event when mouse enters the tooltip trigger", async () => {
      const wrapper = mount(Tooltip, {
        props: {
          trigger: "hover"
        }
      });
      await wrapper.find(".su-tooltip__trigger").trigger("mouseenter");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(true);
    });

    it("should emit update:modelValue event when mouse leaves the tooltip trigger", async () => {
      const wrapper = mount(Tooltip, {
        props: {
          trigger: "hover"
        }
      });

      await wrapper.find(".su-tooltip__trigger").trigger("mouseleave");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0][0]).toBe(false);
    });
  });
});
