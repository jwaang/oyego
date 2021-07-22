import messages from "@/variables/messages";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "styled-components";

const LoginCard = ({ session }) => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <>
      <Wrapper>
        <GlassCard>
          {message && <span>{messages[message].value}</span>}
          <CardHeader>Oyego</CardHeader>
          <CardSub>The social app for music lovers</CardSub>
          <CardButton onClick={() => signIn("spotify", { callbackUrl: router.query.callbackUrl })}>Sign in with Spotify</CardButton>
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

const CardButton = styled.button`
  background-color: #2ea44f;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.15), hsla(0, 0%, 100%, 0));
  border-color: #2ea44f;
  box-shadow: 0 1px 1px rgb(18 21 26 / 8%);
  color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  padding: 0.5rem 1rem;
  text-align: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
`;
