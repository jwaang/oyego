import { GetAllReviewsBySubQuery, GetUserProfileQuery } from "@/apollo/actions";
import ReviewCard from "@/components/cards/ReviewCard";
import Redirect from "@/components/shared/Redirect";
import Spinner from "@/components/shared/Spinner";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Title } from "@/variables/shared";

const User = ({ sessionAccessToken }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { sub } = router.query;
  const { data: userProfileData } = GetUserProfileQuery({ variables: { sub, accessToken: sessionAccessToken } });
  const [getAllReviewsBySub, { loading: searchLoading, data }] = GetAllReviewsBySubQuery({ variables: { sub } });
  let transitionDelay = 0;
  let user = "";

  useEffect(() => {
    getAllReviewsBySub();
  }, []);

  if (loading)
    return (
      <BaseLayout>
        &nbsp;
        <Spinner />
      </BaseLayout>
    );

  if (typeof window !== "undefined" && loading) return null;

  if (userProfileData && userProfileData.getUserProfile && userProfileData.getUserProfile.display_name) {
    user = userProfileData.getUserProfile.display_name.split(" ")[0];
  }
  if (session) {
    return (
      <BaseLayout>
        <UserWrapper>
          <Title>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
            >
              {user}&apos;s Reviews
            </motion.div>
          </Title>
          {searchLoading && <Spinner />}
          {data &&
            data.getAllReviewsBySub.map((review) => (
              <ReviewCardWrapper key={review._id}>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (transitionDelay += 0.2), duration: 1.25, type: "spring", stiffness: 100 }}
                >
                  <ReviewCard
                    id={review._id}
                    sub={sub}
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
        </UserWrapper>
      </BaseLayout>
    );
  } else {
    return <Redirect to="/" query={{ message: "NOT_AUTHENTICATED" }} />;
  }
};

User.getInitialProps = async (ctx) => {
  // Get accesstoken from session so we can fetch user's name before loading page
  const { req } = ctx;
  const session = await getSession({ req });
  return { sessionAccessToken: session.user.accessToken };
};

export default withApollo(User);

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const ReviewCardWrapper = styled.div`
  margin-bottom: 15px;
`;
