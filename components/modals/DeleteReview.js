import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { DeleteReviewMutation } from "@/apollo/actions";

const DeleteReview = ({ id, open, onClose }) => {
  const [deleteReview] = DeleteReviewMutation();

  const handleDelete = () => {
    deleteReview({ variables: { id } });
    onClose(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} center>
        <h1>Delete Review</h1>
        <Wrapper>
          <TextSpan>Are you sure you wish to delete this review?</TextSpan>
          <DeleteButton onClick={() => handleDelete()}>Delete</DeleteButton>
        </Wrapper>
      </Modal>
    </>
  );
};
export default DeleteReview;

const Wrapper = styled.div``;

const TextSpan = styled.span``;

const DeleteButton = styled.button``;
