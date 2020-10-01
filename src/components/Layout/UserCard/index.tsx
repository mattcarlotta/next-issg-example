import Avatar from "~components/Layout/Avatar";
import FadeIn from "~components/Layout/FadeIn";
import MiniCard from "~components/Layout/MiniCard";
import UserDetails from "~components/Layout/UserDetails";
import UserName from "~components/Layout/UserName";
import Link from "~components/Navigation/Link";
import toInitials from "~utils/toInitials";
import { FC, CardProps } from "~types";

const UserCard: FC<Pick<
  CardProps,
  "_id" | "idx" | "firstName" | "lastName" | "email" | "userName"
>> = ({ _id, idx, firstName, lastName, email, userName }) => (
  <FadeIn data-testid="card-container" timing={`${0.5 + idx / 10}s`}>
    <Link href={`/users/${_id}`}>
      <MiniCard data-testid="mini-card">
        <Avatar size="lg">{toInitials(`${firstName} ${lastName}`)}</Avatar>
        <UserName>{userName}</UserName>
        <UserDetails>{email}</UserDetails>
      </MiniCard>
    </Link>
  </FadeIn>
);

export default UserCard;
