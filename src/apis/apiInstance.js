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
        'content-type': 'application/json;charset=UTF-8',
        accept: 'application/json,',
        "Access_Token": getCookie("token") === undefined ? "" : getCookie("token"),
        "Access-Control-Allow-Origin": "*",
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



    //댓글 작성
    commentAddAX: (commentInfo) => hInstance.post(`${commentInfo.url}/comment`, commentInfo.data),

    //댓글 삭제
    commentDeletePostAX: (id) => hInstance.delete(`/api/comment/${id}`),

};


export const contentsApis = {
    //컨텐츠

};

//이런식으로 쓴다
// const getMyList = (offset) => {
//     apis
//         .getMyListAX(offset)
//         .then((response) => {
//             const data = response.data.data;
//             setMyList((prev) => [...prev, data.dataList]);
//             setMaxPage((prev) => ({ ...prev, myPost: data.maxPage }));
//             setDataSize((prev) => ({ ...prev, myPost: data.dataSize }));
//             setTimeout(500);
//         })
//         .catch((err) => {
//             alert(err);
//         });
// };

export default loginApis;
