import { messages } from "@/variables/shared";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/shared/Button";
import FAQ from "@/components/modals/FAQ";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlassEffect } from "@/variables/shared";
const config = require("@/server/config");

const LoginCard = () => {
  const router = useRouter();
  const { message } = router.query;
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <Wrapper>
      <FAQ onClose={() => setShowFAQ(false)} open={showFAQ}></FAQ>
      <motion.div initial={{ opacity: 0, y: -500 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, type: "spring", stiffness: 120 }}>
        <GlassCard>
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.75, ease: "easeInOut", duration: 0.5 } }}
            >
              Oyego
            </motion.div>
          </CardHeader>
          <CardSub>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, ease: "easeInOut", duration: 0.5 }}
            >
              The social app for music lovers
            </motion.div>
          </CardSub>
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95, ease: "easeInOut", duration: 0.5 }}>
            <Button onClickFunction={() => signIn()} text="Sign in with Spotify" />
          </motion.div>
          <Me onClick={() => setShowFAQ(true)}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0, transition: { delay: 1.05, ease: "easeInOut", duration: 0.5 } }}>
              <motion.div initial={{ scale: 1 }} animate={{ scale: 0.925, transition: { duration: 1.25, ease: "easeInOut", yoyo: Infinity } }}>
                Created by @jwaang
              </motion.div>
            </motion.div>
          </Me>
          {message && (
            <ErrorMessage
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.25, ease: "easeInOut", duration: 0.5 } }}
            >
              {messages[message].value}
            </ErrorMessage>
          )}
        </GlassCard>
      </motion.div>
    </Wrapper>
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

const GlassCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${GlassEffect}
`;

const CardHeader = styled.span`
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  padding-bottom: 15px;
`;

const CardSub = styled.span`
  color: #4b5663;
  padding-bottom: 15px;
`;

const ErrorMessage = styled(motion.div)`
  margin-top: 15px;
  font-size: 12px;
  color: #e03131;
`;
