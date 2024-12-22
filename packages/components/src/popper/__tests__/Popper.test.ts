import { shallowMount, mount } from "@vue/test-utils";
import Popper from "../Popper.vue";

describe("Popper.vue", () => {
  it("should render default structure", () => {
    const wrapper = shallowMount(Popper, {
      slots: {
        reference: "Reference",
        content: "Content"
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    });
    expect(wrapper.find(".su-popper-reference").exists()).toBeTruthy();
    expect(wrapper.find(".su-popper-reference").text()).toBe("Reference");
    expect(wrapper.find(".su-popper").exists()).toBeTruthy();
    expect(wrapper.find(".su-popper").text()).toBe("Content");
  });

  describe("when set props", () => {
    it("should show content prop", () => {
      const wrapper = shallowMount(Popper, {
        props: {
          modelValue: true,
          content: "Popper content"
        },
        slots: {
          reference: "Reference"
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-popper").text()).toBe("Popper content");
    });

    it("should get `arrowData` by slot-scope", () => {
      const wrapper = mount(
        {
          template: `
        <SPopper :arrow-options="{ element: arrowRef }">
          <template #reference>
            Reference
          </template>
          <template #content="{ arrowStyle, placement }">
            <div ref="arrowRef" class="arrow">
            {{ arrowStyle }} {{ placement }}
            </div>
          </template>
        </SPopper>
        `,
          components: {
            SPopper: Popper
          },
          data() {
            return {
              arrowRef: null
            };
          }
        },
        {
          global: {
            stubs: {
              teleport: true
            }
          }
        }
      );

      expect(wrapper.find({ ref: "arrowRef" }).text()).toContain("{} bottom");
    });
  });

  describe("when set trigger", () => {
    it.each([
      { props: { trigger: "click" as const }, event: "click", expectedDisplay: "" },
      { props: { trigger: "hover" as const }, event: "mouseenter", expectedDisplay: "" },
      { props: { trigger: "hover" as const, modelValue: true }, event: "mouseleave", expectedDisplay: "none" }
    ])("should trigger $event event", async ({ props, event, expectedDisplay }) => {
      const wrapper = shallowMount(Popper, {
        props: { ...props },
        slots: { reference: "Demo", content: "Popper content" },
        global: { stubs: { teleport: true } }
      });

      const contentEl = wrapper.find(".su-popper").element as HTMLElement;

      await wrapper.find(".su-popper-reference").trigger(event);

      expect(contentEl.style.display).toBe(expectedDisplay);
    });

    it("should only allow trigger actions `click` and `hover`", async () => {
      const wrapper = shallowMount(Popper, {
        props: { trigger: [] },
        slots: { reference: "Demo", content: "Popper content" },
        global: { stubs: { teleport: true } }
      });

      const contentEl = wrapper.find(".su-popper").element as HTMLElement;

      await wrapper.find(".su-popper").trigger("click");
      expect(contentEl.style.display).toBe("none");

      await wrapper.find(".su-popper").trigger("mouseenter");
      expect(contentEl.style.display).toBe("none");
    });

    it("closes popper when clicking outside", async () => {
      const wrapper = shallowMount(Popper, {
        slots: {
          reference: "Reference",
          content: "Content"
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      const contentEl = wrapper.find(".su-popper").element as HTMLElement;

      await wrapper.find(".su-popper-reference").trigger("click");

      expect(contentEl.style.display).toBe("");

      document.body.click();

      await wrapper.vm.$nextTick();

      expect(contentEl.style.display).toBe("none");
    });
  });
});
