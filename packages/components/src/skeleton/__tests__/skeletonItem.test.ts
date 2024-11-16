import SkeletonItem from "../SkeletonItem.vue";
import type { SkeletonItemProps } from "../types";
import { mount } from "@vue/test-utils";

describe("SkeletonItem", () => {
  it("should render default structure", () => {
    const wrapper = mount(SkeletonItem);

    expect(wrapper.classes()).toEqual([
      "su-skeleton-item",
      "su-skeleton-item--paragraph",
      "su-skeleton-item--p",
      "su-skeleton-item--animated"
    ]);
  });

  describe("when set props", () => {
    it("should not have `su-skeleton-item--animated` class", () => {
      const wrapper = mount(SkeletonItem, { props: { animated: false } });

      expect(wrapper.classes()).not.toContain("su-skeleton-item--animated");
    });

    it.each([
      { type: "h", expected: "su-skeleton-item--h" },
      { type: "p", expected: "su-skeleton-item--p" },
      { type: "circle", expected: "su-skeleton-item--circle" },
      { type: "image", expected: "su-skeleton-item--image" }
    ])("should have $expected class", ({ type, expected }) => {
      const wrapper = mount(SkeletonItem, { props: { variant: type as SkeletonItemProps["variant"] } });

      if (type === "image") {
        const icon = wrapper.findComponent({ name: "SIcon" });
        expect(icon).toBeTruthy();
        expect(icon.props("name")).toBe("image");
      }

      expect(wrapper.classes()).toContain(expected);
    });
  });
});
