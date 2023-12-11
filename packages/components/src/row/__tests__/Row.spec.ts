import { mount } from "@vue/test-utils";
import SRow from "../Row.vue";
import SCol from "../../col/Col.vue";

function createComponent(components?: string) {
  const wrapper = mount({
    template: components,
    components: {
      SRow,
      SCol
    },
    props: ["data", "defaultSort", "stickyHeader"]
  });

  return wrapper;
}

describe("Row.vue", () => {
  it("should render default structure", () => {
    const wrapper = createComponent("<SRow></SRow>");

    expect(wrapper.attributes("style")).toMatch("margin-left");
    expect(wrapper.attributes("style")).toMatch("margin-right");
  });

  describe("when props are set", () => {
    it("should have gutter attribute", () => {
      const wrapper = createComponent("<SRow gutter='5'></SRow>");

      expect(wrapper.attributes("style")).toContain("margin-left: -5px; margin-right: -5px");
    });

    it("should have '.su-row--justify-center' class when justify prop is set", () => {
      const wrapper = createComponent("<SRow justify='center'></SRow>");

      expect(wrapper.classes()).toContain("su-row--justify-center");
    });

    it("should have '.su-row--align-center' class when align prop is set", () => {
      const wrapper = createComponent("<SRow align='center'></SRow>");

      expect(wrapper.classes()).toContain("su-row--align-center");
    });
  });

  describe("when slot is set", () => {
    it("should render slot content with col component", () => {
      const wrapper = createComponent(
        `
          <SRow>
            <SCol>Col 1</SCol>
          </SRow>
        `
      );

      const col = wrapper.find(".su-col");

      expect(col.text()).toBe("Col 1");
      expect(col.attributes("style")).toMatch("padding-left");
      expect(col.attributes("style")).toMatch("padding-right");
      expect(col.attributes("style")).toMatch("width");
    });
  });
});
