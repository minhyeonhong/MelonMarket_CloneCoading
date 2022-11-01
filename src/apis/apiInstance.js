import axios from "axios";
import { setCookie, getCookie, delCookie } from "../cookie/cookie";



const nhinstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    //baseURL: process.env.REACT_APP_API_LOCAL_URL,
    headers: {

    },
});

const hInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access_Token": getCookie("Access_Token") === undefined ? "" : getCookie("Access_Token"),
    },
    withCredentials: true,
});

export const loginApis = {
    //로그인
    loginAX: (loginInfo) => nhinstance.post(`/auth/login`, loginInfo),
    //회원가입
    joinAX: (joinInfo) => nhinstance.post(`/auth/signup`, joinInfo),

    //회원가입 이메일 중복 체크
    // loginEmailCheckAX: (email) => nhinstance.post(`/auth/idCheck`, email),

    //회원가입 이메일, 닉네임 중복 체크
    loginCheckAX: (userinfo) => nhinstance.post(`${userinfo.url}`, userinfo.data),

    //게시글 삭제
    getDeletePostAX: (id) => nhinstance.delete(`/detail/delete?boardId=${id}`),

    //마이페이지 계정 수정 페이지
    putUserInfoAX: (userinfo) => nhinstance.put("/my/update", userinfo),
};

export const commentApis = {
    ///api/{postId}/comment
    //댓글 작성
    commentAddAX: (commentInfo) => hInstance.post(`/api/${commentInfo.id}/comment`, commentInfo.comment),

    //댓글 삭제
    //명세서 /api/comment/{commetId}
    commentDeletePostAX: (id) => hInstance.delete(`/api/comment/${id}`),



};


export const contentsApis = {
    //컨텐츠 작성
    insertContentAX: (contentInfo) => hInstance.post(`/api/posts`, contentInfo),

    //컨텐츠 전체 불러오기
    getContentAX: (contentInfo) => hInstance.get(`/api/posts`),

    //컨텐츠 상세 불러오기
    ///api/posts/{postId}
    getContentDetailAX: (contentInfo) => hInstance.get(`/api/posts/${contentInfo}`),

    //컨텐츠 삭제
    deleteContentAX: (contentInfo) => hInstance.post(`/api/posts/${contentInfo}`),

    //컨텐츠 수정
    updateContentAX: (contentInfo) => hInstance.post(`/api/posts/${contentInfo}`, contentInfo),

};


