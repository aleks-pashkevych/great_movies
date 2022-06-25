import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SEARCH_MOVIE_URL, REVIEWS_URL } from "../constants";

export const fetchMoviesList = createAsyncThunk(
  "movies/fetchMoviesList",
  async ({ value, callback }) => {
    const { data } = await axios.get(`${SEARCH_MOVIE_URL}/${value}`);
    callback();
    if (data.results != null) {
      return data.results;
    } else {
      return [
        {
          description: "---------",
          id: "tt1258197",
          image:
            "https://imdb-api.com/images/original/MV5BNDg2NzM2NzIwNF5BMl5BanBnXkFtZTcwODE2ODc1Mg@@._V1_Ratio0.7273_AL_.jpg",
          title: "Exam"
        }
      ];
    }
  }
);

export const fetchMovieData = createAsyncThunk(
  "movies/fetchMovieData",
  async ({ id, callback }) => {
    const { data } = await axios.get(`${REVIEWS_URL}/${id}`);
    callback();
    return data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesList: [],
    moviesLoading: false,
    favorites: [],
    movieData: {},
    movieDataLoading: false,
    movieImage: {}
  },
  reducers: {
    updateMoviesList: (state, action) => {
      state.moviesList = action.payload;
    },
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    addImage: (state, action) => {
      state.movieImage = { ...state.movieImage, mainImage: action.payload };
    },
    addImageData: (state, action) => {
      state.movieImage = { ...state.movieImage, mainImageData: action.payload };
      console.log(state.movieImage);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesList.pending, (state, action) => {
      state.moviesLoading = true;
    });
    builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
      state.moviesList = action.payload;
      state.moviesLoading = false;
    });
    builder.addCase(fetchMoviesList.rejected, (state, action) => {
      console.log(action.error);
      state.moviesLoading = false;
    });
    builder.addCase(fetchMovieData.pending, (state, action) => {
      state.movieDataLoading = true;
    });
    builder.addCase(fetchMovieData.fulfilled, (state, action) => {
      state.movieData = action.payload;
      state.movieDataLoading = false;
      console.log("movieData: ", state.movieData);
    });
    builder.addCase(fetchMovieData.rejected, (state, action) => {
      console.error(action.error);
      state.movieDataLoading = false;
    });
  }
});

export const {
  updateMoviesList,
  updateFavorites,
  addToFavorites,
  addImage,
  addImageData
} = moviesSlice.actions;
export default moviesSlice.reducer;
