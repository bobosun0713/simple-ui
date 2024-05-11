import { mount, flushPromises } from "@vue/test-utils";

import BackTop from "@components/back-top/BackTop.vue";

function createComponent(components: string) {
  const wrapper = mount(
    {
      template: components,
      components: {
        BackTop
      }
    },
    { attachTo: document.body }
  );

  return wrapper;
}

describe("BackTop.vue", () => {
  it("initliaze", () => {
    const wrapper = createComponent(`<BackTop></BackTop>`);

    expect(wrapper.find(".su-backtop").exists()).toBeTruthy();
  });

  describe("when set slots", () => {
    it("should render default slot", () => {
      const wrapper = createComponent(`
            <BackTop>
               Default
            </BackTop>
        `);

      expect(wrapper.find(".su-backtop").text()).toBe("Default");
    });
  });

  describe("when set props and events", () => {
    it("should render right and bottom", () => {
      const wrapper = createComponent(`<BackTop right="40" bottom="40"></BackTop>`);

      expect(wrapper.find(".su-backtop").attributes("style")).toContain("right: 40px");
      expect(wrapper.find(".su-backtop").attributes("style")).toContain("bottom: 40px");
    });

    it("should show <BackTop/> when scrollTop > visibilityHeight", async () => {
      const wrapper = createComponent(`
          <div class="target" style="height: 100px; overflow: auto">
            <div style="height:1000px;">0</div>
            <BackTop target=".target" visibilityHeight="100"></BackTop>
          </div>
        `);

      await flushPromises();

      wrapper.element.scrollTop = 200;

      await wrapper.trigger("scroll");

      expect(wrapper.find(".su-backtop").isVisible()).toBeTruthy();
    });

    it("should emit `on-click` event when clicked <BackTop/>", async () => {
      Element.prototype.scrollTo = () => {};

      const wrapper = createComponent(`
            <div class="target" style="height: 100px; overflow: auto">
                <div style="height:1000px;">0</div>
                <BackTop target=".target" visibilityHeight="100"></BackTop>
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
