import { CreateReviewMutation } from "@/apollo/actions";
import Button from "@/components/shared/Button";
import { GET_ALL_REVIEWS_BY_SUB_QUERY, GET_ALL_REVIEWS_QUERY } from "@/apollo/queries";
import { ModalTitle, modalStyles } from "@/variables/shared";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Star } from "react-star";
import styled from "styled-components";
import { useRouter } from "next/router";
import moment from "moment";

const CreateReview = ({ open, onClose, albumVariables }) => {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [session, loading] = useSession();
  const [textAreaVal, setTextAreaVal] = useState("");
  const [createReview] = CreateReviewMutation({
    update(cache, { data: { createReview } }) {
      // update for home page
      const getAllReviewsData = cache.readQuery({ query: GET_ALL_REVIEWS_QUERY });
      if (getAllReviewsData) {
        // only update if cache exists
        const { getAllReviews } = getAllReviewsData;
        const combined = [...getAllReviews, createReview];
        cache.writeQuery({
          query: GET_ALL_REVIEWS_QUERY,
          data: { getAllReviews: combined },
        });
      }

      // update for user profile page
      const getAllReviewsBySubData = cache.readQuery({ query: GET_ALL_REVIEWS_BY_SUB_QUERY, variables: { sub: session.user.sub } });
      if (getAllReviewsBySubData) {
        // only update if cache exists
        const { getAllReviewsBySub } = getAllReviewsBySubData;
        const combined = [...getAllReviewsBySub, createReview];
        cache.writeQuery({
          query: GET_ALL_REVIEWS_BY_SUB_QUERY,
          variables: { sub: session.user.sub },
          data: { getAllReviewsBySub: combined },
        });
      }
    },
  });

  const saveData = () => {
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
    createReview({ variables: saveDataObject });

    // Can also use
    // createReview({
    //   refetchQueries: [{ query: GET_ALL_REVIEWS_QUERY }, { query: GET_ALL_REVIEWS_BY_SUB_QUERY, variables: { sub: session.user.sub } }],
    //   variables: saveDataObject,
    // });
    onClose(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} center styles={modalStyles}>
        <ModalTitle>Review this album</ModalTitle>
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
            <Star defaultValue={rating} onChange={(newRating) => setRating(newRating)} fraction={2} shape="fat" />
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
  color: #f8f9fa;
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
