import { nextTick } from "vue";
import Loading from "../Loading.vue";
import service from "../service";
import { mount } from "@vue/test-utils";

describe("Loading.vue", () => {
  it("should render default structure", async () => {
    const wrapper = mount(Loading, { props: { visible: false } });
    await wrapper.setProps({ visible: true });

    expect(wrapper.find(".su-loading").exists()).toBeTruthy();
    expect(wrapper.find(".su-loading-content").exists()).toBeTruthy();
  });

  it("should auto close loading", async () => {
    vi.useFakeTimers();

    const wrapper = mount(Loading, { props: { visible: false } });
    await wrapper.setProps({ visible: true, timer: 1000 });

    expect(wrapper.find(".su-loading").attributes("style")).toBe("");

    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();
    await nextTick();

    expect(wrapper.find(".su-loading").attributes("style")).toContain("display: none");
  });

  it("should display `spinner` prop content when `spinner` is set", async () => {
    const wrapper = mount(Loading, { props: { visible: false } });
    await wrapper.setProps({ visible: true, spinner: "Loading..." });

    expect(wrapper.find(".su-loading-content").text()).toBe("Loading...");
  });

  describe("when called `show` and `close` API", () => {
    afterEach(() => {
      // reset JSDOM
      document.body.innerHTML = "";
    });

    it("should display loading state", () => {
      const loadingProvide = service();

      loadingProvide.show();

      expect(loadingProvide.instance.visible).toBeTruthy();
    });

    it("should display `spinner` prop content", async () => {
      const loadingProvide = service({ spinner: "Loading" });

      loadingProvide.show();

      await nextTick();

      expect(document.querySelector(".su-loading-content").textContent).toBe("Loading");
    });

    describe("when loading state is open", () => {
      const loadingProvide = service();
      loadingProvide.show();

      it("should close loading state", () => {
        loadingProvide.close();

        expect(loadingProvide.instance.visible).toBeFalsy();
      });
    });
  });
});
