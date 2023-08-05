import { mount } from "@vue/test-utils";
import Collapse from "../Collapse.vue";

describe("Collapse.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Collapse);

    expect(wrapper.find(".su-collapse-header").text()).toBe("Title");
    expect(wrapper.find(".su-collapse-content").text()).toBe("Lorem ipsum dolor");
  });

  describe("when `title` and `content` props are set", () => {
    it("should show `title` prop content", () => {
      const wrapper = mount(Collapse, {
        props: {
          title: "Vitest"
        }
      });

      expect(wrapper.find(".su-collapse-header").text()).toBe("Vitest");
    });

    it("should show `content` prop content", () => {
      const wrapper = mount(Collapse, {
        props: {
          content: "This is testing."
        }
      });

      expect(wrapper.find(".su-collapse-content").text()).toBe("This is testing.");
    });
  });

  describe("when slots are set", () => {
    it("should render `header` slot", () => {
      const wrapper = mount(Collapse, {
        slots: {
          header: `<div class="collapse-header">Testing</div>`
        }
      });

      expect(wrapper.find(".collapse-header").exists()).toBeTruthy();
      expect(wrapper.find(".collapse-header").text()).toBe("Testing");
    });

    it("should render `content` slot", () => {
      const wrapper = mount(Collapse, {
        slots: {
          content: `<div class="collapse-content">Testing Testing</div>`
        }
      });

      expect(wrapper.find(".collapse-content").exists()).toBeTruthy();
      expect(wrapper.find(".collapse-content").text()).toBe("Testing Testing");
    });
  });

  describe("when open event", () => {
    it("should have `active` classes and trigger `active` emit event", async () => {
      const wrapper = mount(Collapse);

      await wrapper.find(".su-collapse-header").trigger("click");
      expect(wrapper.find(".su-collapse-header").classes()).toContain("su-collapse-header--active");
      expect(wrapper.emitted("active")).toBeTruthy();
    });
  });
});
