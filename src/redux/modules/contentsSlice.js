import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import loginApis from "../../apis/apiInstance"
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"

// export const __getList = createAsyncThunk(
//     "contents/__getList",
//     async (payload, thunkAPI) => {
//         try {
//             console.log("getCookie", getCookie("token"));


//             // return thunkAPI.fulfillWithValue(response.data);
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// )

export const contentsSlice = createSlice({
    name: "contents",
    initialState: {
        contents: [],
        cntWriteModal: false
    },
    reducers: {
        //모달 토글
        cntWriteModalTogle(state, action) {
            state.cntWriteModal = !state.cntWriteModal;
        },
    },
    extraReducers: {


    }
});

export const { cntWriteModalTogle } = contentsSlice.actions;
export default contentsSlice.reducer;