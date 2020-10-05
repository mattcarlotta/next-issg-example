import { useCallback } from "react";
import app from "~utils/axiosConfig";
import UserForm from "~components/Forms/UserForm";
import { parseMessage } from "~utils/parseResponse";
import invalidatePageCache from "~utils/invalidatePageCache";
import { FC, UserData } from "~types";

const CreateUserForm: FC = () => {
  const createUser = useCallback(
    async (fields: UserData) => {
      try {
        const res = await app.post("users/create", fields);

        await invalidatePageCache("/");

        return { message: parseMessage(res), link: "/" };
      } catch (error) {
        throw String(error);
      }
    },
    [app, parseMessage],
  );

  return <UserForm title="Create User Form" submitForm={createUser} />;
};

export default CreateUserForm;
