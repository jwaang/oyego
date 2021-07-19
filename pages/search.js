import { useSession, getSession } from "next-auth/client";
import withApollo from "@/hoc/withApollo";
import { useState } from "react";
import { SearchAlbumsQuery } from "@/apollo/actions";
import SearchCard from "@/components/shared/SearchCard";

const Search = () => {
  const [session, loading] = useSession();
  const [searchInput, setSearchInput] = useState("");
  const [getSearchResults, { loading: searchLoading, data }] = SearchAlbumsQuery();

  if (loading) return <p>Loading Search Page</p>;

  if (typeof window !== "undefined" && loading) return null;

  if (session) {
    return (
      <>
        <h1>Search Page</h1>
        <p>Search for an album to begin reviewing it! 🥳</p>
        <input
          type="text"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        ></input>
        <button
          onClick={() =>
            getSearchResults({
              variables: {
                artist: searchInput,
                accessToken: session.user.accessToken,
                limit: "5",
              },
            })
          }
        >
          Search
        </button>

        {searchLoading ? "Fetching data" : <p>Search Results</p>}

        {data && data.searchAlbums && data.searchAlbums.albums && data.searchAlbums.albums.items
          ? data.searchAlbums.albums.items.map((album) => (
              <SearchCard key={album.id} id={album.id} image={album.images[0].url} album={album.name} artist={album.artists[0].name} />
            ))
          : null}
      </>
    );
  }
  return <p>Access Denied ❌</p>;
};
export default withApollo(Search);

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
