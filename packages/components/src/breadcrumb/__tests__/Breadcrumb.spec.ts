import { mount } from "@vue/test-utils";
import Breadcrumb from "../Breadcrumb.vue";

const push = vi.fn();

vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push
  }))
}));

describe("Breadcrumb.vue", () => {
  it("should render default structure", () => {
    const wrapper = mount(Breadcrumb, { props: { items: ["Home", "Product"] } });

    const breadcrumbLinks = wrapper.findAll(".su-breadcrumb-link");

    expect(breadcrumbLinks).toHaveLength(2);
    expect(breadcrumbLinks[0].text()).toBe("Home");
    expect(breadcrumbLinks[1].text()).toBe("Product");
  });

  describe("when set props", () => {
    it("should show prepend content when prepend prop is set", () => {
      const wrapper = mount(Breadcrumb, { props: { prepend: "test", items: ["Home", "Product"] } });

      expect(wrapper.find(".su-breadcrumb__prepend").text()).toBe("test");
    });

    it("should show separator content when separator prop is set", () => {
      const wrapper = mount(Breadcrumb, { props: { separator: "-", items: ["Home", "Product"] } });

      expect(wrapper.find(".su-breadcrumb__separator").text()).toBe("-");
    });
  });

  describe("when items prop is array of objects", () => {
    it("should show disabled link", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            { title: "Home", href: "/" },
            { title: "Produce", href: "/product", disabled: true }
          ]
        }
      });

      const breadcrumbLinks = wrapper.findAll(".su-breadcrumb-link");

      expect(breadcrumbLinks[1].classes()).toContain("su-breadcrumb-link--disabled");
    });
  });

  describe("when set slots", () => {
    it("should show prepend when prepend slot is set", () => {
      const wrapper = mount(Breadcrumb, {
        slots: {
          prepend: "prepend slot"
        }
      });

      expect(wrapper.find(".su-breadcrumb__prepend").text()).toBe("prepend slot");
    });

    it("should show separator when separator slot is set", () => {
      const wrapper = mount(Breadcrumb, {
        props: { items: ["Home", "Product"] },
        slots: {
          separator: "separator slot"
        }
      });

      expect(wrapper.find(".su-breadcrumb__separator").text()).toBe("separator slot");
    });
  });

  describe("when set event", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });

    it("should trigger router.push when click an href link", async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            { title: "Home", href: "/" },
            { title: "Produce", href: "/product" }
          ]
        }
      });

      const breadcrumbLinks = wrapper.findAll(".su-breadcrumb-link");

      await breadcrumbLinks[0].trigger("click");

      expect(push).toHaveBeenCalledWith("/");

      await breadcrumbLinks[1].trigger("click");

      expect(push).toHaveBeenCalledWith("/product");
    });

    it("should not trigger router.push when click an href link if the link is disabled", async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            { title: "Home", href: "/" },
            { title: "Produce", href: "/product", disabled: true }
          ]
        }
      });

      const breadcrumbLinks = wrapper.findAll(".su-breadcrumb-link");

      await breadcrumbLinks[1].trigger("click");

      expect(push).not.toHaveBeenCalled();
    });
  });
});
