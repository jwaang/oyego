import DeleteReview from "@/components/modals/DeleteReview";
import EditReview from "@/components/modals/EditReview";
import Button from "@/components/shared/Button";
import { convertEpochToReadableDateString } from "@/utils/functions";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star } from "react-star";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlassEffect } from "@/variables/shared";

const ReviewCard = ({ id, sub, image, album, artist, name, review, rating, user_image, lastUpdated }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [albumVariables, setAlbumVariables] = useState({});
  const [session, loading] = useSession();
  const [showMore, setShowMore] = useState(false);

  const updateVariablesAndShowModal = () => {
    const albumVariablesObject = {
      id,
      image,
      album,
      artist,
      review,
      rating,
    };
    setAlbumVariables(albumVariablesObject);
    setShowEditModal(true);
  };

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: "easeInOut" } }}>
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
      <DeleteReview onClose={() => setShowDeleteModal(false)} open={showDeleteModal} id={id} sub={sub} album={album} artist={artist} />
      <CardWrapper>
        <CardSideWrapper>
          <AlbumCoverWrapper>
            <Image src={image} alt="Album cover" layout="fill" objectFit="cover" />
          </AlbumCoverWrapper>
          {session && session.user.sub === sub && (
            <ReviewButtonsWrapper>
              <Button onClickFunction={() => updateVariablesAndShowModal()} text="Edit" variant="primary" size="compact" />
              <Button onClickFunction={() => setShowDeleteModal(true)} text="Delete" variant="secondary" size="compact" />
            </ReviewButtonsWrapper>
          )}
        </CardSideWrapper>

        <AlbumUserReviewWrapper>
          <AlbumUserWrapper>
            <AlbumInfo>
              <AlbumSpan>{album}</AlbumSpan>
              <ArtistSpan>{artist}</ArtistSpan>
            </AlbumInfo>

            <UserWrapper>
              <Star defaultValue={rating} fraction={2} readOnly={true} shape="fat" />
              <Link href={`/user/${sub}`} passHref>
                <UserInfo>
                  {/* <ProfileImageWrapper>
                    <Image src={user_image} alt="User profile image" layout="fill" objectFit="contain" />
                  </ProfileImageWrapper> */}
                  <NameSpan>{name}</NameSpan>
                  <DateWrapper>{convertEpochToReadableDateString(lastUpdated)}</DateWrapper>
                </UserInfo>
              </Link>
            </UserWrapper>
          </AlbumUserWrapper>

          <ReviewWrapper>
            {review.length > 256 && !showMore ? (
              <>
                <ReviewSpan>{review.substring(0, 256).concat("...")}</ReviewSpan>
                <>
                  <br />
                  <ShowLink href="#" onClick={() => setShowMore(true)}>
                    {" "}
                    Show more
                  </ShowLink>
                </>
              </>
            ) : null}
            {review.length <= 256 || showMore ? (
              <>
                <ReviewSpan>{review}</ReviewSpan>
                {review.length > 256 && (
                  <>
                    <br />
                    <ShowLink href="#" onClick={() => setShowMore(false)}>
                      {" "}
                      Show less
                    </ShowLink>
                  </>
                )}
              </>
            ) : null}
          </ReviewWrapper>
        </AlbumUserReviewWrapper>
      </CardWrapper>
    </motion.div>
  );
};
export default ReviewCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  ${GlassEffect}

  @media only screen and (max-width: 450px) {
    width: auto;
  }
`;

const AlbumUserReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumCoverWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  margin-right: 10px;
`;

const AlbumUserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
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

const ReviewWrapper = styled.div``;

const ReviewSpan = styled.span`
  font-size: 12px;
  font-style: italic;
`;

const ShowLink = styled.a`
  color: #1971c2;
  text-decoration: none;
  font-size: 11px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
const UserInfo = styled.a`
  display: flex;
  ${"" /* flex-direction: row; */}
  ${"" /* align-items: center; */}
  flex-direction: column;
  align-items: flex-end;
  text-decoration: none;
`;
const DateWrapper = styled.div`
  font-size: 10px;
  color: #495057;
`;
const NameSpan = styled.span`
  font-size: 15px;
  color: #495057;
  margin-bottom: 3px;
`;
const ProfileImageWrapper = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  clip-path: circle(12.5px at center);
  margin-right: 5px;
`;

const ReviewButtonsWrapper = styled.div`
  margin-top: 10px;
  width: 100px;
  button:first-child {
    margin-bottom: 5px;
  }
`;
