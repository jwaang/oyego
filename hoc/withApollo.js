import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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
      uri: config.BASE_URL,
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
