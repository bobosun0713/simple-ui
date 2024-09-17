import { mount } from "@vue/test-utils";
import Container from "@components/layout/Container.vue";
import Aside from "@components/layout/Aside.vue";
import Header from "@components/layout/Header.vue";
import Main from "@components/layout/Main.vue";
import Footer from "@components/layout/Footer.vue";

const TEST_TXT = "test";

describe("Container", () => {
  it("should render container", () => {
    const wrapper = mount(Container, {
      slots: {
        default: TEST_TXT
      }
    });

    expect(wrapper.text()).toBe(TEST_TXT);
  });

  it("should have `su-container--vertical` class", () => {
    const wrapper = mount({
      template: `
        <Container>
            <Header/>
        </Container>`,
      components: { Container, Header }
    });

    expect(wrapper.classes()).toContain("su-container--vertical");
  });
});

describe("Aside", () => {
  it("should render aside", () => {
    const wrapper = mount(Aside, {
      slots: {
        default: TEST_TXT
      }
    });

    expect(wrapper.text()).toBe(TEST_TXT);
  });

  it("should have `width` style set to 300 ", () => {
    const wrapper = mount(Aside, {
      props: {
        width: "300"
      }
    });

    expect(wrapper.attributes("style")).toContain("width: 300px");
  });
});

describe("Header", () => {
  it("should render header", () => {
    const wrapper = mount(Header, {
      slots: {
        default: TEST_TXT
      }
    });

    expect(wrapper.text()).toBe(TEST_TXT);
  });

  it("should have `height` style set to 100 ", () => {
    const wrapper = mount(Header, {
      props: {
        height: "100"
      }
    });

    expect(wrapper.attributes("style")).toContain("height: 100px");
  });
});

describe("Main", () => {
  it("should render header", () => {
    const wrapper = mount(Main, {
      slots: {
        default: TEST_TXT
      }
    });

    expect(wrapper.text()).toBe(TEST_TXT);
  });
});

describe("Footer", () => {
  it("should render footer", () => {
    const wrapper = mount(Footer, {
      slots: {
        default: TEST_TXT
      }
    });

    expect(wrapper.text()).toBe(TEST_TXT);
  });

  it("should have `height` style set to 50 ", () => {
    const wrapper = mount(Footer, {
      props: {
        height: "50"
      }
    });

    expect(wrapper.attributes("style")).toContain("height: 50px");
  });
});
