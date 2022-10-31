import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import { contentsApis } from "../../apis/apiInstance"
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"

export const __insertContent = createAsyncThunk(
    "contents/__insertContent",
    async (payload, thunkAPI) => {
        try {
            const res = contentsApis.insertContentAX(payload)

            return thunkAPI.fulfillWithValue(res);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

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
        //__insertContent
        [__insertContent.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log("action.payload : ", action.payload);
        },
        [__insertContent.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});

export const { cntWriteModalTogle } = contentsSlice.actions;
export default contentsSlice.reducer;