import { nextTick } from "vue";
import MessageService from "../Message";

describe("Message.vue", () => {
  const messageInstance = MessageService;
  afterEach(() => {
    document.body.innerHTML = "";
    messageInstance.closeAll();
  });

  it("should display message", () => {
    MessageService();

    expect(document.querySelector(".su-message")).toBeTruthy();
  });

  describe("when props are set", () => {
    it("should display close button", async () => {
      MessageService({ showClose: true });

      expect(document.querySelector(".su-message__cancel")).toBeTruthy();
    });

    it("should display message content", () => {
      MessageService({ message: "Testing" });

      expect(document.querySelector(".su-message__content").textContent).toBe("Testing");
    });

    it.each([
      ["info", "su-message--info"],
      ["success", "su-message--success"],
      ["warning", "su-message--warning"],
      ["danger", "su-message--danger"]
    ])("should display %s type within the message", (type, expected) => {
      MessageService({ type });

      expect(document.querySelector(".su-message").className).toContain(expected);
    });
  });

  it("should auto close message", async () => {
    vi.useFakeTimers();
    const message = MessageService();

    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();

    expect(message.instance.exposed.visible.value).toBe(false);
  });

  describe("when have multiple message", () => {
    it("should have spacing between messages", async () => {
      MessageService({ message: "message 1", offsetTop: 10, eleSpacing: 20 });

      await nextTick();

      expect((document.querySelectorAll(".su-message")[0] as HTMLDivElement).style.top).toBe("10px");

      MessageService({ message: "message 2", offsetTop: 10, eleSpacing: 20 });

      await nextTick();

      expect((document.querySelectorAll(".su-message")[1] as HTMLDivElement).style.top).toBe("30px");

      MessageService({ message: "message 3", offsetTop: 10, eleSpacing: 20 });

      await nextTick();

      expect((document.querySelectorAll(".su-message")[2] as HTMLDivElement).style.top).toBe("50px");
    });
  });
});
