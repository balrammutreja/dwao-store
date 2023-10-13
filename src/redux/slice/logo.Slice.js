import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    logos: []
}

const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    STORE_LOGOS(state, action){
        // console.log(action.payload);
        state.logos = action.payload;
    }
  }
});

export const {STORE_LOGOS} = logoSlice.actions

export const selectLogos = (state) => state.logo.logos;

export default logoSlice.reducer