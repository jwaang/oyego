import withApollo from "@/hoc/withApollo";
import styled from "styled-components";
import { useSession } from "next-auth/client";
import { GetAllReviewsBySubQuery } from "@/apollo/actions";
import { useRouter } from "next/router";
import ReviewCard from "@/components/cards/ReviewCard";
import { getDataFromTree } from "@apollo/react-ssr";
import Redirect from "@/components/shared/Redirect";

const User = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { sub } = router.query;
  const { data } = GetAllReviewsBySubQuery({ variables: { sub } });

  if (loading) return <p>Loading Search Page</p>;

  if (typeof window !== "undefined" && loading) return null;

  if (session) {
    return (
      <>
        {data &&
          data.getAllReviewsBySub.map((review) => (
            <ReviewCard
              key={review._id}
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
          ))}
      </>
    );
  } else {
    return <Redirect to="/" query={{ message: "NOT_AUTHENTICATED" }} />;
  }
};

export default withApollo(User, { getDataFromTree });
