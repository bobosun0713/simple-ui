import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

import Notification from "@components/notification/Notification.vue";
import NotificationService from "@components/notification/Notification";
import type { NotificationPlacement } from "@components/notification/types";

describe("Notification.vue", () => {
  it("should render <Notification />", async () => {
    const wrapper = mount(Notification, {
      global: {
        stubs: { SIcon: true }
      }
    });

    wrapper.vm.handleAdd({ type: "success", title: "Tips", message: "Content..." });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".su-notification-wrap").exists()).toBeTruthy();
    expect(wrapper.find(".su-notification--success").exists()).toBeTruthy();
    expect(wrapper.find(".su-notification__title").text()).toBe("Tips");
    expect(wrapper.find(".su-notification__message").text()).toBe("Content...");
  });

  describe("when set props", () => {
    it("should have `width` style set to 200", async () => {
      const wrapper = mount(Notification, {
        props: {
          width: 200
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      expect(wrapper.find(".su-notification-wrap").attributes("style")).toContain("width: 200px");
    });

    it("should have `top` style set to 20", async () => {
      const wrapper = mount(Notification, {
        props: {
          offsetTop: 20
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      expect(wrapper.find(".su-notification-wrap").attributes("style")).toContain("top: 20px");
    });

    it("should have `eleSpacing` style set to 20", async () => {
      const wrapper = mount(Notification, {
        props: {
          eleSpacing: 20
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      wrapper.vm.handleAdd({ type: "success", title: "Tips", message: "Content..." });
      wrapper.vm.handleAdd({ type: "success", title: "Tips", message: "Content..." });

      await wrapper.vm.$nextTick();

      expect(wrapper.findAll(".su-notification").at(1)!.attributes("style")).toContain("margin-top: 20px");
    });

    it("should auto close notice", async () => {
      vi.useFakeTimers();

      const wrapper = mount(Notification, {
        props: {
          duration: 1000
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      wrapper.vm.handleAdd({ type: "success", title: "Tips", message: "Content..." });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".su-notification").exists()).toBeTruthy();

      vi.advanceTimersByTime(1000);

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".su-notification").exists()).toBeFalsy();
    });

    it.each([
      ["top-right", "su-notification-wrap--top su-notification-wrap--right"],
      ["top-left", "su-notification-wrap--top su-notification-wrap--left"],
      ["bottom-right", "su-notification-wrap--bottom su-notification-wrap--right"],
      ["bottom-left", "su-notification-wrap--bottom su-notification-wrap--left"]
    ])("should have `%s` classes", async (position, expected) => {
      const wrapper = mount(Notification, {
        props: {
          position: position as NotificationPlacement
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      expect(wrapper.find(".su-notification-wrap").classes()[1]).toContain(expected[0]);
      expect(wrapper.find(".su-notification-wrap").classes()[2]).toContain(expected[1]);
    });
  });

  describe("when set slots", () => {
    it("should render `title` slot", async () => {
      const wrapper = mount(Notification, {
        slots: {
          title: "<div class='title-slot'>Title Slot</div>"
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      wrapper.vm.handleAdd({ message: "Content..." });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".title-slot").text()).toBe("Title Slot");
    });

    it("should render `message` slot", async () => {
      const wrapper = mount(Notification, {
        slots: {
          message: "<div class='message-slot'>Message Slot</div>"
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      wrapper.vm.handleAdd({ message: "Content..." });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".message-slot").text()).toBe("Message Slot");
    });

    it("should render `cancel` slot", async () => {
      const wrapper = mount(Notification, {
        slots: {
          cancel: "<div class='cancel-slot'>Cancel Slot</div>"
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      wrapper.vm.handleAdd({ message: "Content..." });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".cancel-slot").text()).toBe("Cancel Slot");
    });
  });

  describe("when click events", () => {
    it("should trigger `close` event", async () => {
      const wrapper = mount(Notification, {
        global: {
          stubs: { SIcon: true }
        }
      });

      wrapper.vm.handleAdd({ message: "Content..." });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".su-notification").exists()).toBeTruthy();

      wrapper.find(".su-notification__cancel").trigger("click");

      await wrapper.vm.$nextTick();

      expect(wrapper.find(".su-notification").exists()).toBeFalsy();
    });
  });

  describe("when call service", () => {
    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should call `open` service", async () => {
      const { open } = NotificationService();

      open({ message: "Call service..." });

      await nextTick();

      expect(document.querySelector(".su-notification__message")!.textContent).toBe("Call service...");
    });

    it("should call `info` service", async () => {
      const { info } = NotificationService();

      info({ message: "Call service..." });

      await nextTick();

      expect(document.querySelector(".su-notification--info")).toBeTruthy();
      expect(document.querySelector(".su-notification__message")!.textContent).toBe("Call service...");
    });

    it("should call `success` service", async () => {
      const { success } = NotificationService();

      success({ message: "Call service..." });

      await nextTick();

      expect(document.querySelector(".su-notification--success")).toBeTruthy();
      expect(document.querySelector(".su-notification__message")!.textContent).toBe("Call service...");
    });

    it("should call `warning` service", async () => {
      const { warning } = NotificationService();

      warning({ message: "Call service..." });

      await nextTick();

      expect(document.querySelector(".su-notification--warning")).toBeTruthy();
      expect(document.querySelector(".su-notification__message")!.textContent).toBe("Call service...");
    });

    it("should call `error` service", async () => {
      const { error } = NotificationService();

      error({ message: "Call service..." });

      await nextTick();

      expect(document.querySelector(".su-notification--error")).toBeTruthy();
      expect(document.querySelector(".su-notification__message")!.textContent).toBe("Call service...");
    });
  });
});
