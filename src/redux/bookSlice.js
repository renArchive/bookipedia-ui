import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBooksList } from '../api/books';

export const fetchBooks = createAsyncThunk("fetchBooks", getBooksList);

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    isLoading: false,
    error: false,
    books: [],
    searchTerm: ''
  },
  reducers: {
    setSearchTerm : (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.error = true;
    });
  }
});

export const { setSearchTerm } = bookSlice.actions;

export default bookSlice.reducer