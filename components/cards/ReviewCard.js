import styled from "styled-components";
import Image from "next/image";
import EditReview from "@/components/modals/EditReview";
import DeleteReview from "@/components/modals/DeleteReview";
import { useState } from "react";
import { Star } from "react-star";
import { useSession } from "next-auth/client";

const ReviewCard = ({ id, sub, image, album, artist, name, review, rating, user_image }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [albumVariables, setAlbumVariables] = useState({});
  const [session, loading] = useSession();

  const updateVariablesAndShowModal = () => {
    const albumVariablesObject = {
      id,
      image,
      album,
      artist,
      review,
      rating,
    };
    console.log(albumVariablesObject);
    setAlbumVariables(albumVariablesObject);
    console.log(albumVariables);
    setShowEditModal(true);
  };

  return (
    <>
      <EditReview
        onClose={() => setShowEditModal(false)}
        open={showEditModal}
        id={id}
        sub={sub}
        image={image}
        album={album}
        artist={artist}
        review={review}
        rating={rating}
      />
      <DeleteReview onClose={() => setShowDeleteModal(false)} open={showDeleteModal} id={id} sub={sub} />
      <CardWrapper>
        <Image src={image} alt="Album cover" width={100} height={100} />
        <Image src={user_image} alt="Album cover" width={50} height={50} />
        <AlbumSpan>{album}</AlbumSpan>
        <ArtistSpan>{artist}</ArtistSpan>
        <NameSpan>{name}</NameSpan>
        <ReviewSpan>{review}</ReviewSpan>
        <Star defaultValue={rating} fraction={2} readOnly={true} />
        {session && session.user.sub === sub && (
          <>
            <EditReviewButton onClick={() => updateVariablesAndShowModal()}>Edit</EditReviewButton>
            <DeleteReviewButton onClick={() => setShowDeleteModal(true)}>Delete</DeleteReviewButton>
          </>
        )}
      </CardWrapper>
    </>
  );
};
export default ReviewCard;

const CardWrapper = styled.div``;

const AlbumSpan = styled.span``;

const ArtistSpan = styled.span``;

const NameSpan = styled.span``;

const ReviewSpan = styled.span``;

const EditReviewButton = styled.button``;

const DeleteReviewButton = styled.button``;
