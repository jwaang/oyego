import styled from "styled-components";
import Image from "next/image";
import CreateReview from "@/components/modals/CreateReview";
import { useState } from "react";
import Button from "@/components/shared/Button";
import { motion } from "framer-motion";
import { GlassEffect } from "@/variables/shared";

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
      <CardWrapper whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: "easeInOut" } }}>
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

const CardWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 140px;
  justify-content: space-between;
  flex: 1;
  ${GlassEffect}
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
