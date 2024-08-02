import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Item {
  id: number;
  title: string;
}

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
};

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

const FETCH_ITEMS_QUERY = gql`
  query {
    posts {
      data {
        id
        title
      }
    }
  }
`;

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  try {
    const response = await client.query({
      query: FETCH_ITEMS_QUERY,
      fetchPolicy: "network-only",
    });

    return response.data.posts.data as Item[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch items";
      });
  },
});

export const selectAllItems = (state: RootState) => state.items.items;
export const getItemsStatus = (state: RootState) => state.items.status;
export const getItemsError = (state: RootState) => state.items.error;

export default itemsSlice.reducer;
