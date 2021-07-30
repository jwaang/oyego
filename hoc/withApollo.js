// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "next-with-apollo";
import config from "@/server/config";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
      uri: process.env.BASE_URL_GRAPH,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              getAllReviewsBySub: {
                merge(existing, incoming) {
                  // use only incoming array
                  return incoming;
                },
              },
            },
          },
        },
      }).restore(initialState || {}),
    });
  },
  {
    render: function withApolloRender({ Page, props }) {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
