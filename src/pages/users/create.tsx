import { useCallback } from "react";
import app from "~utils/axiosConfig";
import UserForm from "~components/Forms/UserForm";
import { parseMessage } from "~utils/parseResponse";
import { FC, UserData } from "~types";

const CreateUserForm: FC = () => {
  const createUser = useCallback(
    async (fields: UserData) => {
      try {
        const res = await app.post("users/create", fields);
        return parseMessage(res);
      } catch (error) {
        throw String(error);
      }
    },
    [app, parseMessage],
  );

  return <UserForm submitForm={createUser} />;
};

export default CreateUserForm;
