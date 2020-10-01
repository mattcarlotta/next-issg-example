/* istanbul ignore file */
import styled from "@emotion/styled";
import Router from "next/router";
import { BsServer, BsPersonPlusFill } from "react-icons/bs";
import Button from "~components/Layout/Button";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import { CSSProperties, UserListNavigationProps } from "~types";

const iconStyle = {
  position: "relative",
  top: 2,
  fontSize: 18,
  marginRight: 8,
} as CSSProperties;

const UserListNavigation = ({ className, seedDB }: UserListNavigationProps) => (
  <div data-testid="user-list-navigation" className={className}>
    <Flex width="780px" style={{ margin: "20px auto 10px" }}>
      <FlexStart>
        <Button dataTestId="seed-database" type="button" onClick={seedDB}>
          <BsServer style={iconStyle} />
          Seed Database
        </Button>
      </FlexStart>
      <FlexEnd>
        <Button
          dataTestId="open-modal"
          type="button"
          onClick={() => Router.push("/users/create")}
        >
          <BsPersonPlusFill style={iconStyle} />
          Create User
        </Button>
      </FlexEnd>
    </Flex>
  </div>
);

export default styled(UserListNavigation)`
  @media (max-width: 800px) {
    ${Flex},${FlexStart}, ${FlexEnd} {
      display: block !important;
      margin-bottom: 10px;
      width: 100% !important;
    }
  }

  margin-bottom: 10px;
`;
