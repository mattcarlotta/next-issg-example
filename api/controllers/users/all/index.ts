import User from "~models/user";
import { Request, Response } from "~types";

const getUsers = async (_: Request, res: Response): Promise<any> => {
  const users = await User.find({});

  res.status(200).send({ users });
};

export default getUsers;
