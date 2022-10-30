// 콘솔 주석 확인 완료!
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { commentApis } from '../../apis/apiInstance';
import { getCookie } from "../../cookie/cookie";

// initial State
const initialState = {
    comments: [],
    isLoading: false,
    error: null,
}
const params = {
    key: process.env.REACT_APP_COMMENT,
};
const SERVICE_URL = params.key


export const __addComment = createAsyncThunk(
    "comments/addcomment",
    async (payload, thunkAPI) => {
        try {
            commentApis.commentAddAX(payload).then((response) => {
                //   return thunkAPI.fulfillWithValue(response.data.data);        
            })

        } catch (error) {
            alert("로그인이 필요합니다.")
            window.location.replace('/')
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __deleteComment = createAsyncThunk(
    "comments/deletecomment",
    async (payload, thunkAPI) => {
        try {
            commentApis.commentDeletePostAX(payload)

            return thunkAPI.fulfillWithValue(payload);
        } catch (error) {
            alert("로그인이 필요합니다.")
            window.location.replace('/')
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//extraReducers
export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    extraReducers: {
        //추가
        [__addComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__addComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments.push(action.payload);

        },
        [__addComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //삭제
        [__deleteComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = state.comments.filter((item) => item.commentid !== action.payload.id);
            // 아이디값이 두개가 들어갔으므로 (payload에 두 개) 특정 아이디값을 지칭해줘야한다.
        },
        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});



// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { getComment, addComment, deleteComment } = commentsSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentsSlice.reducer;