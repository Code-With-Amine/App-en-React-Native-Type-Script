import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

export const FETCH_POSTS_QUERY = gql`
  query {
    posts {
      data {
        id
        title
      }
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
    }
  }
`;
