import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import loginApis from "../../apis/apiInstance"
import axios from "axios";
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"
import { useNavigate } from 'react-router-dom';


//로그인 Thunk
export const __login = createAsyncThunk(
    "members/__login",
    async (payload, thunkAPI) => {
        try {
            const navigate = useNavigate();
            console.log("getCookie", getCookie("token"));
            loginApis.loginAX(payload)
                .then((response) => {
                    console.log("로그인 response", response);
                    const Access_Token = response.headers.access_token;
                    if (response.data.statusCode === 200 || '200') {
                        setCookie(
                            "Access_Token",
                            Access_Token
                        );
                        setCookie("nickname", response.data.accountName);
                        alert(response.data.message);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400 || '400') {
                        alert(error.response.data.message);
                    }
                })

            // return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
// 회원가입 Thunk
export const __join = createAsyncThunk(
    "members/__join",
    async (payload, thunkAPI) => {
        try {
            console.log("회원가입 페이로드", payload);
            loginApis.joinAX(payload)
                .then((response) => {
                    console.log("회원가입 response", response);
                    if (response.msg === 200 || 200) {
                        alert('회원가입에 성공하였습니다!')
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400 || '400') {
                        alert(error.response.data.message);
                    }
                })
            //console.log("response", response)
            // return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
//이메일, 닉네임 중복확인 Thunk
export const __loginCheck = createAsyncThunk(
    "members/__loginCheck",
    async (payload, thunkAPI) => {
        try {
            console.log("중복체크 페이로드", payload);
            loginApis.loginCheckAX(payload)
                .then((response) => {
                    console.log("loginCheckAX response", response);
                })
                .catch((error) => {
                    if (error.response.status === 400 || '400') {
                        console.log("중복체크 오류 메시지", error);
                        alert(error.response.data.message);
                    }
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

