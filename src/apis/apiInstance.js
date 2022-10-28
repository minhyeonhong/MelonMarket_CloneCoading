import axios from "axios";
import { setCookie, getCookie, delCookie } from "../cookie/cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: process.env.REACT_APP_API_LOCAL_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Access_Token: getCookie("token"),
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export const loginApis = {
  //로그인
  loginAX: (loginInfo) => instance.post(`/auth/login`, loginInfo),
  //회원가입
  joinAX: (joinInfo) => instance.post(`/auth/signup`, joinInfo),
  //회원가입 아이디 중복 체크
  loginCheckAX: (email) => instance.post(`/auth/idCheck`, email),
  //회원가입 낙네임 중복 체크
  loginCheckAX: (name) => instance.post(`/auth/nameCheck`, name),

  //게시글 삭제
  getDeletePostAX: (id) => instance.delete(`/detail/delete?boardId=${id}`),

  //마이페이지 계정 수정 페이지
  putUserInfoAX: (userinfo) => instance.put("/my/update", userinfo),
};

export const contentsApis = {
  //로그인
  loginAX: (loginInfo) => instance.post(`/auth/login`, loginInfo),
  //회원가입
  joinAX: (joinInfo) => instance.post(`/auth/signup`, joinInfo),
  //회원가입 아이디 중복 체크
  loginCheckAX: (email) => instance.post(`/auth/idCheck`, email),
  //회원가입 낙네임 중복 체크
  loginCheckAX: (name) => instance.post(`/auth/nameCheck`, name),

  //게시글 삭제
  getDeletePostAX: (id) => instance.delete(`/detail/delete?boardId=${id}`),

  //마이페이지 계정 수정 페이지
  putUserInfoAX: (userinfo) => instance.put("/my/update", userinfo),
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
