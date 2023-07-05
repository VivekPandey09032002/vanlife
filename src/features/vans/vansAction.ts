import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVansAsync = createAsyncThunk("vans/fetchAll", async () => {
  const response = await fetch("/api/vans");
  return  response.json();
});



