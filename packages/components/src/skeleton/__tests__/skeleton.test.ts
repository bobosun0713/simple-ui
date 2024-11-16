import Skeleton from "../Skeleton.vue";
import { mount } from "@vue/test-utils";

describe("Skeleton", () => {
  it("should render default structure", () => {
    const wrapper = mount(Skeleton);

    expect(wrapper.classes()).toContain("su-skeleton");
  });

  describe("when set props", () => {
    it("should have 5 rows", () => {
      const wrapper = mount(Skeleton, { props: { rows: 5 } });

      // There will be a fixed row by default.
      expect(wrapper.findAll(".su-skeleton-item")).toHaveLength(5 + 1);
    });
  });

  describe("when state is changed", () => {
    it("should change state", async () => {
      const wrapper = mount(Skeleton, { props: { loading: true }, slots: { default: "test" } });

      expect(wrapper.classes()).toEqual(["su-skeleton"]);

      await wrapper.setProps({ loading: false });

      expect(wrapper.classes()).not.toEqual(["su-skeleton"]);
      expect(wrapper.text()).toBe("test");
    });
  });
});
