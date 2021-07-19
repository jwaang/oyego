import React from "react";
import { providers, signIn, getSession } from "next-auth/client";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  return (
    <>
      <SignInButton onClick={() => signIn("spotify", { callbackUrl: router.query.callbackUrl })}>Sign In with Spotify</SignInButton>
    </>
  );
}

SignIn.getInitialProps = async (context) => {
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

const SignInButton = styled.button``;
