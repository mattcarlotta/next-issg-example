import Router from "next/router";
import { BsPencilSquare, BsThreeDots, BsTrash } from "react-icons/bs";
import Dropdown from "~components/Layout/Dropdown";
import Menu from "~components/Layout/Menu";
import MenuButton from "~components/Layout/MenuButton";
import MenuItem from "~components/Layout/MenuItem";
import { FC, CardProps } from "~types";

const UserActions: FC<Pick<CardProps, "_id" | "deleteUser">> = ({
  _id,
  deleteUser,
}) => (
  <Dropdown
    menu={
      <Menu>
        <MenuItem>
          <MenuButton
            role="button"
            data-testid="edit"
            onClick={() => Router.push(`/users/edit/${_id}`)}
          >
            <BsPencilSquare />
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            role="button"
            data-testid="delete"
            onClick={() => deleteUser(_id)}
          >
            <BsTrash />
          </MenuButton>
        </MenuItem>
      </Menu>
    }
  >
    <BsThreeDots />
  </Dropdown>
);

export default UserActions;
