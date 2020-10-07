/* istanbul ignore file */
import axios from "axios";
import toast from "~components/App/Toast";

const { NODE_ENV, LOCALHOST } = process.env;
const inProduction = NODE_ENV === "production";

/**
 * Helper function to fetch page to invalidate page cache.
 *
 * @function
 * @param {string} URL - page to invalidate
 * @returns Promise<any>
 */

const invalidatePageCache = async (URL: string): Promise<any> => {
  if (inProduction) {
    try {
      await axios.get(`${LOCALHOST}${URL}`);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  }
};

export default invalidatePageCache;
