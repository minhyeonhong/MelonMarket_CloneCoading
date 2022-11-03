import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApis } from "../../apis/apiInstance"
import { setCookie, delCookie } from "../../cookie/cookie"


//로그인 Thunk
export const __login = createAsyncThunk(
    "members/__login",
    async (payload, thunkAPI) => {
        try {

            const res = await loginApis.loginAX(payload)

            const obj = {
                access_token: res.headers.access_token,
                data: res.data
            }
            return thunkAPI.fulfillWithValue(obj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

//로그아웃 Thunk
export const __logout = createAsyncThunk(
    "members/__logout",
    async (payload, thunkAPI) => {
        try {
            loginApis.logoutAX()
                .then((res) => {
                    if (res.data.statusCode === 200) {
                        delCookie("Access_Token")
                        delCookie("nickname")
                        alert("로그아웃 되었습니다")
                        window.location.replace("/")
                    }
                })
                .catch((error) => {
                    if (error.response.data.statusCode === 400) {
                        delCookie("Access_Token")
                        delCookie("nickname")
                        alert("로그아웃 되었습니다")
                        window.location.replace("/")
                    }

                })

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

            loginApis.joinAX(payload)
                .then((response) => {

                    if (response.msg === 200 || 200) {
                        alert('회원가입에 성공하였습니다!')

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
//이메일, 닉네임 중복확인 Thunk
export const __loginCheck = createAsyncThunk(
    "members/__loginCheck",
    async (payload, thunkAPI) => {
        try {

            loginApis.loginCheckAX(payload)
                .then((response) => {
                    if (response.statusCode === 200 || '200') {
                        alert("사용가능합니다!");
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
                setCookie("Access_Token", action.payload.access_token)
                setCookie("nickname", action.payload.data.accountName)
                alert("로그인에 성공하였습니다!")
                state.loginModal = !state.loginModal;
                //토큰때문에 리프레쉬 해줌
                window.location.replace("/")
            }
        },
        [__login.rejected]: (state, action) => {
            if (action.payload.status === 400) {
                alert(action.payload.message);
            }
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

