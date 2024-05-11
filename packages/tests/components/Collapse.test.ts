import { createComponent } from "@utils/index";

import SCollapse from "@components/collapse/Collapse.vue";
import SCollapseItem from "@components/collapse/CollapseItem.vue";

function mountCollapse(template: string) {
  return createComponent(
    {
      template,
      components: { SCollapse, SCollapseItem }
    },
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
    const wrapper = mountCollapse(`
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
      const wrapper = mountCollapse(`
      <SCollapse>

        <SCollapseItem title="Vitest"></SCollapseItem>
        
      </SCollapse>
      `);
      expect(wrapper.find(".su-collapse-item__header").text()).toContain("Vitest");
    });

    it("should show `content` prop content", () => {
      const wrapper = mountCollapse(`
      <SCollapse>

        <SCollapseItem content="Vitest"></SCollapseItem>

      </SCollapse>
      `);
      expect(wrapper.find(".su-collapse-item__content").text()).toContain("Vitest");
    });
  });

  describe("when set slot", () => {
    it("should render `title` slot", () => {
      const wrapper = mountCollapse(`
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
      const wrapper = mountCollapse(`
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
      const wrapper = mountCollapse(`
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
      const wrapper = mountCollapse(`
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
