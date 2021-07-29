import { GetAllReviewsQuery } from "@/apollo/actions";
import ReviewCard from "@/components/cards/ReviewCard";
import Redirect from "@/components/shared/Redirect";
import Spinner from "@/components/shared/Spinner";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import { getSession, providers, useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";

const Home = () => {
  const [session, loading] = useSession();
  const { loading: searchLoading, data } = GetAllReviewsQuery();

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
      {session && (
        <HomeWrapper>
          <Title>Most recent reviews</Title>
          {searchLoading && <Spinner />}
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
        </HomeWrapper>
      )}
      {!session && <Redirect to="/" query={{ message: "NOT_AUTHENTICATED" }} />}
    </BaseLayout>
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

const Title = styled.span`
  font-size: 25px;
  color: #fff;
  text-transform: uppercase;
  -webkit-letter-spacing: 0.075em;
  -moz-letter-spacing: 0.075em;
  -ms-letter-spacing: 0.075em;
  letter-spacing: 0.15em;
  font-weight: 500;
  margin-bottom: 25px;
`;

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const ReviewCardWrapper = styled.div`
  margin-bottom: 15px;
`;
