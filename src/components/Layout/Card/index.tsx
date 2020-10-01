import styled from "@emotion/styled";
import Avatar from "~components/Layout/Avatar";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import FadeIn from "~components/Layout/FadeIn";
import UserActions from "~components/Layout/UserActions";
import UserDetails from "~components/Layout/UserDetails";
import UserName from "~components/Layout/UserName";
import toInitials from "~utils/toInitials";
import UserAddress from "./UserAddress";
import UserBackground from "./UserBackground";
import { CardProps } from "~types";

const Divider = styled.li`
  display: inline-block;
  content: "";
  height: 10px;
  margin: 0 10px;
  border-left: 1px solid #d3d3d3;
`;

const CardComponent = ({
  className,
  _id,
  idx,
  address: { street, state, suite, city, zipCode },
  backgroundInfo,
  email,
  firstName,
  deleteUser,
  lastName,
  userName,
}: CardProps): JSX.Element => (
  <FadeIn data-testid="card-container" timing={`${0.5 + idx / 10}s`}>
    <div className={className}>
      <Flex>
        <FlexStart>
          <Avatar>{toInitials(`${firstName} ${lastName}`)}</Avatar>
          <UserName>{userName}</UserName>
        </FlexStart>
        <FlexEnd>
          <UserActions _id={_id} deleteUser={deleteUser} />
        </FlexEnd>
      </Flex>
      <UserDetails>{email}</UserDetails>
      <UserAddress>
        <li>{street}</li>
        <Divider />
        {suite && (
          <>
            <li>{suite}</li>
            <Divider />
          </>
        )}
        <li>{city}</li>
        <Divider />
        <li>{state}</li>
        <Divider />
        <li>{zipCode}</li>
      </UserAddress>
      <UserBackground>
        <p>{backgroundInfo}</p>
      </UserBackground>
    </div>
  </FadeIn>
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
