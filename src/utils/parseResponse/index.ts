import get from "lodash.get";
import { AxiosResponse } from "~types";

/**
 * Helper function to parse a message from an API response.
 *
 * @param {array} res - an API response.
 * @returns {string | undefined} a parsed message string from res.data.message.
 */
export function parseMessage(res: AxiosResponse): string | undefined {
  return get(res, ["data", "message"]);
}

/**
 * Helper function to parse data from an API response.
 *
 * @param {array} res - an API response.
 * @returns {any} a parsed data object from res.data or undefined.
 */
export function parseData(res: AxiosResponse, ...opts: string[]): any {
  return get(res, ["data", ...opts]);
}
