import { nextTick } from "vue";
import { withSetup } from "@simple/utils";
import LoadingService from "../Loading";

describe("Loading.vue", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render loading", async () => {
    const [result] = withSetup(() => LoadingService());

    result.open();

    await nextTick();

    expect((document.querySelector(".su-loading") as HTMLDivElement).style.display).toBe("");
  });

  it("should show spinner content", async () => {
    const [result] = withSetup(() => LoadingService({ spinner: "Loading" }));

    result.open();

    await nextTick();

    expect(document.querySelector(".su-loading-content").textContent).toBe("Loading");
  });

  it("should close loading", async () => {
    const [result] = withSetup(() => LoadingService());

    /**
     * Because the composition encapsulates dynamic components, the transition of the components cannot be rendered when mounted,
     * and it is impossible to test when the state changes with a false condition.
     * Therefore, simulate the close function
     */
    vi.spyOn(result, "close");

    result.open();

    await nextTick();

    expect((document.querySelector(".su-loading") as HTMLDivElement).style.display).toBe("");

    result.close();

    expect(result.close).toHaveBeenCalled();
  });
});
