import { shallowMount } from "@vue/test-utils";

import Link from "../Link.vue";
import type { LinkType, LinkTarget } from "@components/link/types";

describe("Link.vue", () => {
  it("should render default structure", () => {
    const wrapper = shallowMount(Link);

    expect(wrapper.attributes("class")).toContain("su-link su-link--default su-link--underline");
  });

  describe("when set props", () => {
    it.each([
      ["success", "su-link--success"],
      ["warning", "su-link--warning"],
      ["danger", "su-link--danger"]
    ])("should have `su-link--%s` class", (type, expected) => {
      const wrapper = shallowMount(Link, { props: { type: type as LinkType } });

      expect(wrapper.classes(expected)).toBeTruthy();
    });

    it("should have `href` attribute", () => {
      const wrapper = shallowMount(Link, { props: { href: "javascript:;" } });

      expect(wrapper.attributes("href")).toBe("javascript:;");
    });

    it("should not have `href` and `target` attributes", () => {
      const wrapper = shallowMount(Link);

      expect(wrapper.attributes("href")).toBeUndefined();
      expect(wrapper.attributes("target")).toBeUndefined();
    });

    it.each(["_blank", "_self", "_parent", "_top"])("should have `%s` target attribute", target => {
      const wrapper = shallowMount(Link, { props: { href: "javascript:;", target: target as LinkTarget } });

      expect(wrapper.attributes("target")).toBe(target);
    });

    it("should have `su-link-underline` class", () => {
      const wrapper = shallowMount(Link, { props: { underline: true } });

      expect(wrapper.classes("su-link--underline")).toBeTruthy();
    });

    it("should have `su-link-disabled` class", () => {
      const wrapper = shallowMount(Link, { props: { disabled: true } });

      expect(wrapper.classes("su-link--disabled")).toBeTruthy();
    });
  });

  describe("when set slots", () => {
    it("should show slot content by default", () => {
      const wrapper = shallowMount(Link, { slots: { default: "Demo" } });

      expect(wrapper.text()).toBe("Demo");
    });
  });
});
