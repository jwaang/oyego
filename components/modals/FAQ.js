import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import { ModalTitle, modalStyles } from "@/variables/shared";

const FAQ = ({ open, onClose }) => {
  return (
    <>
      <Modal open={open} onClose={onClose} center styles={modalStyles}>
        <ModalTitle>Please Note that...</ModalTitle>
        <Body>
          This is a proof of concept so therefore an unfinished project. There are still a <b>ton</b> of potential features and design improvements
          that can be implemented to make this application more scalable and robust.
        </Body>
        <Body>
          The search feature was created using{" "}
          <Link href="https://developer.spotify.com/console/get-search-item/" target="_blank" rel="noreferrer">
            Spotify&apos;s API
          </Link>
          .
        </Body>
        <Body>
          {" "}
          You can view the source code and demo{" "}
          <Link href="https://github.com/jwaang/oyego" target="_blank" rel="noreferrer">
            here
          </Link>
          .
        </Body>
      </Modal>
    </>
  );
};
export default FAQ;

const Body = styled.p`
  font-size: 12px;
  color: #50555b;
`;

const Link = styled.a`
  text-decoration: none;
  color: #f8f9fa;
`;
