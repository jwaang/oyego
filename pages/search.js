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
import { motion } from "framer-motion";
import { Title } from "@/variables/shared";
import { GlassEffect } from "@/variables/shared";

const Search = () => {
  const [session, loading] = useSession();
  const [searchInput, setSearchInput] = useState("");
  const [getSearchResults, { loading: searchLoading, data }] = SearchAlbumsQuery();
  const [currentSearch, setCurrentSearch] = useState(searchInput);
  let transitionDelay = 0;

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
          <Title>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
            >
              Album Search
            </motion.div>
          </Title>
          {searchLoading && <Spinner />}
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 50 }}>
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
          </motion.div>

          <SubTitle>
            {currentSearch !== "" && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, type: "spring", stiffness: 50 }}
              >
                <p>
                  Matches found for <span>{currentSearch}</span>
                </p>
              </motion.div>
            )}
          </SubTitle>

          <SearchCardsWrapper>
            {data && data.searchAlbums && data.searchAlbums.albums && data.searchAlbums.albums.items
              ? data.searchAlbums.albums.items.map((album) => (
                  <SearchCardResults
                    key={album.id}
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (transitionDelay += 0.2), duration: 1.25, type: "spring", stiffness: 100 }}
                  >
                    <SearchCard id={album.id} image={album.images[0].url} album={album.name} artist={album.artists[0].name} />
                  </SearchCardResults>
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

const SearchCardResults = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const GlassCard = styled.div`
  display: flex;
  flex-direction: column;
  ${GlassEffect}
`;

const SubTitle = styled.div`
  font-size: 15px;
  color: #50555b;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-weight: 400;
  margin-bottom: 15px;
  span {
    color: #212529;
    font-weight: bold;
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
  ${"" /* row-gap: 3.5rem; */}
  row-gap: 1rem;
  max-width: 800px;
  justify-content: center;
`;
