import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Popover from "../Popover.vue";

describe("Popover", () => {
  it("should render default structure", () => {
    const wrapper = mount(Popover, {
      slots: {
        default: `<div>Demo</div>`
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    });

    expect(wrapper.find(".su-tooltip").exists()).toBeTruthy();
    expect(wrapper.find(".su-tooltip__trigger").exists()).toBeTruthy();
    expect(wrapper.find(".su-popover__arrow").exists()).toBeTruthy();
    expect(wrapper.find(".su-tooltip__trigger").text()).toBe("Demo");
  });

  describe("when set slots", () => {
    it("should show popover content when set content slot", async () => {
      const wrapper = mount(Popover, {
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

      expect(wrapper.find(".su-popover").exists()).toBe(true);
      expect(wrapper.find(".su-popover__inner").text()).toBe("Tooltip slots content");
    });
  });
});
