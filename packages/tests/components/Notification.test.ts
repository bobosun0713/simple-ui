import { nextTick } from "vue";
import { mount } from "@vue/test-utils";

import Notification from "@components/notification/Notification.vue";
import NotificationService from "@components/notification/Notification";

describe("Notification.vue", () => {
  it("should render default structure", async () => {
    const wrapper = mount(Notification, {
      global: {
        stubs: { SIcon: true }
      }
    });
    wrapper.vm.notification = [{ type: "success", summary: "Message", message: "Message Content" }];

    await nextTick();

    expect(wrapper.find(".su-notification").exists()).toBeTruthy();
    expect(wrapper.find(".su-notification__container").classes()).toContain("su-notification__container--success");
    expect(wrapper.find(".su-notification__summary").text()).toBe("Message");
    expect(wrapper.find(".su-notification__message").text()).toBe("Message Content");
  });

  it.each([
    ["right", "su-notification--right"],
    ["left", "su-notification--left"],
    ["rightbottom", "su-notification--bottom"],
    ["leftbottom", "su-notification--bottom"]
  ])("should be displayed at the correct position", async (position, expected) => {
    const wrapper = mount(Notification, {
      props: {
        position
      },
      global: {
        stubs: { SIcon: true }
      }
    });

    expect(wrapper.find(".su-notification").classes(expected)).toBeTruthy();
  });

  it("should close notification", async () => {
    const wrapper = mount(Notification, {
      global: {
        stubs: { SIcon: true }
      }
    });
    wrapper.vm.notification = [{ type: "success", summary: "Message", message: "Message Content" }];

    await nextTick();

    await wrapper.find(".su-notification__cancel").trigger("click");

    expect(wrapper.vm.notification.length).toBe(0);
  });

  it("should show multiple notification", async () => {
    const wrapper = mount(Notification, {
      global: {
        stubs: { SIcon: true }
      }
    });
    wrapper.vm.notification = [
      { type: "success", summary: "Message", message: "Message Content" },
      { type: "success", summary: "Message", message: "Message Content" },
      { type: "success", summary: "Message", message: "Message Content" }
    ];

    await nextTick();

    expect(wrapper.findAll(".su-notification__container")).toHaveLength(3);
  });

  describe("when use service API", () => {
    const toast = NotificationService();

    it("should show notification when call `open` API", async () => {
      const wrapper = mount(Notification, {
        global: {
          stubs: { SIcon: true }
        }
      });

      toast.open({ type: "success", summary: "Message", message: "Message Content" });

      await nextTick();

      expect(wrapper.findAll(".su-notification__container")).toHaveLength(1);
    });

    it("should close multiple notification when call `removeAll` API", async () => {
      const wrapper = mount(Notification, {
        global: {
          stubs: { SIcon: true }
        }
      });
      wrapper.vm.notification = [
        { type: "success", summary: "Message", message: "Message Content" },
        { type: "success", summary: "Message", message: "Message Content" },
        { type: "success", summary: "Message", message: "Message Content" }
      ];

      await nextTick();

      toast.removeAll();

      await nextTick();

      expect(wrapper.findAll(".su-notification__container")).toHaveLength(0);
    });
  });
});
