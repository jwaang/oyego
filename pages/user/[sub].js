import withApollo from "@/hoc/withApollo";
import styled from "styled-components";
// import { useSession, getSession } from "next-auth/client";
import { GetAllReviewsBySubQuery } from "@/apollo/actions";
import { useRouter } from "next/router";
import ReviewCard from "@/components/shared/ReviewCard";

const User = () => {
  const router = useRouter();
  // const [session, loading] = useSession();
  const { sub } = router.query;
  const { data } = GetAllReviewsBySubQuery({ variables: { sub } });

  return (
    <>
      {data &&
        data.getAllReviewsBySub.map((review) => (
          <ReviewCard
            key={review._id}
            id={review._id}
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
};

export default withApollo(User);

// to be used on page redirect to own profile page
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   };
// }

const Wrapper = styled.div``;
