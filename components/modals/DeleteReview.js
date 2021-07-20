import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { GET_ALL_REVIEWS_BY_SUB_QUERY } from "@/apollo/queries";
import { DeleteReviewMutation } from "@/apollo/actions";

const DeleteReview = ({ id, sub, open, onClose }) => {
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
export default withApollo(DeleteReview, { getDataFromTree });

const Wrapper = styled.div``;

const TextSpan = styled.span``;

const DeleteButton = styled.button``;
