import { createSlice } from "@reduxjs/toolkit";
import type { FETCH_ERROR, FETCH_IDLE, FETCH_LOADING } from "./vansConstant";
import { fetchVansAsync } from "./vansAction";

// Define a type for the slice state

export interface Van {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  type: string;
}

export type FETCH_STATE = FETCH_ERROR | FETCH_LOADING | FETCH_IDLE

export interface VansState {
  vans: Van[];
  status: FETCH_STATE;
  error: string;
}

// Define the initial state using that type
const initialState: VansState = {
  vans: [],
  status: "IDLE",
  error: "",
};

export const counterSlice = createSlice({
  name: "vans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all vans
      .addCase(fetchVansAsync.pending, (state) => {
        state.status = "LOADING";
        state.error = "";
      })
      .addCase(fetchVansAsync.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.vans = action.payload.vans;
      })
      .addCase(fetchVansAsync.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.error.message || "";
      })     
      ;
  },
});

// export const {  } = counterSlice.actions

export default counterSlice.reducer;
