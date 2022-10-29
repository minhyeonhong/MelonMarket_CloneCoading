import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { modalTogle, __join, __login } from "../../redux/modules/membersSlice";

import Input from "../elements/Input";
import Button from "../elements/Button";
import useInput from "../../hooks/useInput";

const LoginModal = () => {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.membersSlice);
  const closeModal = () => {
    dispatch(modalTogle(!modal));
  };

  const [join, setJoin, joinHandle] = useInput({
    email: "",
    accountPw: "",
    accountPwConfirm: "",
    accountName: "",
    phoneNum: "",
  });

  const [login, setLogin, loginHandle] = useInput({
    email: "",
    accountPw: "",
  });


  //회원가입 버튼 딸깍
  const signUpHandle = () => {
    const obj = {
      email: join.email,
      accountPw: join.accountPw,
      accountPwConfirm: join.accountPwConfirm,
      accountName: join.accountName,
      phoneNum: join.phoneNum,
    };

    dispatch(__join(obj));
  };

  const [duplicateCheck, setDuplicateCheck] = useState({

  });

  //이메일 중복검사
  const EmailHandler = (event) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return emailRegex.test(event);
  };

  //비밀번호 형식검사
  const PasswordHandler = (event) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return passwordRegex.test(event);
  }


  //로그인 버튼 딸깍
  const signHandle = () => {
    const obj = {
      email: login.email,
      accountPw: login.accountPw,
    };

    dispatch(__login(obj));
  };

  const [toggle, setToggle] = useState(true);
  const toggleBtnHandle = () => {
    setToggle(!toggle);
  };

  return (
    <StModalBackground>
      <StModalWrap>
        <button onClick={closeModal} className='close'>
          닫기
        </button>
        <StTitle>Melon Market</StTitle>

        <StLoginWrap toggle={toggle}>
          <Input
            size='large'
            onChange={loginHandle}
            name='email'
            value={login.email || ""}
            type='email'
            placeholder='아이디'
          />
          <Input
            size='large'
            onChange={loginHandle}
            name='accountPw'
            value={login.accountPw || ""}
            type='password'
            placeholder='비밀번호'
          />
          <Button style={{ marginTop: "20px" }} onClick={signHandle}>
            로그인
          </Button>
        </StLoginWrap>
        <StJoinWrap toggle={toggle}>
          <Input
            size='large'
            onChange={joinHandle}
            name='email'
            value={join.email || ""}
            type='email'
            placeholder='아이디를 입력하여 주십시오'
          />
          <Valitext textColor={"#f96854"}>{!EmailHandler(join.email) ? 'Email 형식이 아니에요' : ""}</Valitext>
          <Valitext textColor={"#22B14C"}>{EmailHandler(join.email) ? 'Email 형식이에요' : ""}</Valitext>
          <Input
            size='large'
            onChange={joinHandle}
            style={{ marginTop: "20px" }}
            name='accountPw'
            value={join.accountPw || ""}
            type='password'
            placeholder='비밀번호를 영문 숫자 특수문자 조합으로 8자이상으로 입력'
          />
          <Valitext textColor={"#f96854"}>{!PasswordHandler(join.accountPw) && join.accountPw !== "" ? '비밀번호 형식을 맞춰주세요' : ""}</Valitext>
          <Input
            size='large'
            style={{ marginTop: "20px" }}
            onChange={joinHandle}
            name='accountPwConfirm'
            value={join.accountPwConfirm || ""}
            type='password'
            placeholder='비밀번호를 다시한 번 입력하여 주십시오'
          />
          <Input
            size='large'
            onChange={joinHandle}
            style={{ marginTop: "20px" }}
            name='accountName'
            value={join.accountName || ""}
            type='text'
            placeholder='닉네임을 입력하여 주십시오'
          />
          <Input
            size='large'
            onChange={joinHandle}
            style={{ marginTop: "20px" }}
            name='phoneNum'
            value={join.phoneNum || ""}
            type='text'
            placeholder='연락처를 입력하여 주십시오'
          />
          <Button style={{ marginTop: "20px" }} onClick={signUpHandle}>
            가입요청
          </Button>
        </StJoinWrap>

        <Button
          style={{ marginTop: "10px" }}
          color='reverse'
          onClick={toggleBtnHandle}
        >
          {toggle ? "가입하기" : "로그인하기"}
        </Button>
      </StModalWrap>
    </StModalBackground>
  );
};

export default LoginModal;

const Valitext = styled.div`
width: 100%;
margin-left: 10px;
padding: 0px;
font-size: 0.7rem;
color: ${props => props.textColor};
`

const StModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
`;

const StTitle = styled.p`
  background: linear-gradient(to right, #ffa7a3, #5673bd);
  padding: 0.43em 1em;
  font-size: 19px;
  border-radius: 3px;
  color: #ffffff;
  width: 200px;
  height: 50px;
  font-size: 32px;
  margin-bottom: 30px;
  border-radius: 20px;
`;

const StLoginWrap = styled.div`
  display: ${(props) => (props.toggle ? "flex" : "none")};
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
`;
const StJoinWrap = styled.div`
  display: ${(props) => (props.toggle ? "none" : "flex")};
  width: 100%;
  text-align : center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 내부 X버튼 */
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #ff5f2e;
    color: #e1eef6;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
  }
`;
