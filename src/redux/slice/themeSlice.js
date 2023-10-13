import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    themes : [],
    allTheme : []
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    STORE_THEME(state, action){
        // console.log(action.payload);
        state.themes = action.payload;
    },
    STORE_ALL_THEME(state, action){
      state.allTheme = action.payload;
    }

  }
});

export const {STORE_THEME,STORE_ALL_THEME} = themeSlice.actions

export const selectThemes = (state) => state.theme.themes;
export const selectAllThemes = (state) => state.theme.allTheme;
export default themeSlice.reducer