import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  otherUser : null,
  profile : null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    getUser  :(state, action)=>{
        state.user = action.payload
    },

    getOtherUser : (state, action)=>{
        state.otherUser = action.payload
    },

    getMyProfile : (state, action)=>{
        state.profile = action.payload
    },

    getFollowing :(state, action)=>{
      if(state.user.following.includes(action.payload)){
        // Unfollow
        state.user.following = state.user.following.filter((val)=>{
          return val !== action.payload
        })
      }

      else{
        //  Follow
        state.user.following.push(action.payload)
      }
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { getUser, getOtherUser, getMyProfile,getFollowing } = userSlice.actions

export default userSlice.reducer