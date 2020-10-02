/* istanbul ignore file */
import styled from "@emotion/styled";
import Router from "next/router";
import { BsServer, BsPersonPlusFill, BsTrashFill } from "react-icons/bs";
import Button from "~components/Layout/Button";
import FlexEvenly from "~components/Layout/FlexEvenly";
import { FC, CSSProperties, UserListNavigationProps } from "~types";

const iconStyle = {
  position: "relative",
  top: 2,
  fontSize: 18,
  marginRight: 8,
} as CSSProperties;

const UserListNavigation: FC<UserListNavigationProps> = ({
  className,
  dropDB,
  seedDB,
}) => (
  <div data-testid="user-list-navigation" className={className}>
    <FlexEvenly width="780px" flexwrap margin="20px auto 10px">
      <Button dataTestId="seed-database" type="button" onClick={seedDB}>
        <BsServer style={iconStyle} />
        Seed DB
      </Button>
      <Button dataTestId="drop-database" type="button" onClick={dropDB}>
        <BsTrashFill style={iconStyle} />
        Drop DB
      </Button>
      <Button
        dataTestId="open-modal"
        type="button"
        onClick={() => Router.push("/users/create")}
      >
        <BsPersonPlusFill style={iconStyle} />
        Create User
      </Button>
    </FlexEvenly>
  </div>
);

export default styled(UserListNavigation)`
  @media (max-width: 800px) {
    ${FlexEvenly} {
      display: block !important;
      margin-bottom: 10px;
      width: 100% !important;

      button {
        display: block !important;
        margin: 5px auto 0;
      }
    }
  }

  margin-bottom: 10px;
`;
