import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { cntWriteModalTogle } from "../../redux/modules/contentsSlice";

import Input from "../elements/Input";
import Button from "../elements/Button";
import useInput from "../../hooks/useInput";


const CntWriteModal = () => {
    const dispatch = useDispatch();

    const { cntWriteModal } = useSelector((state) => state.contentsSlice);
    const closeModal = () => {
        dispatch(cntWriteModalTogle(!cntWriteModal));
    };
    //      form-data
    //      images : ~~~.jpg
    //      post : {
    //      "title" : "제목입니다",
    //      "content" : "내용입니다"
    //      ”price” : “10000”,
    //      ”place” : “제주”
    //      }

    const [write, setWrite, writeHandle] = useInput({
        title: "",
        content: "",
        price: "",
        place: ""
    });

    return (
        <StModalBackground>
            <StModalWrap>
                <Input size='large' onChange={writeHandle} name='title' value={write.title || ""} type='text' placeholder='제목' />
                <Input size='large' onChange={writeHandle} name='content' value={write.content || ""} type='text' placeholder='내용' />
                <Input size='large' onChange={writeHandle} name='price' value={write.price || ""} type='text' placeholder='가격' />
                <Input size='large' onChange={writeHandle} name='place' value={write.place || ""} type='text' placeholder='지역' />
                <Button onClick={closeModal}>닫기</Button>
            </StModalWrap>
        </StModalBackground>
    );
};

export default CntWriteModal;

const StModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
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