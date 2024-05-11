import { mount } from "@vue/test-utils";

import Table from "@components/table/Table.vue";
import TableColumn from "@components/table/TableColumn.vue";

const mockDataList = [
  {
    title: "Test-1",
    content: "Test Content (1)."
  },
  {
    title: "Test-2",
    content: "Test Content (2)."
  },
  {
    title: "Test-2",
    content: "Test Content (2)."
  }
];

const mockDefaultSort = {
  orderBy: "title",
  sortBy: "desc"
};

function createComponent(components?: string) {
  const wrapper = mount({
    template: components,
    components: {
      STable: Table,
      STableColumn: TableColumn
    },
    props: ["data", "defaultSort", "stickyHeader"]
  });

  return wrapper;
}

describe("Table.vue", () => {
  describe("initliaze", () => {
    it("should render default structure when no data", () => {
      const wrapper = createComponent(`<STable :data="data"></STable>`);

      expect(wrapper.find(".su-table__td--empty").text()).toBe("No Data");
    });
  });

  describe("when setting data", () => {
    it("should render data list", async () => {
      const wrapper = createComponent(
        `
          <STable :data="data">
            <STableColumn prop="title" label="Title"></STableColumn>
            <STableColumn prop="content" label="Content"></STableColumn>
          </STable>
        `
      );

      await wrapper.setProps({ data: mockDataList });

      expect(wrapper.findAll(".su-table__th")).toHaveLength(2);
      expect(wrapper.findAll("tbody .su-table__tr")).toHaveLength(3);
    });
  });

  describe("when slot is set", () => {
    it("should render slot content on header row", async () => {
      const wrapper = createComponent(
        `
          <STable :data="data">

            <STableColumn prop="title" label="Title">
              <template #th>
                Custom slot on title
              </template>
            </STableColumn>

            <STableColumn prop="content" label="Content">
               <template #th>
                Custom slot on content
              </template>
            </STableColumn>

          </STable>
        `
      );

      await wrapper.setProps({ data: mockDataList });

      expect(wrapper.findAll(".su-table__th").at(0).text()).toBe("Custom slot on title");
      expect(wrapper.findAll(".su-table__th").at(1).text()).toBe("Custom slot on content");
    });

    it("should render slot content on body row", async () => {
      const wrapper = createComponent(
        `
          <STable :data="data">
            <STableColumn prop="title" label="Title">
              <template #td>
                Custom slot on title
              </template>
            </STableColumn>

            <STableColumn prop="content" label="Content">
               <template #td>
                Custom slot on content
              </template>
            </STableColumn>
          </STable>
        `
      );

      await wrapper.setProps({ data: mockDataList });

      const firstBodyRow = wrapper.findAll("tbody .su-table__tr").at(0);
      expect(firstBodyRow.findAll(".su-table__td").at(0).text()).toBe("Custom slot on title");
      expect(firstBodyRow.findAll(".su-table__td").at(1).text()).toBe("Custom slot on content");
    });
  });

  describe("when sort and defaultSort props are set", () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = createComponent(
        `
          <STable :data="data" :default-sort="defaultSort">
            <STableColumn prop="title" label="Title" sort></STableColumn>
            <STableColumn prop="content" label="Content" sort></STableColumn>
          </STable>
        `
      );

      await wrapper.setProps({ defaultSort: mockDefaultSort });

      /**
       * Using dynamicImportSettled because Icon is dynamically loaded.
       */
      await vi.dynamicImportSettled();
    });

    it("should have sort class and sort icon on first column", () => {
      const headerRow = wrapper.findAll(".su-table__th");
      expect(headerRow.at(0).classes()).toContain("su-table__th--sort");
      expect(headerRow.at(0).find(".su-table__sort").exists()).toBeTruthy();
    });

    describe("when click sort button", async () => {
      it("should display sort state on first column", async () => {
        const headerRow = wrapper.findAll(".su-table__th");

        await headerRow.at(0).trigger("click");

        expect(headerRow.at(0).find(".su-table__sort").classes()).toContain("su-table__sort--asc");

        await headerRow.at(0).trigger("click");

        expect(headerRow.at(0).find(".su-table__sort").classes()).toContain("su-table__sort--desc");
      });

      it("should change the display of the sort state on the other column", async () => {
        const headerRow = wrapper.findAll(".su-table__th");

        await headerRow.at(1).trigger("click");

        expect(headerRow.at(0).find(".su-table__sort").attributes("style")).toContain("display: none;");
        expect(headerRow.at(1).find(".su-table__sort").exists()).toBeTruthy();
      });
    });
  });

  describe("when stickyHeader prop is set", () => {
    it("should have sticky modifier class on header row", async () => {
      const wrapper = createComponent(
        `
        <STable :data="data" sticky-header>
          <STableColumn prop="title" label="Title" sort></STableColumn>
          <STableColumn prop="content" label="Content" sort></STableColumn>
        </STable>
      `
      );

      await wrapper.setProps({ data: mockDataList });

      const headerRow = wrapper.findAll(".su-table__th");

      for (let i = 0; i < headerRow.length; i++) {
        expect(headerRow.at(i).classes()).toContain("su-table__th--sticky");
      }
    });
  });
});
