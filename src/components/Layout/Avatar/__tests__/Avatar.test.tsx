import { mount, ReactWrapper } from "enzyme";
import Avatar from "../index";

// const initProps = {
//   size?: "sm",
//   border?: string;
//   margin?: string;
// };

describe("Avatar", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Avatar data-testid />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveStyleRule("border-radius", "4px");
    expect(wrapper).toHaveStyleRule("margin", "0 5px 0 0");
    expect(wrapper).toHaveStyleRule("height", "28px");
    expect(wrapper).toHaveStyleRule("width", "28px");
    expect(wrapper).toHaveStyleRule("font-size", "12px");
  });

  it("sets a border-radius and margin", () => {
    wrapper.setProps({ margin: "5px", border: "10px" });

    expect(wrapper).toHaveStyleRule("border-radius", "10px");
    expect(wrapper).toHaveStyleRule("margin", "5px");
  });

  it("sets a small avatar", () => {
    wrapper.setProps({ size: "sm" });

    expect(wrapper).toHaveStyleRule("height", "28px");
    expect(wrapper).toHaveStyleRule("width", "28px");
    expect(wrapper).toHaveStyleRule("font-size", "12px");
  });

  it("sets a medium avatar", () => {
    wrapper.setProps({ size: "md" });

    expect(wrapper).toHaveStyleRule("height", "50px");
    expect(wrapper).toHaveStyleRule("width", "50px");
    expect(wrapper).toHaveStyleRule("font-size", "20px");
  });

  it("sets a large avatar", () => {
    wrapper.setProps({ size: "lg" });

    expect(wrapper).toHaveStyleRule("height", "150px");
    expect(wrapper).toHaveStyleRule("width", "150px");
    expect(wrapper).toHaveStyleRule("font-size", "50px");
  });
});
