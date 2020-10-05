import { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import toast from "~components/App/Toast";
import UserForm from "~components/Forms/UserForm";
import LoadingUsers from "~components/Layout/LoadingUsers";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import invalidatePageCache from "~utils/invalidatePageCache";
import { FC, UserData } from "~types";

const EditUserForm: FC = () => {
  const [user, setUser] = useState<UserData>({});
  const {
    query: { id },
  } = useRouter();

  const updateUser = useCallback(
    async (fields: UserData) => {
      try {
        const res = await app.put(`users/update/${id}`, { ...fields });
        const userPage = `/users/${id}`;

        await invalidatePageCache("/");
        await invalidatePageCache(userPage);

        return { message: parseMessage(res), link: userPage };
      } catch (error) {
        throw String(error);
      }
    },
    [app, id, parseMessage],
  );

  const fetchUser = useCallback(async () => {
    try {
      const res = await app.get(`users/view/${id}`);
      const user = parseData(res, "user");

      setUser(user);
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      Router.push("/");
    }
  }, [app, id, setUser, toast]);

  useEffect(() => {
    fetchUser();
  }, []);

  return isEmpty(user) ? (
    <LoadingUsers />
  ) : (
    <UserForm title="Edit User Form" {...user} submitForm={updateUser} />
  );
};

export default EditUserForm;
