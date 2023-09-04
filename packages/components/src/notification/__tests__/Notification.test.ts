import { nextTick } from "vue";
import service from "../service";

describe("Notification.vue", () => {
  const notificationInstance = service;
  afterEach(() => {
    document.body.innerHTML = "";
    notificationInstance.closeAll();
  });

  it("should display notification", () => {
    service();

    expect(document.querySelector(".su-notification")).toBeTruthy();
  });

  it("should display `message` content when `message` prop is set", () => {
    service({ message: "Testing..." });

    expect(document.querySelector(".su-notification__body").textContent).toBe("Testing...");
  });

  it.each([
    ["info", "su-notification--info"],
    ["success", "su-notification--success"],
    ["warning", "su-notification--warning"],
    ["danger", "su-notification--danger"]
  ])("should display different types within the notification", (type, expected) => {
    service({ type });

    expect(document.querySelector(".su-notification").className).toContain(expected);
  });

  it("should auto close notification", async () => {
    vi.useFakeTimers();
    const notification = service();

    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();

    expect(notification.instance.exposed.visible.value).toBe(false);
  });

  it("should close notification when click `close` btn", async () => {
    const notification = service({ duration: 0 });

    (document.querySelector(".su-notification__cancel") as HTMLDivElement).click();

    expect(notification.instance.exposed.visible.value).toBe(false);
  });

  it("should have spacing between notification", async () => {
    service({ message: "notification 1", offsetTop: 10, eleSpacing: 20 });

    await nextTick();

    expect((document.querySelectorAll(".su-notification")[0] as HTMLDivElement).style.top).toBe("10px");

    service({ message: "notification 2", offsetTop: 10, eleSpacing: 20 });

    await nextTick();

    expect((document.querySelectorAll(".su-notification")[1] as HTMLDivElement).style.top).toBe("30px");

    service({ message: "notification 3", offsetTop: 10, eleSpacing: 20 });

    await nextTick();

    expect((document.querySelectorAll(".su-notification")[2] as HTMLDivElement).style.top).toBe("50px");
  });
});
