import service from "../service";

describe("Message.vue", () => {
  afterEach(() => {
    document.body.innerHTML = "";
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

  it("should auto close message", () => {
    vi.useFakeTimers();

    service();

    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();

    expect(document.querySelector(".su-message")).toBeFalsy();
  });
});
