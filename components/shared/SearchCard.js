import styled from "styled-components";
import Image from "next/image";
import CreateReview from "@/components/modals/CreateReview";
import { useState } from "react";

const SearchCard = ({ id, image, album, artist }) => {
  const [albumVariables, setAlbumVariables] = useState({});
  const [showModal, setShowModal] = useState(false);

  const updateVariablesAndShowModal = () => {
    const albumVariablesObject = {
      image,
      album,
      artist,
    };
    setAlbumVariables(albumVariablesObject);
    setShowModal(true);
  };

  return (
    <>
      <CreateReview onClose={() => setShowModal(false)} open={showModal} albumVariables={albumVariables} />
      <CardWrapper>
        <Image src={image} alt="Album cover" width={100} height={100} />
        <AlbumSpan>{album}</AlbumSpan>
        <ArtistSpan>{artist}</ArtistSpan>
        <span>{id}</span>
        <ReviewButton onClick={() => updateVariablesAndShowModal()}>Review</ReviewButton>
      </CardWrapper>
    </>
  );
};
export default SearchCard;

const CardWrapper = styled.div``;

const AlbumSpan = styled.div``;

const ArtistSpan = styled.div``;

const ReviewButton = styled.button``;
