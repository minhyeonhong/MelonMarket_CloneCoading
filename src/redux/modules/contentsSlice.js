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

export const __getContent = createAsyncThunk(
    "contents/__getContent",
    async (payload, thunkAPI) => {
        console.log("GET 페이로드", payload);
        try {
            const res = await contentsApis.getContentAX(payload)

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const __editContent = createAsyncThunk(
    "contents/__editContent",
    async (payload, thunkAPI) => {
        try {
            const res = await contentsApis.updateContentAX(payload)

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const __deleteContent = createAsyncThunk(
    "contents/__deleteContent",
    async (payload, thunkAPI) => {
        try {
            const res = await contentsApis.deleteContentAX(payload)

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
            if (action.payload.statusCode === 200) {
                alert("글작성 성공!")
                state.cntWriteModal = !state.cntWriteModal;
                //useNavigate("/mypage");

            }
        },
        [__insertContent.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [__getContent.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getContent.fulfilled]: (state, action) => {
            console.log("GET 액션 페이로드", action.payload);
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.contents = action.payload;
        },
        [__getContent.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },

        [__editContent.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__editContent.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.contents = action.payload;
        },
        [__editContent.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },

        [__deleteContent.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__deleteContent.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.contents = state.commentList.filter(
                (item) => item.id !== action.payload
            );
            // 바로 지워지려면 state.commentList를 설정...
            // 서버 단에서 지우는게 있고 리덕스에서 지우는게 따로 있다.
        },
        [__deleteContent.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
    }
});

export const { cntWriteModalTogle } = contentsSlice.actions;
export default contentsSlice.reducer;