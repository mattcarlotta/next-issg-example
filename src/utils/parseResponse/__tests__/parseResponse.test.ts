import { AxiosResponse } from "axios";
import { parseData, parseMessage } from "../index";

describe("Parse Data & Message", () => {
  it("parses data from an API response", () => {
    const data = { email: "test@example.com" };
    const res = {
      data,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    expect(parseData(res)).toEqual(data);
  });

  it("parses a messages from an API response", () => {
    const message = { message: "Test" };
    const res: AxiosResponse<any> = {
      data: { message },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    expect(parseMessage(res)).toEqual(message);
  });
});
