import { mount } from "@vue/test-utils";
import Dialog from "../Dialog.vue";
import type { DialogSize } from "../types";

describe("Dialog.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Dialog);

    expect(wrapper.find(".su-dialog__header").text()).toContain("Tips");
    expect(wrapper.find(".su-dialog__body").text()).toContain("This is a message");
    expect(wrapper.find(".su-dialog__content--sm").text()).toContain("This is a message");
    expect(wrapper.find(".su-dialog__footer .su-dialog__default-btn").text()).toContain("No");
    expect(wrapper.find(".su-dialog__footer .su-dialog__default-btn").text()).toContain("Yes");
  });

  describe("when set props", () => {
    it("should show dialog", () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true
        }
      });

      expect(wrapper.find(".su-dialog").attributes("style")).toBe("display: none;");
    });

    it.each([
      ["sm", ".su-dialog__content--sm"],
      ["md", ".su-dialog__content--md"],
      ["lg", ".su-dialog__content--lg"],
      ["xl", ".su-dialog__content--xl"]
    ])('should render dialog content with size "%s"', async (prop: DialogSize, expected) => {
      const wrapper = mount(Dialog, {
        props: {
          size: prop
        }
      });

      expect(wrapper.find(expected).exists()).toBeTruthy();
    });

    it("should not show close button", () => {
      const wrapper = mount(Dialog, {
        props: {
          showClose: false
        }
      });

      expect(wrapper.find(".su-dialog__close").exists()).toBeFalsy();
    });
  });

  describe("when set slots", () => {
    it("should render dialog with header slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          header: `<div>Header</div>`
        }
      });

      expect(wrapper.find(".su-dialog__header").text()).toContain("Header");
    });
    it("should render dialog with body slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          body: `<div>Body</div>`
        }
      });

      expect(wrapper.find(".su-dialog__body").text()).toContain("Body");
    });
    it("should render dialog with footer slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          footer: `<div>Footer</div>`
        }
      });

      expect(wrapper.find(".su-dialog__footer").text()).toContain("Footer");
    });
  });

  describe("when set events", () => {
    it("should emit close event when click close button", async () => {
      const wrapper = mount(Dialog);

      await vi.dynamicImportSettled();
      await wrapper.find(".su-dialog__close").trigger("click");

      expect(wrapper.emitted("on-close")).toBeTruthy();
    });

    it("should emit cancel event when click cancel button", async () => {
      const wrapper = mount(Dialog);

      await wrapper.findAll(".su-dialog__default-btn .su-button").at(0).trigger("click");

      expect(wrapper.emitted("on-cancel")).toBeTruthy();
    });

    it("should emit confirm event when click confirm button", async () => {
      const wrapper = mount(Dialog);

      await wrapper.findAll(".su-dialog__default-btn .su-button").at(1).trigger("click");

      expect(wrapper.emitted("on-confirm")).toBeTruthy();
    });
  });
});
