import { GetAllReviewsQuery } from "@/apollo/actions";
import LoginCard from "@/components/cards/LoginCard";
import withApollo from "@/hoc/withApollo";
import { getSession, providers, useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";

const Login = () => {
  const [session, loading] = useSession();
  const { data } = GetAllReviewsQuery();

  return (
    <>
      <Wrapper>
        <LoginCard session={session} />
      </Wrapper>
    </>
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
