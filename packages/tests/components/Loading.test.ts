import { nextTick } from "vue";
import { mount, type VueWrapper } from "@vue/test-utils";

import Loading from "@components/loading/Loading.vue";
import LoadingService from "@components/loading/Loading";

describe("Loading.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Loading, {
      global: {
        stubs: { SIcon: true }
      }
    });

    expect(wrapper.find(".su-loading").exists()).toBeTruthy();
    expect(wrapper.find(".su-loading-content")).toBeTruthy();
  });

  describe("when set props", () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(Loading, {
        global: {
          stubs: { SIcon: true }
        },
        attachTo: document.body
      });
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should show loading", async () => {
      await wrapper.setProps({ visible: true });

      expect(wrapper.find(".su-loading").isVisible()).toBeTruthy();
    });

    it("should auto close loading", async () => {
      vi.useFakeTimers();

      await wrapper.setProps({ visible: true });

      expect(wrapper.find(".su-loading").isVisible()).toBeTruthy();

      vi.advanceTimersToNextTimer();

      expect(wrapper.emitted("update:visible")[0][0]).toBe(false);

      vi.useRealTimers();
    });
  });

  describe("when set slots", () => {
    it("should render `spinner` slot", () => {
      const wrapper = mount(Loading, {
        props: {
          visible: true
        },
        slots: {
          spinner: "Loading..."
        },
        global: {
          stubs: { SIcon: true }
        }
      });

      expect(wrapper.find(".su-loading-content").text()).toBe("Loading...");
    });
  });

  describe("when use service API", () => {
    it("should show and close loading", async () => {
      const { open, close } = LoadingService({ duration: 0 });

      open();

      await nextTick();

      expect(document.querySelector(".su-loading").getAttribute("style")).not.toBe("display: none;");

      close();

      await nextTick();

      expect(document.querySelector(".su-loading").getAttribute("style")).toBe("display: none;");
    });
  });
});
