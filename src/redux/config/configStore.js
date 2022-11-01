import { configureStore } from "@reduxjs/toolkit";
import membersSlice from "../modules/membersSlice";
import contentsSlice from "../modules/contentsSlice";
import commentsSlice from "../modules/commentsSlice"

const store = configureStore({
    reducer: {
        membersSlice,
        contentsSlice,
        commentsSlice
    },
    //배포 모드일때 리덕스 데브툴 사용 안함
    devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;
