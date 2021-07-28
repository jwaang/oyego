import styled from "styled-components";
import WaveBackground from "@/components/backgrounds/WaveBackground";
import Navbar from "@/components/shared/Navbar";

const BaseLayout = ({ children }) => {
  return (
    <BaseLayoutWrapper>
      <WaveBackground />
      <Navbar />
      <Container>{children}</Container>
    </BaseLayoutWrapper>
  );
};

export default BaseLayout;

const BaseLayoutWrapper = styled.div``;

const Container = styled.div``;
