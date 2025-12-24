import {createSlice} from '@reduxjs/toolkit';


const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeFeed:()=>null,
        removeUserFromFeed:(state,action)=>{
            const newFeed=state.filter(el=>el._id!==action.payload);
            return newFeed;
        }

    }
})
export const{addFeed,removeFeed,removeUserFromFeed}=feedSlice.actions;
export default feedSlice.reducer;