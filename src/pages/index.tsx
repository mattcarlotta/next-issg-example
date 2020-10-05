import { useCallback, useState } from "react";
import toast from "~components/App/Toast";
import Center from "~components/Layout/Center";
import DisplayUserList from "~components/Layout/DisplayUserList";
import UserListNavigation from "~components/Layout/UserListNavigation";
import Header from "~components/Navigation/Header";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import invalidatePageCache from "~utils/invalidatePageCache";
import { NextPage, UserDetails } from "~types";

const ShowUsers: NextPage<{ users: UserDetails[] }> = ({ users }) => {
  const [state, setState] = useState<UserDetails[]>(users);

  const seedDB = useCallback(async () => {
    try {
      const res = await app.post("users/seed");
      const users = parseData(res, "users");

      await invalidatePageCache("/");

      setState(users);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  }, [app, parseData]);

  const dropDB = useCallback(async () => {
    try {
      await app.post("users/drop");

      await invalidatePageCache("/");

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
  props: { users: UserDetails[] };
  revalidate: number;
}> => {
  const res = await app.get("users");
  const users: UserDetails[] = parseData(res, "users");

  return {
    props: { users },
    revalidate: 1,
  };
};

export default ShowUsers;
