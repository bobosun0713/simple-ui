import { shallowMount } from "@vue/test-utils";
import Divider from "../Divider.vue";

describe("Divider.vue", () => {
  it("should render default structure", async () => {
    const wrapper = shallowMount(Divider);

    expect(wrapper.classes()).toContain("su-divider--horizontal");
    expect(wrapper.attributes("style")).toContain("border-top-width: 1px");
    expect(wrapper.attributes("style")).toContain("margin: 24px 0");
    expect(wrapper.attributes("style")).toContain("border-style: solid");
  });

  describe("when props are set", () => {
    it("should show vertical divider", async () => {
      const wrapper = shallowMount(Divider, {
        props: {
          vertical: true
        }
      });

      expect(wrapper.classes()).toContain("su-divider--vertical");
    });

    it("should show with custom thickness, spacing, and border style", async () => {
      const wrapper = shallowMount(Divider, {
        props: {
          thickness: 2,
          spacing: 16,
          borderStyle: "dashed"
        }
      });

      expect(wrapper.attributes("style")).toContain("border-top-width: 2px");
      expect(wrapper.attributes("style")).toContain("margin: 16px 0");
      expect(wrapper.attributes("style")).toContain("border-style: dashed");
    });
  });
});
