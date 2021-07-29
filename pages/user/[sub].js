import { GetAllReviewsBySubQuery } from "@/apollo/actions";
import ReviewCard from "@/components/cards/ReviewCard";
import Redirect from "@/components/shared/Redirect";
import Spinner from "@/components/shared/Spinner";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "styled-components";

const User = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { sub } = router.query;
  const { loading: searchLoading, data } = GetAllReviewsBySubQuery({ variables: { sub } });

  if (loading)
    return (
      <BaseLayout>
        &nbsp;
        <Spinner />
      </BaseLayout>
    );

  if (typeof window !== "undefined" && loading) return null;

  if (session) {
    return (
      <BaseLayout>
        <UserWrapper>
          <Title>Your Reviews</Title>
          {searchLoading && <Spinner />}
          {data &&
            data.getAllReviewsBySub.map((review) => (
              <ReviewCardWrapper key={review._id}>
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
                />
              </ReviewCardWrapper>
            ))}
        </UserWrapper>
      </BaseLayout>
    );
  } else {
    return <Redirect to="/" query={{ message: "NOT_AUTHENTICATED" }} />;
  }
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
