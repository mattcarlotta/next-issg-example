import isEmpty from "lodash.isempty";
import Flex from "~components/Layout/Flex";
import NoData from "~components/Layout/NoData";
import UserCard from "~components/Layout/UserCard";
import { DisplayUserListProps, FC, UserData } from "~types";

const DisplayUserList: FC<DisplayUserListProps> = ({ data, ...rest }) => (
  <Flex
    data-testid="home-page"
    justify="center"
    flexwrap
    style={{ marginTop: 25 }}
  >
    {!isEmpty(data) ? (
      data.map((props: UserData, idx) => (
        <UserCard {...props} {...rest} key={props._id} idx={idx} />
      ))
    ) : (
      <NoData />
    )}
  </Flex>
);

export default DisplayUserList;
