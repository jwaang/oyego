import { GetAllReviewsQuery } from "@/apollo/actions";
import ReviewCard from "@/components/cards/ReviewCard";
import Redirect from "@/components/shared/Redirect";
import Spinner from "@/components/shared/Spinner";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import { getSession, providers, useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Title } from "@/variables/shared";
import { useEffect } from "react";

const Home = () => {
  const [session, loading] = useSession();
  const [getAllReviews, { loading: searchLoading, data }] = GetAllReviewsQuery();
  let transitionDelay = 0;

  useEffect(() => {
    getAllReviews();
  }, []);

  if (typeof window !== "undefined" && loading) return null;

  return (
    <BaseLayout>
      {session && (
        <HomeWrapper>
          <Title>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
            >
              Most recent reviews
            </motion.div>
          </Title>
          {searchLoading && <Spinner />}
          {data &&
            data.getAllReviews.map((review) => (
              <ReviewCardWrapper key={review._id}>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (transitionDelay += 0.2), duration: 1.25, type: "spring", stiffness: 100 }}
                >
                  <ReviewCard
                    id={review._id}
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
                </motion.div>
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
