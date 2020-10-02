import styled from "@emotion/styled";
import Avatar from "~components/Layout/Avatar";
import FadeIn from "~components/Layout/FadeIn";
import MiniCard from "~components/Layout/MiniCard";
import Link from "~components/Navigation/Link";
import toInitials from "~utils/toInitials";
import { FC, UserCardProps } from "~types";

const User = styled.div`
  margin: 0;
  font-size: 25px;
  color: #000;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserCard: FC<UserCardProps> = ({
  _id,
  idx,
  firstName,
  lastName,
  userName,
}) => (
  <FadeIn data-testid="card-container" timing={`${0.5 + idx / 5}s`}>
    <Link href={`/users/${_id}`}>
      <MiniCard data-testid="mini-card">
        <Avatar border="50%" size="lg" margin="0 auto">
          {toInitials(`${firstName} ${lastName}`)}
        </Avatar>
        <User>{userName}</User>
      </MiniCard>
    </Link>
  </FadeIn>
);

export default UserCard;
