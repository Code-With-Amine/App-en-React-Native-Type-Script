import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Post {
  id: number;
  title: string;
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

const FETCH_POSTS_QUERY = gql`
  query {
    posts {
      data {
        id
        title
      }
    }
  }
`;

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const response = await client.query({
      query: FETCH_POSTS_QUERY,
      fetchPolicy: "network-only",
    });

    return response.data.posts.data as Post[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Echec de la récupération des éléments";
      });
  },
});

export const selectAllItems = (state: RootState) => state.items.posts;
export const getItemsStatus = (state: RootState) => state.items.status;
export const getItemsError = (state: RootState) => state.items.error;

export default postsSlice.reducer;
