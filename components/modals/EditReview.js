import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { EditReviewMutation } from "@/apollo/actions";

const EditReview = ({ open, onClose, id, image, album, rating: currentRating, artist, review }) => {
  const [rating, setRating] = useState(currentRating);
  const [session, loading] = useSession();
  const [textAreaVal, setTextAreaVal] = useState(review);
  const [editReview, { loading: editLoading, data }] = EditReviewMutation();

  const handleEdit = () => {
    const editObject = {
      id,
      review: textAreaVal,
      rating,
    };
    editReview({ variables: editObject });
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
          <ReactStars count={5} value={rating} isHalf={true} onChange={(newRating) => setRating(newRating)} size={24} activeColor="#A7E961" />
          <SaveButton onClick={() => handleEdit()}>Edit</SaveButton>
        </Wrapper>
      </Modal>
    </>
  );
};
export default EditReview;

const Wrapper = styled.div``;

const AlbumSpan = styled.span``;

const ArtistSpan = styled.span``;

const AddReviewTextArea = styled.textarea``;

const SaveButton = styled.button``;
