import { nextTick } from "vue";
import service from "../service";

describe("Message.vue", () => {
  const messageInstance = service;
  afterEach(() => {
    document.body.innerHTML = "";
    messageInstance.closeAll();
  });

  it("should display message", () => {
    service();

    expect(document.querySelector(".su-message")).toBeTruthy();
  });

  it("should display close button when `showClose` prop is set to true", async () => {
    service({ showClose: true });

    expect(document.querySelector(".su-message__cancel")).toBeTruthy();
  });

  it("should display message when `message` prop is set", () => {
    service({ message: "Testing" });

    expect(document.querySelector(".su-message__content").textContent).toBe("Testing");
  });

  it.each([
    ["info", "su-message--info"],
    ["success", "su-message--success"],
    ["warning", "su-message--warning"],
    ["danger", "su-message--danger"]
  ])("should display different types within the message", (type, expected) => {
    service({ type });

    expect(document.querySelector(".su-message").className).toContain(expected);
  });

  it("should auto close message", async () => {
    vi.useFakeTimers();
    const message = service();

    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();

    expect(message.instance.exposed.visible.value).toBe(false);
  });

  it("should have spacing between messages", async () => {
    service({ message: "message 1", offsetTop: 10, eleSpacing: 20 });

    await nextTick();

    expect((document.querySelectorAll(".su-message")[0] as HTMLDivElement).style.top).toBe("10px");

    service({ message: "message 2", offsetTop: 10, eleSpacing: 20 });

    await nextTick();

    expect((document.querySelectorAll(".su-message")[1] as HTMLDivElement).style.top).toBe("30px");

    service({ message: "message 3", offsetTop: 10, eleSpacing: 20 });

    await nextTick();

    expect((document.querySelectorAll(".su-message")[2] as HTMLDivElement).style.top).toBe("50px");
  });
});
