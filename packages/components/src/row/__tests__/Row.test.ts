import { createComponent } from "@utils/index";

import Row from "../Row.vue";
import Col from "../../col/Col.vue";

describe("Row.vue", () => {
  it("should render default structure", () => {
    const wrapper = createComponent(`<SRow></SRow>`, {
      components: {
        SRow: Row,
        SCol: Col
      }
    });

    expect(wrapper.classes()).toContain("su-row--middle");
  });

  describe("when set props", () => {
    it("should have `gutter` attribute", () => {
      const wrapper = createComponent(
        `<SRow :gutter='5'>
          <SCol>test</SCol>
        </SRow>
        `,
        {
          components: {
            SRow: Row,
            SCol: Col
          }
        }
      );

      expect(wrapper.findComponent({ name: "SCol" })?.attributes("style")).toContain(
        "padding-left: 5px; padding-right: 5px;"
      );
    });

    it.each([
      { align: "top", expected: "su-row--top" },
      { align: "middle", expected: "su-row--middle" },
      { align: "bottom", expected: "su-row--bottom" }
    ])("should have $expected class", ({ align, expected }) => {
      const wrapper = createComponent(`<SRow align='${align}'></SRow>`, {
        components: {
          SRow: Row,
          SCol: Col
        }
      });

      expect(wrapper.classes()).toContain(expected);
    });
  });

  describe("when set slots", () => {
    it("should render row with `default` slot", () => {
      const wrapper = createComponent(
        `
          <SRow>
            <SCol>test</SCol>
          </SRow>
        `,
        {
          components: {
            SRow: Row,
            SCol: Col
          }
        }
      );

      const col = wrapper.find(".su-col");

      expect(col.text()).toBe("test");
      expect(col.attributes("style")).toMatch("padding-left");
      expect(col.attributes("style")).toMatch("padding-right");
      expect(col.attributes("style")).toMatch("width");
    });
  });
});
