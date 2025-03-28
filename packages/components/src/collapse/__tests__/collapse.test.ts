import { createComponent } from "@utils/index";

import SCollapse from "../Collapse.vue";
import SCollapseItem from "../CollapseItem.vue";
import { VueWrapper } from "@vue/test-utils";

function createCollapse(template: string): VueWrapper {
  return createComponent(
    template,
    { components: { SCollapse, SCollapseItem } },
    {
      global: {
        stubs: {
          SIcon: true
        }
      }
    }
  );
}

describe("Collapse.vue", () => {
  it("should render default structure", () => {
    const wrapper = createCollapse(`
    <SCollapse>

       <SCollapseItem></SCollapseItem>

    </SCollapse>
    `);

    expect(wrapper.classes("su-collapse")).toBeTruthy();
    expect(wrapper.find(".su-collapse-item__header").text()).toContain("Tips");
    expect(wrapper.find(".su-collapse-item__content").text()).toContain("Collapse Content");
  });

  describe("when set props", () => {
    it("should show `title` prop content", () => {
      const wrapper = createCollapse(`
      <SCollapse>

        <SCollapseItem title="Vitest"></SCollapseItem>
        
      </SCollapse>
      `);
      expect(wrapper.find(".su-collapse-item__header").text()).toContain("Vitest");
    });

    it("should show `content` prop content", () => {
      const wrapper = createCollapse(`
      <SCollapse>

        <SCollapseItem content="Vitest"></SCollapseItem>

      </SCollapse>
      `);
      expect(wrapper.find(".su-collapse-item__content").text()).toContain("Vitest");
    });
  });

  describe("when set slot", () => {
    it("should render `title` slot", () => {
      const wrapper = createCollapse(`
      <SCollapse>

        <SCollapseItem>
          <template #title>
            Title
          </template>
        </SCollapseItem>

      </SCollapse>
      `);

      expect(wrapper.find(".su-collapse-item__header").text()).toContain("Title");
    });

    it("should render `default` slot", () => {
      const wrapper = createCollapse(`
      <SCollapse>

        <SCollapseItem>
          <template #default>
            Content
          </template>
        </SCollapseItem>

      </SCollapse>
      `);

      expect(wrapper.find(".su-collapse-item__content").text()).toContain("Content");
    });
  });

  describe("when click events", () => {
    it("should toggle collapse item", async () => {
      const wrapper = createCollapse(`
      <SCollapse>

        <SCollapseItem></SCollapseItem>

      </SCollapse>
      `);

      await wrapper.find(".su-collapse-item").trigger("click");

      expect(wrapper.find(".su-collapse-item__header--active").exists()).toBeTruthy();
      expect(wrapper.find(".su-collapse-item__icon--active").exists()).toBeTruthy();

      await wrapper.find(".su-collapse-item").trigger("click");

      expect(wrapper.find(".su-collapse-item__header--active").exists()).toBeFalsy();
      expect(wrapper.find(".su-collapse-item__icon--active").exists()).toBeFalsy();
    });

    it("should toggle multiple collapse item in `accordion` mode", async () => {
      const wrapper = createCollapse(`
      <SCollapse accordion>

        <SCollapseItem name="v1"></SCollapseItem>
        <SCollapseItem name="v2"></SCollapseItem>

      </SCollapse>
      `);

      const collapseItemV1 = wrapper.findAll(".su-collapse-item")[0];
      const collapseItemV2 = wrapper.findAll(".su-collapse-item")[1];

      await collapseItemV1.trigger("click");

      expect(collapseItemV1.find(".su-collapse-item__header--active").exists()).toBeTruthy();
      expect(collapseItemV1.find(".su-collapse-item__icon--active").exists()).toBeTruthy();

      await collapseItemV2.trigger("click");

      expect(collapseItemV1.find(".su-collapse-item__header--active").exists()).toBeFalsy();
      expect(collapseItemV1.find(".su-collapse-item__icon--active").exists()).toBeFalsy();

      expect(collapseItemV2.find(".su-collapse-item__header--active").exists()).toBeTruthy();
      expect(collapseItemV2.find(".su-collapse-item__icon--active").exists()).toBeTruthy();
    });
  });
});
