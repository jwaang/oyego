import WaveBackground from "@/components/backgrounds/WaveBackground";
import Navbar from "@/components/shared/Navbar";
import { useRouter } from "next/router";
import styled from "styled-components";

const BaseLayout = ({ children }) => {
  const router = useRouter();

  return (
    <BaseLayoutWrapper>
      <WaveBackground />
      {router.pathname !== "/" && <Navbar />}
      <Container>{children}</Container>
    </BaseLayoutWrapper>
  );
};

export default BaseLayout;

const BaseLayoutWrapper = styled.div``;

const Container = styled.div``;
