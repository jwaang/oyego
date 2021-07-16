import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/utils/hooks";

const Card = ({ id, image, album, artist }) => {
  const router = useRouter();
  const [albumVariables, setAlbumVariables] = useLocalStorage("albumVariables", {});

  const handleCreateReviewRedirect = (e) => {
    e.preventDefault();
    const albumVariables = {
      id,
      image,
      album,
      artist,
    };
    setAlbumVariables(albumVariables);
    router.push("/review/create");
  };

  return (
    <CardWrapper>
      <Image src={image} alt="Album cover" width={100} height={100} />
      <AlbumSpan>{album}</AlbumSpan>
      <ArtistSpan>{artist}</ArtistSpan>
      <span>{id}</span>
      <ReviewButton onClick={handleCreateReviewRedirect}>Review</ReviewButton>
    </CardWrapper>
  );
};
export default Card;

const CardWrapper = styled.div``;

const AlbumSpan = styled.div``;

const ArtistSpan = styled.div``;

const ReviewButton = styled.button``;
