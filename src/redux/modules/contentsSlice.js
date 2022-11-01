import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import { contentsApis } from "../../apis/apiInstance"
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"
import { useNavigate } from "react-router-dom";

export const __insertContent = createAsyncThunk(
    "contents/__insertContent",
    async (payload, thunkAPI) => {
        try {
            const res = await contentsApis.insertContentAX(payload)

            return thunkAPI.fulfillWithValue(res.data);
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
            if (action.payload.statusCode === 200) {
                alert("글작성 성공!")
                state.cntWriteModal = !state.cntWriteModal;
                useNavigate("/mypage");
            }
        },
        [__insertContent.rejected]: (state, action) => {
            state.error = action.payload;
        },

    }
});

export const { cntWriteModalTogle } = contentsSlice.actions;
export default contentsSlice.reducer;