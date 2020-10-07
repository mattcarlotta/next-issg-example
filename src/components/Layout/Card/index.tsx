import styled from "@emotion/styled";
import Avatar from "~components/Layout/Avatar";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import UserActions from "~components/Layout/UserActions";
import UserDetails from "~components/Layout/UserDetails";
import UserName from "~components/Layout/UserName";
import toInitials from "~utils/toInitials";
import UserAddress from "./UserAddress";
import UserBackground from "./UserBackground";
import { FC, CardProps } from "~types";

const Divider = styled.li`
  display: inline-block;
  content: "";
  height: 10px;
  margin: 0 10px;
  border-left: 1px solid #d3d3d3;
`;

const CardComponent: FC<CardProps> = ({
  className,
  _id,
  address: { street, state, suite, city, zipCode },
  backgroundInfo,
  email,
  firstName,
  deleteUser,
  lastName,
  userName,
}) => (
  <div data-testid="card-container" className={className}>
    <Flex>
      <FlexStart>
        <Avatar data-testid="avatar">
          {toInitials(`${firstName} ${lastName}`)}
        </Avatar>
        <UserName data-testid="name">
          {firstName} {lastName}
        </UserName>
      </FlexStart>
      <FlexEnd>
        <UserActions _id={_id} deleteUser={deleteUser} />
      </FlexEnd>
    </Flex>
    <UserDetails data-testid="username">
      <strong>username</strong>:&nbsp;{userName}
    </UserDetails>
    <UserDetails data-testid="email">
      <strong>email</strong>:&nbsp;{email}
    </UserDetails>
    <UserAddress>
      <li>
        <strong>address</strong>:&nbsp;
      </li>
      <li data-testid="street">{street}</li>
      <Divider />
      {suite && (
        <>
          <li data-testid="suite">{suite}</li>
          <Divider />
        </>
      )}
      <li data-testid="city">{city}</li>
      <Divider />
      <li data-testid="state">{state}</li>
      <Divider />
      <li data-testid="zip-code">{zipCode}</li>
    </UserAddress>
    <UserBackground>
      <p data-testid="background">{backgroundInfo}</p>
    </UserBackground>
  </div>
);

const Card = styled(CardComponent)`
  @media (max-width: 500px) {
    ${Flex},${FlexStart}, ${FlexEnd} {
      display: block !important;
      width: 100%;
    }
    text-align: center;
  }
`;

export default Card;
