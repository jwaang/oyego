import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { CreateReviewMutation } from "@/apollo/actions";

const CreateReview = ({ open, onClose, albumVariables }) => {
  const [rating, setRating] = useState(0);
  const [session, loading] = useSession();
  const [textAreaVal, setTextAreaVal] = useState("");
  const [createReview, { loading: searchLoading, data }] = CreateReviewMutation();

  const saveData = () => {
    console.log(session);
    const saveDataObject = {
      image: albumVariables.image,
      album: albumVariables.album,
      artist: albumVariables.artist,
      review: textAreaVal,
      rating,
      email: session.user.email,
      name: session.user.name,
      user_image: session.user.picture,
      sub: session.user.sub,
    };
    console.log(saveDataObject);
    createReview({ variables: saveDataObject });
    onClose(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} center>
        <h1>Create Review</h1>
        <Wrapper>
          <Image src={albumVariables.image} alt="Album cover" width={100} height={100} />
          <AlbumSpan>{albumVariables.album}</AlbumSpan>
          <ArtistSpan>{albumVariables.artist}</ArtistSpan>
          <AddReviewTextArea rows="4" cols="50" onChange={(e) => setTextAreaVal(e.target.value)}></AddReviewTextArea>
          <ReactStars count={5} isHalf={true} onChange={(newRating) => setRating(newRating)} size={24} activeColor="#A7E961" />
          <SaveButton onClick={() => saveData()}>Save</SaveButton>
        </Wrapper>
      </Modal>
    </>
  );
};
export default CreateReview;

const Wrapper = styled.div``;

const AlbumSpan = styled.span``;

const ArtistSpan = styled.span``;

const AddReviewTextArea = styled.textarea``;

const SaveButton = styled.button``;
