import React from 'react';
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { modalTogle } from "../../redux/modules/membersSlice"
import Input from '../elements/Input';

const LoginModal = () => {
    const dispatch = useDispatch();

    const { modal } = useSelector(state => state.membersSlice);

    const closeModal = () => {
        dispatch(modalTogle(!modal));
    }

    return (
        <StModalWrap>
            <button onClick={closeModal} className='close'>close</button>

            <Input size='large' placeholder="id" />
            <Input size='large' placeholder="pw" />
        </StModalWrap>
    );
};

export default LoginModal;

const StModalWrap = styled.div`
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
