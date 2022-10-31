import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { flushSync } from "react-dom";
import { contentsApis } from "../../apis/apiInstance"
import { setCookie, getCookie, delCookie } from "../../cookie/cookie"

export const __insertContent = createAsyncThunk(
    "contents/__insertContent",
    async (payload, thunkAPI) => {
        try {
            console.log("payload", payload);
            for (let key of payload.keys()) {
                console.log("payload", key, ":", payload.get(key));
            }
            contentsApis.insertContentAX(payload)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })


            // return thunkAPI.fulfillWithValue(response.data);
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


    }
});

export const { cntWriteModalTogle } = contentsSlice.actions;
export default contentsSlice.reducer;