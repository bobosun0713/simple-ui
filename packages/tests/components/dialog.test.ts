import { mount, flushPromises, type VueWrapper } from "@vue/test-utils";
import { withSetup } from "@utils/index";

import Dialog from "@components/dialog/Dialog.vue";
import DialogService from "@components/dialog/Dialog";
import type { DialogServiceReturnType, DialogSize } from "@components/dialog/types";

describe("Dialog.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Dialog, {
      global: {
        stubs: {
          teleport: true
        }
      }
    });

    expect(wrapper.find(".su-dialog__header").text()).toContain("Tips");
    expect(wrapper.find(".su-dialog__body").text()).toContain("This is a message");
    expect(wrapper.find(".su-dialog__content--md").text()).toContain("This is a message");
    expect(wrapper.find(".su-dialog__footer .su-dialog__default-btn").text()).toContain("No");
    expect(wrapper.find(".su-dialog__footer .su-dialog__default-btn").text()).toContain("Yes");
    expect(wrapper.find(".su-dialog__close").exists()).toBeTruthy();
  });

  describe("when set props", () => {
    it("should show dialog", () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-dialog").attributes("style")).toBe("display: none;");
    });

    it("should not show close button", () => {
      const wrapper = mount(Dialog, {
        props: {
          showClose: false
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-dialog__close").exists()).toBeFalsy();
    });

    it.each([
      ["sm", "su-dialog__content--sm"],
      ["md", "su-dialog__content--md"],
      ["lg", "su-dialog__content--lg"],
      ["xl", "su-dialog__content--xl"]
    ])("should have `su-dialog__content--%s` class", async (size: DialogSize, expected) => {
      const wrapper = mount(Dialog, {
        props: {
          size
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-dialog__content").classes(expected)).toBeTruthy();
    });
  });

  describe("when set slots", () => {
    it("should render dialog with `header` slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          header: `<div>Header</div>`
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-dialog__header").text()).toContain("Header");
    });
    it("should render dialog with `body` slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          body: `<div>Body</div>`
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-dialog__body").text()).toContain("Body");
    });
    it("should render dialog with `footer` slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          footer: `<div>Footer</div>`
        },
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      expect(wrapper.find(".su-dialog__footer").text()).toContain("Footer");
    });
  });

  describe("when set events", () => {
    it("should emit `on-close` event", async () => {
      const wrapper = mount(Dialog, {
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      await vi.dynamicImportSettled();
      await wrapper.find(".su-dialog__close").trigger("click");

      expect(wrapper.emitted("on-close")).toBeTruthy();
    });

    it("should emit `on-cancel` event", async () => {
      const wrapper = mount(Dialog, {
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      await vi.dynamicImportSettled();
      await wrapper.findAll(".su-dialog__default-btn .su-button").at(0).trigger("click");

      expect(wrapper.emitted("on-cancel")).toBeTruthy();
    });

    it("should emit `on-confirm` event", async () => {
      const wrapper = mount(Dialog, {
        global: {
          stubs: {
            teleport: true
          }
        }
      });

      await vi.dynamicImportSettled();
      await wrapper.findAll(".su-dialog__default-btn .su-button").at(1).trigger("click");

      expect(wrapper.emitted("on-confirm")).toBeTruthy();
    });
  });

  describe("when use DialogService API", () => {
    const [result, app] = withSetup(() => DialogService());
    const { confirm, showDialog, closeDialog, closeAll } = (result as unknown as DialogServiceReturnType) || {};

    afterEach(() => {
      document.body.innerHTML = "";
      app.unmount();
    });

    it("should confirm dialog", async () => {
      confirm({
        header: "API-Title",
        body: "API-Content"
      });

      await flushPromises();

      expect(document.querySelector(".su-dialog")).toBeTruthy();
      expect(document.querySelector(".su-dialog__header")?.innerHTML).toContain("API-Title");
      expect(document.querySelector(".su-dialog__content")?.innerHTML).toContain("API-Content");
    });

    it("should return `close` when close button is clicked", async () => {
      let resolve: string = "";

      confirm().then(res => {
        resolve = res;
      });

      (document.querySelector(".su-dialog__close") as HTMLElement)?.click();

      await flushPromises();

      expect(resolve).toBe("close");
    });

    it("should return `cancel` when cancel button is clicked", async () => {
      let resolve: string = "";

      confirm().then(res => {
        resolve = res;
      });

      (document.querySelectorAll(".su-dialog__footer .su-button")[0] as HTMLElement)?.click();

      await flushPromises();

      expect(resolve).toBe("cancel");
    });

    it("should return `confirm` when confirm button is clicked", async () => {
      let resolve: string = "";

      confirm().then(res => {
        resolve = res;
      });

      (document.querySelectorAll(".su-dialog__footer .su-button")[1] as HTMLElement)?.click();

      await flushPromises();

      expect(resolve).toBe("confirm");
    });

    it("should log a warning when dialog with the given ID is not found", async () => {
      console.warn = vi.fn();

      showDialog("test");

      await flushPromises();

      expect(console.warn).toHaveBeenCalledWith("[Dialog] dialog with id 'test' not found");
    });

    describe("when dialog is used with the API", () => {
      let wrapper: VueWrapper<any>;

      const createComponent = () =>
        mount({
          template: `
            <Dialog id='dialog1' v-model:visible='isVisible1'></Dialog>
            <Dialog id='dialog2' v-model:visible='isVisible2'></Dialog>
            `,
          components: {
            Dialog
          },
          data() {
            return {
              isVisible1: false,
              isVisible2: false
            };
          }
        });

      beforeEach(() => {
        wrapper = createComponent();
      });

      afterEach(() => {
        // Cannot test in a simulated browser environment, so we test internal parameters.
        // Therefore, we must manually execute unmount to destroy the instance
        wrapper.unmount();
      });

      it("should confirm other dialog", async () => {
        showDialog("dialog1");

        await flushPromises();

        expect(wrapper.vm.isVisible1).toBe(true);
      });

      it("should close dialog", async () => {
        await wrapper.setData({ isVisible1: true });

        expect(wrapper.vm.isVisible1).toBe(true);

        closeDialog("dialog1");

        await flushPromises();

        expect(wrapper.vm.isVisible1).toBe(false);
      });

      it("should close all dialog", async () => {
        await wrapper.setData({ isVisible1: true, isVisible2: true });

        expect(wrapper.vm.isVisible1).toBe(true);
        expect(wrapper.vm.isVisible2).toBe(true);

        closeAll();

        await flushPromises();

        expect(wrapper.vm.isVisible1).toBe(false);
        expect(wrapper.vm.isVisible2).toBe(false);
      });
    });
  });
});
