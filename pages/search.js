import { SearchAlbumsQuery } from "@/apollo/actions";
import SearchCard from "@/components/cards/SearchCard";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Redirect from "@/components/shared/Redirect";
import Spinner from "@/components/shared/Spinner";
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

  if (loading)
    return (
      <BaseLayout>
        &nbsp;
        <Spinner />
      </BaseLayout>
    );

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
          <Title>Album Search</Title>
          {searchLoading && <Spinner />}
          <GlassCard>
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
          </GlassCard>

          <SubTitle>
            {currentSearch !== "" && (
              <p>
                Matches found for <span>{currentSearch}</span>
              </p>
            )}
          </SubTitle>

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
  padding-top: 80px;
`;

const Title = styled.span`
  font-size: 25px;
  color: #fff;
  text-transform: uppercase;
  -webkit-letter-spacing: 0.075em;
  -moz-letter-spacing: 0.075em;
  -ms-letter-spacing: 0.075em;
  letter-spacing: 0.15em;
  font-weight: 500;
  margin-bottom: 25px;
`;

const GlassCard = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
  backdrop-filter: blur(15px) saturate(120%);
  -webkit-backdrop-filter: blur(15px) saturate(120%);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
`;

const SubTitle = styled.div`
  font-size: 15px;
  color: #50555b;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-weight: 400;
  margin-bottom: 15px;
  span {
    color: #fff;
  }
`;

const SearchAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  input {
    margin-right: 10px;
  }
  button {
    flex-basis: 100px;
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const SearchCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;
  max-width: 800px;
  justify-content: center;
`;
