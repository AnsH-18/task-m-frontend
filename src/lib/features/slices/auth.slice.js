import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import dotenv from "dotenv"
import { BASE_SERVER_URL } from "../../../constants" 




dotenv.config(
    {path: "../../.env"}
)

const initialState = {
    userName: "",
    loggedin: false,
    loading: false,
    status: 0
}

const registerUser = createAsyncThunk(
    "/auth/register",
    async (userCredentials) => {
        const baseUrl =  `${BASE_SERVER_URL}/signin`
        const url = new URL(baseUrl)
        url.searchParams.set("userName", userCredentials.userName)
        url.searchParams.set("password", userCredentials.password)

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
              credentials: "include"
        })

        const data = await response.json()
        const status = response.status
        const payload = {
            status,
            data
        }
        return payload



    }
)

const loginUser = createAsyncThunk(
    "/auth/login",
    async (userCredentials) => {
        const baseUrl =  `${BASE_SERVER_URL}/login`
        const url = new URL(baseUrl)
        url.searchParams.set("userName", userCredentials.userName)
        url.searchParams.set("password", userCredentials.password)

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
              credentials: "include"
        })
        const data = await response.json()
        const status = response.status
        const payload = {
            status,
            data
        }
        return payload
    }


)
 
const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.status = action.payload.status
            if(state.status === 200){
                state.loggedin = false
                state.userName = action.payload.data.userName
                state.loading = false
                state.status = 200
            }
            else{
                state.loading = false
                state.status = 500
                state.loggedin = false
                state.userName = ""
            }
        })
        .addCase(loginUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = action.payload.status
            if(state.status === 200){
                state.loggedin = true
                state.userName = action.payload.data.data.userName
                state.loading = false
            }
            else{
                state.loading = false
                state.status = 500
                state.loggedin = false
                state.userName = ""
            }
        })

    }
})


export {registerUser, loginUser}
export default authSlice.reducer