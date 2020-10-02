import Router, { useRouter } from "next/router";
import { useCallback } from "react";
import toast from "~components/App/Toast";
import Card from "~components/Layout/Card";
import Container from "~components/Layout/Container";
import FadeIn from "~components/Layout/FadeIn";
import Flex from "~components/Layout/Flex";
import Header from "~components/Navigation/Header";
import HomeIcon from "~components/Layout/HomeIcon";
import Link from "~components/Navigation/Link";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import { FC, GetStaticPaths, UserDetails } from "~types";
import Center from "~components/Layout/Center";

const ViewUser: FC<{ user: UserDetails }> = ({ user }) => {
  const router = useRouter();
  const deleteUser = useCallback(async (id: string) => {
    try {
      const res = await app.delete(`users/delete/${id}`);
      const message = parseMessage(res);

      if (message) toast({ type: "success", message });

      Router.push("/");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
    }
  }, []);

  return router.isFallback ? (
    <div>Loading...</div>
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

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await app.get("users");
  const users: UserDetails[] = parseData(res, "users");

  // Get the paths we want to pre-render based on posts
  const paths = users.map(user => ({
    params: { id: user._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

// This also gets called at build time
export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: { user: UserDetails } }> => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await app.get(`users/view/${params.id}`);
  const user: UserDetails = parseData(res, "user");

  // Pass post data to the page via props
  return { props: { user } };
};

export default ViewUser;
