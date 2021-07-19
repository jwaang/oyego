import withApollo from "@/hoc/withApollo";
import { signIn, signOut, useSession } from "next-auth/client";
import ReviewCard from "@/components/shared/ReviewCard";
import { GetAllReviewsQuery } from "@/apollo/actions";

const Home = () => {
  const [session, loading] = useSession();
  const { data } = GetAllReviewsQuery();

  return (
    <>
      {!session && (
        <>
          <h1>You are not signed in</h1> <br />
          <button onClick={signIn}>Sign in</button>
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
