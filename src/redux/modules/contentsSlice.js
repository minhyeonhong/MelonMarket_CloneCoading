import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import { contentsApis, commentApis } from "../../apis/apiInstance"
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"
import { useNavigate } from "react-router-dom";


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
        try {
            const res = await commentApis.commentAddAX(payload)
            const obj = {
                comment: payload.comment,
                data: res.data,
            }

            return thunkAPI.fulfillWithValue(obj);

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//댓글 삭제
export const __deleteComment = createAsyncThunk(
    "contents/__deleteComment",
    async (payload, thunkAPI) => {
        try {
            const res = await commentApis.commentDeletePostAX(payload)
            const obj = {
                delCommentId: payload,
                data: res.data,
            }
            return thunkAPI.fulfillWithValue(obj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

// 게시글 전체조회
export const __getContent = createAsyncThunk(
    "contents/__getContent",
    async (payload, thunkAPI) => {
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
        try {
            const res = await contentsApis.getContentDetailAX(payload)
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
            const obj = {
                upContentId: payload,
                data: res.data,
            }
            return thunkAPI.fulfillWithValue(obj);
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
            const obj = {
                delContentId: payload,
                data: res.data,
            }
            return thunkAPI.fulfillWithValue(obj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const __mypage = createAsyncThunk(
    "contents/__mypage",
    async (payload, thunkAPI) => {
        try {
            const res = await contentsApis.mypageAX();
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
        content: {},
        comments: [],
        cntWriteModal: false
    },
    reducers: {
        //모달 토글
        cntWriteModalTogle(state, action) {
            state.cntWriteModal = !state.cntWriteModal;
        },
    },
    extraReducers: {
        //__댓글 작성
        [__insertComment.fulfilled]: (state, action) => {
            if (action.payload.data.statusCode === 200) {
                state.comments.push(action.payload.comment)
            }
        },
        [__insertComment.rejected]: (state, action) => {
            state.error = action.payload;
        },
        //댓글 삭제
        [__deleteComment.pending]: (state) => {
            state.isLoading = true; // 
        },
        [__deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false; // 
            if (action.payload.data.statusCode === 200) {
                state.comments = state.comments.splice(action.payload.delCommentId, 1)
            }

        },

        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false; // 
            state.error = action.payload; // 
        },

        //__게시글 작성
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
        //__게시글 조회        
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
        //__상세 조회
        [__getContentDetail.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getContentDetail.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.content = action.payload;
            state.comments = action.payload.comments;
        },
        [__getContentDetail.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        //게시글 수정
        [__editContent.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__editContent.fulfilled]: (state, action) => {
            state.isLoading = false; // 
            state.contents = action.payload;
        },
        [__editContent.rejected]: (state, action) => {
            state.isLoading = false; // 
            state.error = action.payload; // 
        },
        //게시글 삭제
        [__deleteContent.pending]: (state) => {
            state.isLoading = true; // 
        },
        [__deleteContent.fulfilled]: (state, action) => {
            state.isLoading = false; // 

            if (action.payload.data.statusCode === 200) {
                state.contents.splice(action.payload.delContentId, 1)
                window.location.replace("/")
            }

        },
        [__deleteContent.rejected]: (state, action) => {
            state.isLoading = false; // 
            state.error = action.payload; // 
        },
        //__mypage
        [__mypage.fulfilled]: (state, action) => {
            state.mypage = action.payload;
        },
        [__mypage.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { cntWriteModalTogle } = contentsSlice.actions;
export default contentsSlice.reducer;