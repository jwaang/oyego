import withApollo from "@/hoc/withApollo";
import styled from "styled-components";
import { useLocalStorage } from "@/utils/hooks";
import Image from "next/image";
import { useEffect } from "react";

// Passing data between pages
// https://stackoverflow.com/questions/60899880/next-js-reduce-data-fetching-and-share-data-between-pages
// Can't use local storage
const CreateReview = () => {
  const [albumVariables, setAlbumVariables] = useLocalStorage("albumVariables");

  return (
    <Wrapper>
      <Image src={albumVariables.image} alt="Album cover" width={100} height={100} />
      <Name>{albumVariables.album}</Name>
      <Artist>{albumVariables.artist}</Artist>
      <TextArea rows="4" cols="50"></TextArea>
      <Button>Submit</Button>
    </Wrapper>
  );
};
export default withApollo(CreateReview);

const Wrapper = styled.div``;

const Name = styled.div``;

const Artist = styled.div``;

const TextArea = styled.textarea``;

const Button = styled.button``;
