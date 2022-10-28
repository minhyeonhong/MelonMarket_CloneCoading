import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import loginApis from "../../apis/apiInstance"


export const __login = createAsyncThunk(
    "members/__login",
    async (payload, thunkAPI) => {
        try {
            console.log("loginAX payload", payload);
            const response = loginApis.loginAX(payload);

            console.log("loginAX response", response);


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
            const response = loginApis.joinAX(payload);

            console.log("joinAX response", response);

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

