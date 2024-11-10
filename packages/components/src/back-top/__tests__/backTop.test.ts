/* eslint-disable @typescript-eslint/no-empty-function */
import { flushPromises, type VueWrapper } from "@vue/test-utils";
import { createComponent } from "@utils/index";

import BackTop from "../BackTop.vue";

function createBackTop(template: string): VueWrapper {
  return createComponent(template, { components: { BackTop } }, { attachTo: document.body });
}

describe("BackTop.vue", () => {
  it("initliaze", () => {
    const wrapper = createBackTop(`<BackTop></BackTop>`);

    expect(wrapper.find(".su-backtop").exists()).toBeTruthy();
  });

  describe("when set slots", () => {
    it("should render default slot", () => {
      const wrapper = createBackTop(`
            <BackTop>
               Default
            </BackTop>
        `);

      expect(wrapper.find(".su-backtop").text()).toBe("Default");
    });
  });

  describe("when set props and events", () => {
    it("should render right and bottom", () => {
      const wrapper = createBackTop(`<BackTop :right="40" :bottom="40"></BackTop>`);

      expect(wrapper.find(".su-backtop").attributes("style")).toContain("right: 40px");
      expect(wrapper.find(".su-backtop").attributes("style")).toContain("bottom: 40px");
    });

    it("should show <BackTop/> when scrollTop > visibilityHeight", async () => {
      const wrapper = createBackTop(`
          <div class="target" style="height: 100px; overflow: auto">
            <div style="height:1000px;">0</div>
            <BackTop target=".target" :visibilityHeight="100"></BackTop>
          </div>
        `);

      await flushPromises();

      wrapper.element.scrollTop = 200;

      await wrapper.trigger("scroll");

      expect(wrapper.find(".su-backtop").isVisible()).toBeTruthy();
    });

    it("should emit `on-click` event when clicked <BackTop/>", async () => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      Element.prototype.scrollTo = () => {};

      const wrapper = createBackTop(`
            <div class="target" style="height: 100px; overflow: auto">
                <div style="height:1000px;">0</div>
                <BackTop target=".target" :visibilityHeight="100"></BackTop>
            </div>
            `);

      await flushPromises();

      wrapper.element.scrollTop = 200;

      await wrapper.trigger("scroll");

      await wrapper.find(".su-backtop").trigger("click");

      expect(wrapper.findComponent(BackTop).emitted("on-click")).toBeTruthy();
    });
  });
});
