import { nextTick } from "vue";
import { mount } from "@vue/test-utils";

import Message from "../Message.vue";
import MessageService from "../method";
import type { MessageServiceReturnType } from "../types";

describe("Message.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Message);

    expect(wrapper.find(".su-message-wrap").exists()).toBeTruthy();
    expect(wrapper.find(".su-message-wrap").attributes("style")).toContain("width: 300px;");
    expect(wrapper.find(".su-message-wrap").attributes("style")).toContain("top: 10px;");
  });

  describe("when message is added", () => {
    it("should display message content", async () => {
      const wrapper = mount(Message);

      wrapper.vm.handleAdd({ type: "info", message: "test" });

      await nextTick();

      expect(wrapper.findAll(".su-message").at(0)?.text()).toBe("test");
    });
  });

  describe("when props are set", () => {
    it("should hide close button", async () => {
      const wrapper = mount(Message, { props: { showClose: false } });

      wrapper.vm.handleAdd({ type: "info" });

      await nextTick();

      expect(wrapper.findAll(".su-message").at(0)?.find(".su-message__cancel").exists()).toBeFalsy();
    });

    it("should have offsetTop style set to 20", async () => {
      const wrapper = mount(Message, { props: { offsetTop: 20 } });

      wrapper.vm.handleAdd({ type: "info" });

      await nextTick();

      expect(wrapper.find(".su-message-wrap").attributes("style")).toContain("top: 20px;");
    });

    it("should have eleSpacing style set to 15", async () => {
      const wrapper = mount(Message, { props: { eleSpacing: 15 } });

      wrapper.vm.handleAdd({ type: "info" });
      wrapper.vm.handleAdd({ type: "info" });

      await nextTick();

      expect(wrapper.findAll(".su-message").at(1)?.attributes("style")).toContain("margin-top: 15px;");
    });

    it("should have width style set to 200", () => {
      const wrapper = mount(Message, { props: { width: 200 } });

      expect(wrapper.find(".su-message-wrap").attributes("style")).toContain("width: 200px;");
    });

    it("should auto hide message", async () => {
      vi.useFakeTimers();
      const wrapper = mount(Message);

      wrapper.vm.handleAdd({ type: "info" });

      await nextTick();

      vi.advanceTimersToNextTimer();
      vi.advanceTimersToNextTimer();

      await nextTick();

      expect(wrapper.findAll(".su-message")).toHaveLength(0);
    });
  });

  describe("when use service API", () => {
    it.each([
      ["info", "su-message--info"],
      ["success", "su-message--success"],
      ["warning", "su-message--warning"],
      ["error", "su-message--error"]
    ])("should display %s type within the message", async (type, expected) => {
      const messageService = MessageService();

      messageService[type as keyof MessageServiceReturnType]?.("test");

      await nextTick();

      expect(document.querySelector(`.${expected}`)).toBeTruthy();
    });
  });
});
