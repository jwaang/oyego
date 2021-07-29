import { messages } from "@/variables/shared";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/shared/Button";
import FAQ from "@/components/modals/FAQ";
import { useState } from "react";

const LoginCard = () => {
  const router = useRouter();
  const { message } = router.query;
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <>
      <Wrapper>
        <FAQ onClose={() => setShowFAQ(false)} open={showFAQ}></FAQ>
        <GlassCard>
          <CardHeader>Oyego</CardHeader>
          <CardSub>The social app for music lovers</CardSub>
          <Button onClickFunction={() => signIn("spotify", { callbackUrl: "http://localhost:3000/home" })} text="Sign in with Spotify" />
          <Me onClick={() => setShowFAQ(true)}>Made with 🤌 by @jwaang</Me>
          {message && (
            <>
              <Line />
              <ErrorMessage>{messages[message].value}</ErrorMessage>
            </>
          )}
        </GlassCard>
      </Wrapper>
    </>
  );
};
export default LoginCard;

const Wrapper = styled.div`
  width: 400px;
`;

const Me = styled.a`
  margin-top: 15px;
  color: #4b5663;
  cursor: pointer;
  font-size: 12px;
`;

const Line = styled.div`
  margin-top: 15px;
  border-top: 1px solid rgba(75, 86, 99, 0.35);
  width: 100%;
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

const ErrorMessage = styled.span`
  margin-top: 15px;
  font-size: 12px;
  color: #4b5663;
`;
