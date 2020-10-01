import { useCallback } from "react";
import Center from "~components/Layout/Center";
import DisplayUserList from "~components/Layout/DisplayUserList";
import FadeIn from "~components/Layout/FadeIn";
import UserListNavigation from "~components/Layout/UserListNavigation";
import Header from "~components/Navigation/Header";
import { User } from "~models";
import { NextPage, UserData } from "~types";

const ShowUsers: NextPage<{ users: UserData[] }> = ({ users }) => {
  const seedDBAction = useCallback(() => {}, []);

  return (
    <div data-testid="users-page" style={{ padding: "20px 0 40px" }}>
      <Header title="Users" url="/users" />
      <Center>
        <UserListNavigation seedDB={seedDBAction} />
        <FadeIn timing="0.3s">
          <DisplayUserList data={users} />
        </FadeIn>
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
