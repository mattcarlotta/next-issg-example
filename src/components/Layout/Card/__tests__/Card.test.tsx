import { mount } from "enzyme";
import Router from "next/router";
import Card from "../index";

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    back: jest.fn(),
    push: jest.fn(),
  },
}));

const deleteUser = jest.fn();

const data = {
  _id: "1323454",
  email: "thefifthelement@example.com",
  firstName: "Bob",
  lastName: "Smith",
  userName: "bobbin4apples",
  backgroundInfo:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  address: {
    street: "123 Galena St.",
    suite: "88",
    city: "Victoria Valley",
    state: "CA",
    zipCode: "55555",
  },
};

const wrapper = mount(<Card {...data} deleteUser={deleteUser} />);

const findNode = (id: string) => wrapper.find(`[data-testid='${id}']`).first();

describe("Card with UserActions", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
    expect(findNode("avatar").text()).toEqual("BS");
    expect(findNode("name").text()).toContain(
      `${data.firstName} ${data.lastName}`,
    );
    expect(findNode("email").text()).toContain(data.email);
    expect(findNode("street").text()).toContain(data.address.street);
    expect(findNode("suite").text()).toContain(data.address.suite);
    expect(findNode("city").text()).toContain(data.address.city);
    expect(findNode("state").text()).toContain(data.address.state);
    expect(findNode("zip-code").text()).toContain(data.address.zipCode);
    expect(findNode("background").text()).toContain(data.backgroundInfo);
  });

  it("when the edit button is clicked, pushes to an edit page", () => {
    wrapper
      .find("[data-testid='dropdown-container']")
      .first()
      .simulate("click");
    wrapper.find("[data-testid='edit']").first().simulate("click");

    expect(Router.push).toHaveBeenCalledWith(`/users/edit/${data._id}`);
  });

  it("when the delete button is clicked, pushes to an edit page", () => {
    wrapper.find("[data-testid='delete']").first().simulate("click");

    expect(deleteUser).toHaveBeenCalledWith(data._id);
  });
});
