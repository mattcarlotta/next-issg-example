import Router, { useRouter } from "next/router";
import { useCallback } from "react";
import toast from "~components/App/Toast";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import Container from "~components/Layout/Container";
import FadeIn from "~components/Layout/FadeIn";
import Flex from "~components/Layout/Flex";
import Header from "~components/Navigation/Header";
import HomeIcon from "~components/Layout/HomeIcon";
import LoadingUsers from "~components/Layout/LoadingUsers";
import Link from "~components/Navigation/Link";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import invalidatePageCache from "~utils/invalidatePageCache";
import { FC, GetStaticPaths, UserDetails } from "~types";

const ViewUser: FC<{ user: UserDetails }> = ({ user }) => {
  const router = useRouter();
  const deleteUser = useCallback(async (id: string) => {
    try {
      const res = await app.delete(`users/delete/${id}`);
      const message = parseMessage(res);

      await invalidatePageCache(`/users/${id}`);

      if (message) toast({ type: "success", message });

      Router.push("/");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  }, []);

  return router.isFallback ? (
    <LoadingUsers />
  ) : (
    <>
      <Header title={`${user.userName}'s profile`} url={`/users/${user._id}`} />
      <FadeIn timing="0.5s">
        <Center>
          <Flex style={{ padding: "40px 0 20px" }}>
            <Container>
              <Card {...user} deleteUser={deleteUser} />
            </Container>
          </Flex>
          <Link href="/">
            <HomeIcon />
            Go Back
          </Link>
        </Center>
      </FadeIn>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await app.get("users");
  const users: UserDetails[] = parseData(res, "users");

  const paths = users.map(user => ({
    params: { id: user._id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: { user: UserDetails }; revalidate: number }> => {
  const res = await app.get(`users/view/${params.id}`);
  const user: UserDetails = parseData(res, "user");

  return {
    props: { user },
    revalidate: 1,
  };
};

export default ViewUser;
