import styled from "styled-components";

export const messages = {
  NOT_AUTHENTICATED: { value: "You need to login with Spotify first to visit that page!", status: "danger" },
};

export const modalStyles = {
  overlay: {
    background: "rgba(80, 85, 91, .25)",
  },
  modal: {
    maxWidth: "500px",
    width: "100%",
    borderRadius: "5px",
    backdropFilter: "blur(15px) saturate(120%)",
    WebkitBackdropFilter: "blur(15px) saturate(120%)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    border: "1px solid rgba(209, 213, 219, 0.3)",
  },
};

export const Title = styled.h1`
  font-size: 25px;
  color: #fff;
  text-transform: uppercase;
  -webkit-letter-spacing: 0.075em;
  -moz-letter-spacing: 0.075em;
  -ms-letter-spacing: 0.075em;
  letter-spacing: 0.15em;
  font-weight: 700;
`;

export const ModalTitle = styled.div`
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const GlassEffect = {
  padding: "20px",
  backdropFilter: "blur(15px) saturate(120%)",
  "-webkit-backdrop-filter": "blur(15px) saturate(120%)",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  border: "1px solid rgba(209, 213, 219, 0.3)",
};
