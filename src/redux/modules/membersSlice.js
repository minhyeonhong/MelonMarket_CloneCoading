import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import loginApis from "../../apis/apiInstance"
import axios from "axios";
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"

export const __login = createAsyncThunk(
    "members/__login",
    async (payload, thunkAPI) => {
        try {
            console.log("getCookie", getCookie("token"));
            //const response = loginApis.loginAX(payload);

            //loginApis.loginAX(JSON.stringify(payload))
            loginApis.loginAX(payload)
                .then((response) => {
                    console.log("loginAX response", response);
                })
                .catch((error) => {
                    console.log("loginAX error", error);
                })

            // return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const __join = createAsyncThunk(
    "members/__join",
    async (payload, thunkAPI) => {
        try {


            console.log("joinAX payload", payload);

            loginApis.joinAX(payload)
                .then((response) => {
                    console.log("joinAX response", response);
                })
                .catch((error) => {
                    console.log("joinAX error", error);
                })



            //console.log("response", response)

            // return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const membersSlice = createSlice({
    name: "members",
    initialState: {
        member: [],
        modal: false
    },
    reducers: {
        //모달 토글
        modalTogle(state, action) {
            state.modal = !state.modal;
        },
    },
    extraReducers: {
        //__login
        [__login.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [__login.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //__join
        [__join.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [__join.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});

export const { modalTogle } = membersSlice.actions;
export default membersSlice.reducer;

