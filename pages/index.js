import { GetAllReviewsQuery } from "@/apollo/actions";
import ReviewCard from "@/components/shared/ReviewCard";
import withApollo from "@/hoc/withApollo";
import { getSession, providers, signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const Home = () => {
  const [session, loading] = useSession();
  const { data } = GetAllReviewsQuery();
  const router = useRouter();

  return (
    <>
      {!session && (
        <>
          <h1>You are not signed in</h1> <br />
          <SignInButton onClick={() => signIn("spotify", { callbackUrl: router.query.callbackUrl })}>Sign In with Spotify</SignInButton>
        </>
      )}
      {session && (
        <>
          <span style={{ fontSize: 10 }}>{session.user.accessToken}</span>
          <h1>Signed in as {session.user.email} </h1> <br />
          {data &&
            data.getAllReviews.map((review) => (
              <ReviewCard
                key={review.id}
                image={review.image}
                album={review.album}
                artist={review.artist}
                name={review.name}
                review={review.review}
                rating={review.rating}
                user_image={review.user_image}
              />
            ))}
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </>
  );
};

export default withApollo(Home);

Home.getInitialProps = async (context) => {
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
