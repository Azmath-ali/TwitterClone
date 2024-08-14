import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tweet: null,
  refresh : false,
  isActive: true

}

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {

    getAllTweets : (state, action)=>{
      state.tweet = action.payload
    },

    getRefresh : (state)=>{
      state.refresh = !state.refresh
    },

    getIsActive : (state, action)=>{
      state.isActive = action.payload
    }

   
   
  },
})

// Action creators are generated for each case reducer function
export const { getAllTweets, getRefresh, getIsActive } = tweetSlice.actions

export default tweetSlice.reducer