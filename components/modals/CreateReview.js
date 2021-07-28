import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { CreateReviewMutation } from "@/apollo/actions";
import Button from "@/components/shared/Button";
import { modalStyles } from "@/variables/shared";

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
      <Modal open={open} onClose={onClose} center styles={modalStyles}>
        <Title>Review this album! ✍️</Title>
        <CreateReviewWrapper>
          <AlbumWrapper>
            <AlbumImageWrapper>
              <Image src={albumVariables.image} alt="Album cover" layout="fill" objectFit="contain" />
            </AlbumImageWrapper>
            <AlbumInfoWrapper>
              <AlbumSpan>{albumVariables.album}</AlbumSpan>
              <ArtistSpan>{albumVariables.artist}</ArtistSpan>
            </AlbumInfoWrapper>
          </AlbumWrapper>
          <AddReviewTextArea rows="4" cols="50" onChange={(e) => setTextAreaVal(e.target.value)}></AddReviewTextArea>
          <Footer>
            <ReactStars
              styles={{ flex: "3 1 auto" }}
              count={5}
              isHalf={true}
              onChange={(newRating) => setRating(newRating)}
              size={24}
              activeColor="#A7E961"
            />
            <Button styles={{ flex: "1 0 100px" }} onClickFunction={() => saveData()} text="Save" variant="primary" size="compact" />
          </Footer>
        </CreateReviewWrapper>
      </Modal>
    </>
  );
};
export default CreateReview;

const CreateReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-weight: 400;
  margin-bottom: 15px;
`;

const AlbumInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const AlbumImageWrapper = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
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
  margin-bottom: 10px;
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
