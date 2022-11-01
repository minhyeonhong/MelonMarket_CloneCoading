import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import { contentsApis, commentApis } from "../../apis/apiInstance"
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"
import { useNavigate } from 'react-router-dom';

//게시글 작성
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
//댓글 작성
export const __insertComment = createAsyncThunk(
    "contents/__insertComment",

    async (payload, thunkAPI) => {
        console.log("코멘트 페이로드임", payload);
        try {
            const res = await commentApis.commentAddAX(payload)
            res.data.push(payload)
            return thunkAPI.fulfillWithValue(res.data);

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)

// 게시글 전체조회
export const __getContent = createAsyncThunk(
    "contents/__getContent",
    async (payload, thunkAPI) => {
        // console.log("GET 페이로드", payload);
        try {
            const res = await contentsApis.getContentAX(payload)

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
//게시글 상세조회
export const __getContentDetail = createAsyncThunk(
    "contents/__getContentDetail",
    async (payload, thunkAPI) => {
        console.log("GET 페이로드", payload);
        try {
            const res = await contentsApis.getContentDetailAX(payload)
            console.log("댓글 res값", res);

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
//게시글 수정
export const __editContent = createAsyncThunk(
    "contents/__editContent",
    async (payload, thunkAPI) => {
        try {
            const res = await contentsApis.updateContentAX(payload)

            return thunkAPI.fulfillWithValue(res);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
//게시글 삭제
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
        content: {},
        cntWriteModal: false
    },
    reducers: {
        //모달 토글
        cntWriteModalTogle(state, action) {
            state.cntWriteModal = !state.cntWriteModal;
        },
    },
    extraReducers: {
        //__insertComment
        [__insertComment.fulfilled]: (state, action) => {
            console.log("풀필완료 댓글", action.payload);
            if (action.payload.statusCode === 200) {
                alert("댓글 작성 성공!")
                // window.location.href = "/mypage"
            }
        },
        [__insertComment.rejected]: (state, action) => {
            state.error = action.payload;
        },
        //__insertContent
        [__insertContent.fulfilled]: (state, action) => {
            console.log("풀필 페이로드", action.payload);
            if (action.payload.statusCode === 200) {
                state.cntWriteModal = !state.cntWriteModal;
                alert("글작성 성공!")
                // window.location.href = "/mypage"
            }
        },
        [__insertContent.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [__getContent.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getContent.fulfilled]: (state, action) => {

            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.contents = action.payload;
        },
        [__getContent.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        [__getContentDetail.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getContentDetail.fulfilled]: (state, action) => {
            console.log("상세보기 추가 액션 페이로드", action.payload);
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.content = action.payload;
        },
        [__getContentDetail.rejected]: (state, action) => {
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