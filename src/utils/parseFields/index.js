/* eslint-disable no-console */
import isEmpty from "lodash.isempty";

/**
 * Helper function to parse a fields' [name]: value from an array into an object.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @returns {object} - parsed fields with [name]: value.
 * @throws {error}
 */
export default fields => {
  try {
    if (isEmpty(fields)) throw new Error("You must supply an array of fields!");

    const parsedFields = fields.reduce((acc, { name, value }) => {
      switch (name) {
        case "city":
        case "street":
        case "state":
        case "suite":
        case "zipCode": {
          acc["address"] = acc["address"] || {};
          if (value) acc.address[name] = value;
          break;
        }
        default: {
          acc[name] = value;
          break;
        }
      }
      return acc;
    }, {});

    return parsedFields;
  } catch (err) {
    console.error(err.toString());
    return [];
  }
};
