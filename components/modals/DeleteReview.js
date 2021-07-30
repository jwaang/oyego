import { DeleteReviewMutation } from "@/apollo/actions";
import { GET_ALL_REVIEWS_BY_SUB_QUERY } from "@/apollo/queries";
import { ModalTitle, modalStyles } from "@/variables/shared";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import Button from "@/components/shared/Button";

const DeleteReview = ({ id, sub, open, onClose, album, artist }) => {
  const [deleteReview] = DeleteReviewMutation({
    // get deleteReview which is the ObjectID
    update(cache, { data: { deleteReview } }) {
      // fetch cache of all reviews query
      const { getAllReviewsBySub } = cache.readQuery({ query: GET_ALL_REVIEWS_BY_SUB_QUERY, variables: { sub } });
      // remove cached reviews by filtering out the deleteReview ObjectID
      const updatedReviews = getAllReviewsBySub.filter((r) => r._id !== deleteReview);
      // write back to cache with updated reviews array
      cache.writeQuery({
        query: GET_ALL_REVIEWS_BY_SUB_QUERY,
        variables: { sub },
        data: { getAllReviewsBySub: updatedReviews },
      });
    },
  });

  const handleDelete = () => {
    // Can also use refetchQueries technique - not recommended
    // Commenting out for learning purposes
    // deleteReview({ refetchQueries: [{ query: GET_ALL_REVIEWS_BY_SUB_QUERY, variables: { sub } }], variables: { id } });

    deleteReview({ variables: { id } });
    onClose(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} center styles={modalStyles}>
        <ModalTitle>Please confirm</ModalTitle>
        <Wrapper>
          <Body>
            Are you sure you want to delete your review of <Bold>{album}</Bold> by <Bold>{artist}</Bold>?
          </Body>
          <ButtonWrapper>
            <Button onClickFunction={() => handleDelete()} text="Delete" variant="secondary" size="compact" />
          </ButtonWrapper>
        </Wrapper>
      </Modal>
    </>
  );
};
export default DeleteReview;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  font-size: 12px;
  color: #50555b;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  width: 100px;
`;

const Bold = styled.span`
  font-weight: bold;
  color: #f8f9fa;
`;
