import Tooltip from "../Tooltip.vue";
import { mount } from "@vue/test-utils";
import type { VNode } from "vue";

describe("Button.vue", () => {
  document.body.innerHTML = `
  <div>
    <div id="app"></div>
  </div>
`;

  const createComponent = (props: object | any = {}, content: string | VNode = "") =>
    mount(
      {
        template: `<Tooltip label="${props.label}" position="${props.position || "top"}" :show-arrow="${
          props.showArrow
        }">  ${content} </Tooltip>`,
        components: {
          Tooltip
        }
      },
      {
        attachTo: "#app"
      }
    );

  it("should render default structure", async () => {
    const wrapper = createComponent({ label: "testing", showArrow: true }, "<button type='button'>Button</button>");

    await wrapper.find("button").trigger("mouseenter");

    expect(wrapper.find(".su-tooltip-content").text()).toBe("testing");
    expect(wrapper.find(".su-tooltip-content").classes()).toContain("su-tooltip-content--top");
  });

  it("should render slot content", async () => {
    const wrapper = createComponent({ label: "testing", showArrow: true }, "<h1>Tooltip</h1>");

    expect(wrapper.find(".su-tooltip-trigger").text()).toBe("Tooltip");
  });

  it("should not show arrow", async () => {
    const wrapper = createComponent({ label: "testing", showArrow: false }, "<button type='button'>Button</button>");

    await wrapper.find("button").trigger("mouseenter");

    expect(wrapper.find(".su-tooltip-content").classes()).toContain("su-tooltip-content--disabled-arrow");
  });
});
