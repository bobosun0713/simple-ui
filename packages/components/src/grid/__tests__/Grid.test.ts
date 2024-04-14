import { mount } from "@vue/test-utils";
import SGrid from "../Grid.vue";
import SGridItem from "..//GridItem.vue";

function createComponent(components?: string) {
  const wrapper = mount({
    template: components,
    components: {
      SGrid,
      SGridItem
    },
    props: ["data", "defaultSort", "stickyHeader"]
  });

  return wrapper;
}

describe("Grid.vue", () => {
  it("should render default structure", async () => {
    const wrapper = createComponent(`
      <SGrid>
        <SGridItem>Test</SGridItem>
      </SGrid>
    `);

    expect(wrapper.find(".su-grid").attributes("style")).toBe("gap: 0px;");
    expect(wrapper.find(".su-grid-item").text()).toBe("Test");
  });
});
