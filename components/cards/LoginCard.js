import { messages } from "@/variables/shared";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/shared/Button";

const LoginCard = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <>
      <Wrapper>
        <GlassCard>
          {message && <span>{messages[message].value}</span>}
          <CardHeader>Oyego</CardHeader>
          <CardSub>The social app for music lovers</CardSub>
          <Button onClickFunction={() => signIn("spotify", { callbackUrl: router.query.callbackUrl })} text="Sign in with Spotify" />
        </GlassCard>
      </Wrapper>
    </>
  );
};
export default LoginCard;

const Wrapper = styled.div`
  width: 400px;
`;

const GlassCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  backdrop-filter: blur(15px) saturate(120%);
  -webkit-backdrop-filter: blur(15px) saturate(120%);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
`;

const CardHeader = styled.span`
  color: #fff;
  font-size: 40px;
  font-weight: 500;
  padding-bottom: 15px;
`;

const CardSub = styled.span`
  color: #4b5663;
  padding-bottom: 15px;
`;
