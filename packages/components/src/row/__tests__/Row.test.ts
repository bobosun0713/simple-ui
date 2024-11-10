import { createComponent } from "@utils/index";

import Row from "../Row.vue";
import Col from "../../col/Col.vue";

describe("Row.vue", () => {
  it("should render default structure", () => {
    const wrapper = createComponent("<SRow></SRow>", {
      components: {
        SRow: Row,
        SCol: Col
      },
      props: ["data", "defaultSort", "stickyHeader"]
    });

    expect(wrapper.attributes("style")).toMatch("margin-left");
    expect(wrapper.attributes("style")).toMatch("margin-right");
  });

  describe("when set props", () => {
    it("should have `gutter` attribute", () => {
      const wrapper = createComponent("<SRow :gutter='5'></SRow>", {
        components: {
          SRow: Row,
          SCol: Col
        },
        props: ["data", "defaultSort", "stickyHeader"]
      });

      expect(wrapper.attributes("style")).toContain("margin-left: -5px; margin-right: -5px");
    });

    it("should have 'su-row--justify-center' class", () => {
      const wrapper = createComponent("<SRow justify='center'></SRow>", {
        components: {
          SRow: Row,
          SCol: Col
        },
        props: ["data", "defaultSort", "stickyHeader"]
      });

      expect(wrapper.classes("su-row--justify-center")).toBeTruthy();
    });

    it("should have 'su-row--align-center' class", () => {
      const wrapper = createComponent("<SRow align='center'></SRow>", {
        components: {
          SRow: Row,
          SCol: Col
        },
        props: ["data", "defaultSort", "stickyHeader"]
      });

      expect(wrapper.classes("su-row--align-center")).toBeTruthy();
    });
  });

  describe("when set slots", () => {
    it("should render row with `default` slot", () => {
      const wrapper = createComponent(
        `
          <SRow>
            <SCol>Col 1</SCol>
          </SRow>
        `,
        {
          components: {
            SRow: Row,
            SCol: Col
          },
          props: ["data", "defaultSort", "stickyHeader"]
        }
      );

      const col = wrapper.find(".su-col");

      expect(col.text()).toBe("Col 1");
      expect(col.attributes("style")).toMatch("padding-left");
      expect(col.attributes("style")).toMatch("padding-right");
      expect(col.attributes("style")).toMatch("width");
    });
  });
});
