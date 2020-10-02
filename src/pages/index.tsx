import { useCallback, useState } from "react";
import toast from "~components/App/Toast";
import Center from "~components/Layout/Center";
import DisplayUserList from "~components/Layout/DisplayUserList";
import UserListNavigation from "~components/Layout/UserListNavigation";
import Header from "~components/Navigation/Header";
import { User } from "~models";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { NextPage, UserData } from "~types";

const ShowUsers: NextPage<{ users: UserData[] }> = ({ users }) => {
  const [state, setState] = useState<UserData[]>(users);

  const seedDB = useCallback(async () => {
    try {
      const res = await app.post("users/seed");
      const users = parseData(res, "users");

      setState(users);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  }, [app, parseData]);

  const dropDB = useCallback(async () => {
    try {
      await app.post("users/drop");

      setState([]);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  }, [app, parseData]);

  return (
    <div data-testid="users-page" style={{ padding: "20px 0 40px" }}>
      <Header title="Users" url="/users" />
      <Center>
        <UserListNavigation dropDB={dropDB} seedDB={seedDB} />
        <DisplayUserList data={state} />
      </Center>
    </div>
  );
};

export const getStaticProps = async (): Promise<{
  props: { users: UserData[] };
  revalidate: number;
}> => {
  const users = await User.find({})
    .lean()
    .then((docs: UserData[]) =>
      docs.map(({ _id, ...rest }) => ({ _id: _id.toString(), ...rest })),
    );

  return {
    props: { users },
    revalidate: 1,
  };
};

export default ShowUsers;
