import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { id:0,
                            fname:"",
                            lname:"",
                            field:"",
                            faculty:"",
                            email:"",
                            phone:"",
                            image:"",
                            personnelName:"",
                            positionid:0,
                            personnelid:0,
                            isStudent: false,
                           }

export const userInfoSlice = createSlice({
    name:'userInfo',
    initialState: {value: initialStateValue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = ""
        }
    }
})

export const { login, logout } = userInfoSlice.actions;

export default userInfoSlice.reducer;