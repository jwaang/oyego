import { useState } from "react";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import { modalStyles } from "@/variables/shared";

const FAQ = ({ open, onClose }) => {
  return (
    <>
      <Modal open={open} onClose={onClose} center styles={modalStyles}>
        This is a proof of concept and currently unfinished
      </Modal>
    </>
  );
};
export default FAQ;
