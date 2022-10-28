import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apis from "../../apis/apiInstance"


// export const __login = createAsyncThunk(
//     "members/login",
//     async (payload, thunkAPI) => {
//         try {
//             apis.loginAx(payload)
//             .then()


//             return thunkAPI.fulfillWithValue(response.data);
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// )

export const membersSlice = createSlice({
    name: "members",
    initialState: {
        member: [],
        modal: false
    },
    reducers: {
        modalTogle(state, action) {
            state.modal = !state.modal;
        }

    },
    extraReducers: {

    }
});

export const { modalTogle } = membersSlice.actions;
export default membersSlice.reducer;

