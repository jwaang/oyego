import { EditReviewMutation } from "@/apollo/actions";
import { GET_ALL_REVIEWS_BY_SUB_QUERY } from "@/apollo/queries";
import { modalStyles } from "@/variables/shared";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Star } from "react-star";
import styled from "styled-components";
import Button from "@/components/shared/Button";

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
      <Modal open={open} onClose={onClose} center styles={modalStyles}>
        <Title>Edit Review</Title>
        <EditReviewWrapper>
          <AlbumWrapper>
            <AlbumImageWrapper>
              <Image src={image} alt="Album cover" layout="fill" objectFit="contain" />
            </AlbumImageWrapper>
            <AlbumInfoWrapper>
              <AlbumSpan>{album}</AlbumSpan>
              <ArtistSpan>{artist}</ArtistSpan>
            </AlbumInfoWrapper>
          </AlbumWrapper>
          <AddReviewTextArea rows="4" cols="50" value={textAreaVal} onChange={(e) => setTextAreaVal(e.target.value)}></AddReviewTextArea>
          <Footer>
            <Star defaultValue={rating} onChange={(newRating) => setRating(newRating)} fraction={2} shape="fat" />
            <Button onClickFunction={() => handleEdit()} text="Edit" variant="primary" size="compact" />
          </Footer>
        </EditReviewWrapper>
      </Modal>
    </>
  );
};
export default EditReview;

const EditReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Title = styled.span`
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-weight: 400;
  margin-bottom: 15px;
`;

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const AlbumImageWrapper = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
`;

const AlbumInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const AlbumSpan = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 5px;
`;

const ArtistSpan = styled.span`
  font-size: 15px;
  color: #495057;
`;

const AddReviewTextArea = styled.textarea`
  margin-bottom: 20px;
  border: 0.1rem solid #d1d1d1;
  border-radius: 0.4rem;
  height: 3.8rem;
  padding: 0.6rem 1rem 0.7rem;
  resize: vertical;
  &:focus {
    border-color: #a7e961;
    outline: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    width: 100px;
  }
`;
