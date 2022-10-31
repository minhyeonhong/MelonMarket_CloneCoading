import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";

import loginApis from "../../apis/apiInstance"
import { setCookie, getCookie } from "../../cookie/cookie"

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//로그인 Thunk
export const __login = createAsyncThunk(
    "members/__login",
    async (payload, thunkAPI) => {


        try {
            console.log("로그인 페이로드 확인", payload)
            const data = await loginApis.loginAX(payload)
            //  기존 로직
            // .then((response) => {
            //     console.log("로그인 받은 response", response);
            //     const Access_Token = response.headers.access_token;
            //     if (response.data.statusCode === 200 || '200') {
            //         setCookie(
            //             "Access_Token",
            //             Access_Token
            //         );
            //         setCookie("nickname", payload.email);
            //         alert(response.data.message);

            //         useNavigate("/")
            //         // // navigate("/");
            //     }
            // })

            // .catch((error) => {
            //     if (error.status === 400 || '400') {
            //         alert(error.response.data.message);
            //     }
            // })
            return thunkAPI.fulfillWithValue(data);
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
                    if (response.statusCode === 200 || '200') {
                        alert("사용가능합니다!");
                    }
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
        loginModal: false
    },
    reducers: {
        //모달 토글
        modalTogle(state, action) {
            state.loginModal = !state.loginModal;
        },
    },
    extraReducers: {
        //__login
        [__login.fulfilled]: (state, action) => {

            if (action.payload.data.message === "Success Login") {
                setCookie("Access_Token", action.payload.headers.access_token)
                setCookie("nickname", action.payload.data.accountName)
                alert("로그인에 성공하였습니다!")
                state.loginModal = !state.loginModal;
            }
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

