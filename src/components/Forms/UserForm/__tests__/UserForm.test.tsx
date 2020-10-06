import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import Router from "next/router";
import UserForm from "../index";

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    back: jest.fn(),
    push: jest.fn(),
  },
}));

const flushPromises = () => new Promise(setImmediate);

const message = "Successfully created user!";
const link = "/";
const submitForm = jest
  .fn()
  .mockImplementationOnce(() => new Promise(res => res({ message, link })))
  .mockImplementationOnce(
    () => new Promise((_, rej) => rej(String("Invalid"))),
  );

const initialProps = {
  _id: "",
  title: "Create user",
  submitForm,
};

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
    suite: "",
    city: "Victoria Valley",
    state: "CA",
    zipCode: "55555",
  },
};

describe("UserForm", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<UserForm {...initialProps} />);
  });

  afterEach(() => {
    submitForm.mockClear();
  });

  it("renders without error ", () => {
    expect(wrapper.find("form")).toExist();
  });

  it("calls the handleChange which updates a field", () => {
    const value = "updated!";
    const name = "userName";
    const inputNode = () => wrapper.find("[data-testid='userName']").first();

    inputNode().simulate("change", { target: { name, value } });

    expect(inputNode()).toHaveProp("value", value);
  });

  it("when a user submits an empty form, the form displays errors", () => {
    wrapper.find("form").simulate("submit");

    expect(wrapper.find("[data-testid='errors']")).toHaveLength(9);
  });

  it("displays an edit form", () => {
    wrapper = mount(<UserForm {...initialProps} {...data} title="Edit Form" />);

    expect(wrapper.find("[data-testid='form-title']").first().text()).toEqual(
      "Edit Form",
    );

    expect(wrapper.find("[data-testid='userName']").first()).toHaveProp(
      "value",
      data.userName,
    );
  });

  it("cancels the form by pushing back to the previous url", async () => {
    wrapper.find("[data-testid='cancel']").simulate("click");

    await flushPromises();
    wrapper.update();

    expect(Router.back).toHaveBeenCalledTimes(1);
  });

  describe("with form data", () => {
    beforeEach(() => {
      [
        "userName",
        "email",
        "firstName",
        "lastName",
        "street",
        "suite",
        "city",
        "state",
        "zipCode",
        "backgroundInfo",
      ].forEach(name => {
        wrapper
          .find(`[data-testid="${name}"]`)
          .first()
          .simulate("change", {
            target: { name, value: "email@123.com" },
          });
      });
    });

    it("when the form is submitted, it calls navigates back to the a page link", async () => {
      wrapper.find("form").simulate("submit");

      await flushPromises();
      wrapper.update();

      expect(Router.push).toHaveBeenCalledWith(link);
      expect(wrapper.find("[data-testid='submit']")).toHaveProp(
        "disabled",
        true,
      );
    });

    it("when the form is submitted a server is thrown and the form submit button is enabled", async () => {
      const submitButton = () => wrapper.find("[data-testid='submit']");
      wrapper.find("form").simulate("submit");
      expect(submitButton()).toHaveProp("disabled", true);

      await act(async () => {
        await flushPromises();
        wrapper.update();
        expect(submitButton()).toHaveProp("disabled", false);
      });
    });
  });
});
