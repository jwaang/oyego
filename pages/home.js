import { GetAllReviewsQuery } from "@/apollo/actions";
import ReviewCard from "@/components/cards/ReviewCard";
import withApollo from "@/hoc/withApollo";
import { getSession, providers, signOut, useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";

const Home = () => {
  const [session, loading] = useSession();
  const { data } = GetAllReviewsQuery();

  return (
    <>
      {session && (
        <HomeWrapper>
          {data &&
            data.getAllReviews.map((review) => (
              <ReviewCardWrapper key={review._id}>
                <ReviewCard
                  sub={review.sub}
                  image={review.image}
                  album={review.album}
                  artist={review.artist}
                  name={review.name}
                  review={review.review}
                  rating={review.rating}
                  user_image={review.user_image}
                  lastUpdated={review.lastUpdated}
                />
              </ReviewCardWrapper>
            ))}
          <button onClick={signOut}>Sign out</button>
        </HomeWrapper>
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

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${"" /* justify-content: center; */}
`;

const ReviewCardWrapper = styled.div`
  margin-bottom: 15px;
`;
