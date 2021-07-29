import LoginCard from "@/components/cards/LoginCard";
import Spinner from "@/components/shared/Spinner";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import { getSession, providers, useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";

const Login = () => {
  const [session, loading] = useSession();

  if (loading)
    return (
      <BaseLayout>
        &nbsp;
        <Spinner />
      </BaseLayout>
    );

  if (typeof window !== "undefined" && loading) return null;

  return (
    <BaseLayout>
      <Wrapper>
        <LoginCard session={session} />
      </Wrapper>
    </BaseLayout>
  );
};

export default withApollo(Login);

Login.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session && res && session.user.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
  };
};

const Wrapper = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
