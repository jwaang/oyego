import withApollo from "@/hoc/withApollo";
import { signIn, signOut, useSession } from "next-auth/client";

const Home = () => {
  const [session, loading] = useSession();

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
          <span style={{ "font-size": 10 }}>{session.user.accessToken}</span>
          <h1>Signed in as {session.user.email} </h1> <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </>
  );
};

export default withApollo(Home);
