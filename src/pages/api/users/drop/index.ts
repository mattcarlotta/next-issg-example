import { User } from "~models";
import { NextApiRequest, NextApiResponse } from "~types";

const DropDB = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  try {
    await User.deleteMany({});
    res.status(201).end();
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
};

export default DropDB;
