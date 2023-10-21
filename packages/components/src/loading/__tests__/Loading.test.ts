import { nextTick } from "vue";
import LoadingService from "../Loading";

describe("Loading.vue", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should display loading", () => {
    const loadingService = LoadingService();
    loadingService.show();

    expect(document.querySelector(".su-loading")).toBeTruthy();
  });

  it("should display spinner props when set spinner props", () => {
    const loadingService = LoadingService({ spinner: "Loading" });
    loadingService.show();

    expect(document.querySelector(".su-loading-content").textContent).toBe("Loading");
  });

  it("should close loading when close API is called", async () => {
    const loadingService = LoadingService();

    loadingService.show();

    await nextTick();

    loadingService.close();

    await nextTick();

    expect(loadingService.instance.exposed.visible.value).toBe(false);
  });
});
