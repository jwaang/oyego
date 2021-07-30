import styled from "styled-components";

const WaveBackground = () => {
  return (
    <Wrapper>
      <Background />
      <Wave src="/images/waves/wave1.svg" style={{ top: "400px", transform: "matrix(-1, 0, 0, 1, 0, 0)" }} />
      <Wave src="/images/waves/wave3.svg" style={{ top: "200px" }} />
      <Wave src="/images/waves/wave2.svg" style={{ top: "200px" }} />
      <Wave src="/images/waves/wave4.svg" style={{ top: "400px", transform: "matrix(-1, 0, 0, 1, 0, 0)" }} />
    </Wrapper>
  );
};

export default WaveBackground;

const Wrapper = styled.div`
  position: relative;
`;

const Wave = styled.img`
  position: absolute;
  z-index: -1;
  width: 100%;
`;

const Background = styled.div`
  background: linear-gradient(180deg, #45af47 0%, #a7e961 100%);
  position: fixed;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  z-index: -1;
`;
