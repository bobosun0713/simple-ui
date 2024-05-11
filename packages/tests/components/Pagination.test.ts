import { shallowMount } from "@vue/test-utils";

import Pagination from "@components/pagination/Pagination.vue";

describe("Pagination", () => {
  it("should render default structure", () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        current: 1,
        pager: 5,
        perPage: 5,
        total: 30
      }
    });

    expect(wrapper.findAll(".su-pagination__btn").at(0).exists()).toBeTruthy();
    expect(wrapper.findAll(".su-pagination__btn").at(1).classes()).toBeTruthy();
    expect(wrapper.findAll(".su-pagination__pager")).toHaveLength(5);
    expect(wrapper.findAll(".su-pagination__pager").at(0).classes()).toContain("su-pagination__pager--active");
  });

  describe("when pager button is clicked", () => {
    it("should emit event", async () => {
      const wrapper = shallowMount(Pagination, {
        props: {
          current: 1,
          pager: 5,
          perPage: 5,
          total: 30
        }
      });

      await wrapper.findAll(".su-pagination__pager").at(2).trigger("click");

      expect(wrapper.emitted("update:current")).toBeTruthy();
      expect(wrapper.emitted("update:current")[0]).toEqual([3]);
    });
  });

  describe("when props are set", () => {
    it("should have rounded class", () => {
      const wrapper = shallowMount(Pagination, {
        props: {
          current: 1,
          pager: 5,
          perPage: 5,
          total: 30,
          rounded: true
        }
      });

      expect(wrapper.findAll(".su-pagination__btn").at(0).classes()).toContain("su-pagination__btn--rounded");
      expect(wrapper.findAll(".su-pagination__btn").at(1).classes()).toContain("su-pagination__btn--rounded");

      for (let i = 0; i < wrapper.findAll(".su-pagination__btn").length; i++) {
        expect(wrapper.findAll(".su-pagination__pager").at(i).classes()).toContain("su-pagination__pager--rounded");
      }
    });
    it("should disabled all buttons when disabled prop is set", () => {
      const wrapper = shallowMount(Pagination, {
        props: {
          current: 1,
          pager: 5,
          perPage: 5,
          total: 30,
          disabled: true
        }
      });

      expect(wrapper.findAll(".su-pagination__btn").at(0).classes()).toContain("su-pagination__btn--disabled");
      expect(wrapper.findAll(".su-pagination__btn").at(1).classes()).toContain("su-pagination__btn--disabled");

      for (let i = 0; i < wrapper.findAll(".su-pagination__btn").length; i++) {
        expect(wrapper.findAll(".su-pagination__pager").at(i).classes()).toContain("su-pagination__pager--disabled");
      }
    });
  });

  describe("when prev and next button are in a disabled state", () => {
    it("should disabled prev button on first page", () => {
      const wrapper = shallowMount(Pagination, {
        props: {
          current: 1,
          pager: 5,
          perPage: 5,
          total: 30
        }
      });

      expect(wrapper.findAll(".su-pagination__btn").at(0).classes()).toContain("su-pagination__btn--disabled");
    });

    it("should disabled next button on last page", () => {
      const wrapper = shallowMount(Pagination, {
        props: {
          current: 6,
          pager: 5,
          perPage: 5,
          total: 30
        }
      });

      expect(wrapper.findAll(".su-pagination__btn").at(1).classes()).toContain("su-pagination__btn--disabled");
    });
  });
});
