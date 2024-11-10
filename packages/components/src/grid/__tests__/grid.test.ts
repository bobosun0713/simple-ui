import { createComponent } from "@utils/index";

import SGrid from "../Grid.vue";
import SGridItem from "../GridItem.vue";

describe("Grid.vue", () => {
  it("should render default structure", () => {
    const wrapper = createComponent(
      `
      <SGrid>
        <SGridItem>Test</SGridItem>
      </SGrid>
    `,
      {
        components: { SGrid, SGridItem },
        props: ["data", "defaultSort", "stickyHeader"]
      }
    );

    expect(wrapper.find(".su-grid").attributes("style")).toBe("gap: 0px;");
    expect(wrapper.find(".su-grid-item").text()).toBe("Test");
  });
});
