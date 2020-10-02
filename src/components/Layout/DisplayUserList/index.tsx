import styled from "@emotion/styled";
import isEmpty from "lodash.isempty";
import Flex from "~components/Layout/Flex";
import NoData from "~components/Layout/NoData";
import UserCard from "~components/Layout/UserCard";
import { DisplayUserListProps, FC } from "~types";

const UsersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  max-width: 1000px;
  flex-wrap: wrap;
`;

const DisplayUserList: FC<DisplayUserListProps> = ({ data }) => (
  <Flex data-testid="home-page" justify="center" style={{ marginTop: 25 }}>
    <UsersContainer>
      {!isEmpty(data) ? (
        data.map((props, idx) => (
          <UserCard {...props} key={props._id} idx={idx} />
        ))
      ) : (
        <NoData />
      )}
    </UsersContainer>
  </Flex>
);

export default DisplayUserList;
