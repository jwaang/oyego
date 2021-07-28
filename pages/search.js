import { SearchAlbumsQuery } from "@/apollo/actions";
import SearchCard from "@/components/cards/SearchCard";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Redirect from "@/components/shared/Redirect";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import { useSession } from "next-auth/client";
import { useState } from "react";
import styled from "styled-components";

const Search = () => {
  const [session, loading] = useSession();
  const [searchInput, setSearchInput] = useState("");
  const [getSearchResults, { loading: searchLoading, data }] = SearchAlbumsQuery();
  const [currentSearch, setCurrentSearch] = useState(searchInput);

  if (loading) return <p>Loading Search Page</p>;

  if (typeof window !== "undefined" && loading) return null;

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      setCurrentSearch(searchInput);
      getSearchResults({
        variables: {
          artist: searchInput,
          accessToken: session.user.accessToken,
          limit: "10",
        },
      });
    }
  };

  if (session) {
    return (
      <BaseLayout>
        <SearchWrapper>
          <SearchAreaWrapper>
            <Input onChangeFunction={handleSearchInput} onKeyPressFunction={handleKeyPress} />
            <Button
              onClickFunction={() => {
                setCurrentSearch(searchInput);
                getSearchResults({
                  variables: {
                    artist: searchInput,
                    accessToken: session.user.accessToken,
                    limit: "10",
                  },
                });
              }}
              text="Search"
              variant="primary"
              size="large"
            />
          </SearchAreaWrapper>

          <Title>{currentSearch !== "" && <p>Matches found for “{currentSearch}”</p>}</Title>

          <SearchCardsWrapper>
            {data && data.searchAlbums && data.searchAlbums.albums && data.searchAlbums.albums.items
              ? data.searchAlbums.albums.items.map((album) => (
                  <SearchCard key={album.id} id={album.id} image={album.images[0].url} album={album.name} artist={album.artists[0].name} />
                ))
              : null}
          </SearchCardsWrapper>
        </SearchWrapper>
      </BaseLayout>
    );
  } else {
    return <Redirect to="/" query={{ message: "NOT_AUTHENTICATED" }} />;
  }
};
export default withApollo(Search);

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-weight: 400;
  margin-bottom: 15px;
`;

const SearchAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  input {
    margin-right: 10px;
  }
`;

const SearchCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;
  max-width: 800px;
`;
