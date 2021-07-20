import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import Image from "next/image";
import { EditReviewMutation } from "@/apollo/actions";
import { GET_ALL_REVIEWS_BY_SUB_QUERY } from "@/apollo/queries";
import withApollo from "@/hoc/withApollo";
import ReactStars from "react-stars";
import { Star } from "react-star";

const EditReview = ({ open, onClose, id, sub, image, album, rating: currentRating, artist, review }) => {
  const [rating, setRating] = useState(currentRating);
  const [textAreaVal, setTextAreaVal] = useState(review);
  const [editReview, { loading: editLoading, data }] = EditReviewMutation();

  const handleEdit = () => {
    const editObject = {
      id,
      review: textAreaVal,
      rating,
    };
    editReview({ refetchQueries: [{ query: GET_ALL_REVIEWS_BY_SUB_QUERY, variables: { sub } }], variables: editObject });
    onClose(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} center>
        <h1>Edit Review</h1>
        <Wrapper>
          <Image src={image} alt="Album cover" width={100} height={100} />
          <AlbumSpan>{album}</AlbumSpan>
          <ArtistSpan>{artist}</ArtistSpan>
          <AddReviewTextArea rows="4" cols="50" value={textAreaVal} onChange={(e) => setTextAreaVal(e.target.value)}></AddReviewTextArea>
          {/* <ReactStars count={5} value={rating} half={true} size={20} onChange={(newRating) => setRating(newRating)} color2="#A7E961" /> */}
          <Star defaultValue={rating} onChange={(newRating) => setRating(newRating)} fraction={2} />
          <SaveButton onClick={() => handleEdit()}>Edit</SaveButton>
        </Wrapper>
      </Modal>
    </>
  );
};
export default withApollo(EditReview);

const Wrapper = styled.div``;

const AlbumSpan = styled.span``;

const ArtistSpan = styled.span``;

const AddReviewTextArea = styled.textarea``;

const SaveButton = styled.button``;
