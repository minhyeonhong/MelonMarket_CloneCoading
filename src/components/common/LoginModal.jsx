import React, { useEffect } from 'react';
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { modalTogle, __join, __login } from "../../redux/modules/membersSlice";

import Input from '../elements/Input';
import Button from '../elements/Button';
import useInput from '../../hooks/useInput';
import { useState } from 'react';

const LoginModal = () => {
    const dispatch = useDispatch();

    const { modal } = useSelector(state => state.membersSlice);

    const [join, setJoin, joinHandle] = useInput({
        email: "",
        accountPw: "",
        accountPwConfirm: "",
        accountName: "",
        phoneNum: ""
    });
    const [login, setLogin, loginHandle] = useInput({
        email: "",
        accountPw: ""
    });

    const closeModal = () => {
        dispatch(modalTogle(!modal));
    }

    const signUpHandle = () => {
        const obj = {
            email: join.email,
            accountPw: join.accountPw,
            accountPwConfirm: join.accountPwConfirm,
            accountName: join.accountName,
            phoneNum: join.phoneNum
        }

        dispatch(__join(obj));
    }

    const signHandle = () => {
        const obj = {
            email: login.email,
            accountPw: login.accountPw
        }

        dispatch(__login(obj));
    }

    const [toggle, setToggle] = useState(true);
    const toggleBtnHandle = () => {
        setToggle(!toggle);
    }

    return (
        <StModalWrap>
            <button onClick={closeModal} className='close'>close</button>
            <StLoginWrap toggle={toggle}>
                <Input size='large' onChange={loginHandle} name="email" value={login.email || ""} type="email" placeholder="id" />
                <Input size='large' onChange={loginHandle} name="accountPw" value={login.accountPw || ""} type="password" placeholder="pw" />
                <Button onClick={signHandle} >login</Button>
            </StLoginWrap>
            <StJoinWrap toggle={toggle}>
                <Input size='large' onChange={joinHandle} name="email" value={join.email || ""} type="email" placeholder="id" />
                <Input size='large' onChange={joinHandle} name="accountPw" value={join.accountPw || ""} type="password" placeholder="pw" />
                <Input size='large' onChange={joinHandle} name="accountPwConfirm" value={join.accountPwConfirm || ""} type="password" placeholder="confirm pw" />
                <Input size='large' onChange={joinHandle} name="accountName" value={join.accountName || ""} type="text" placeholder="nick name" />
                <Input size='large' onChange={joinHandle} name="phoneNum" value={join.phoneNum || ""} type="text" placeholder="phone number" />
                <Button onClick={signUpHandle} >register</Button>
            </StJoinWrap>

            <Button onClick={toggleBtnHandle} >{toggle ? "가입하기" : "로그인하기"}</Button>

        </StModalWrap>
    );
};

export default LoginModal;

const StLoginWrap = styled.div`
    display : ${(props) => props.toggle ? "flex" : "none"};
    width : 100%;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`
const StJoinWrap = styled.div`
    display : ${(props) => props.toggle ? "none" : "flex"};
    width : 100%;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`
const StModalWrap = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    /* 모달창 크기 */
    width: 600px;
    height: 800px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    /* 모달창 디자인 */
    background-color: gray;
    border: 1px solid black;
    border-radius: 8px;
     
  /* 모달창 내부 X버튼 */
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`
