import styled from "styled-components";
import Image from "next/image";
import CreateReview from "@/components/modals/CreateReview";
import { useState } from "react";
import Button from "@/components/shared/Button";

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
        <AlbumWrapper>
          <AlbumCoverWrapper>
            <Image src={image} alt="Album cover" layout="fill" objectFit="contain" />
          </AlbumCoverWrapper>
          <AlbumSpan>{album}</AlbumSpan>
          <ArtistSpan>{artist}</ArtistSpan>
        </AlbumWrapper>
        <Button onClickFunction={() => updateVariablesAndShowModal()} text="Review" variant="primary" size="compact" />
      </CardWrapper>
    </>
  );
};
export default SearchCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 140px;
  justify-content: space-between;

  backdrop-filter: blur(15px) saturate(120%);
  -webkit-backdrop-filter: blur(15px) saturate(120%);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
`;

const AlbumWrapper = styled.div`
  justify-content: normal;
`;

const AlbumCoverWrapper = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  margin-bottom: 5px;
`;

const AlbumSpan = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 5px;
`;

const ArtistSpan = styled.div`
  font-size: 15px;
  color: #495057;
  margin-bottom: 5px;
`;

const ReviewButton = styled.button``;
