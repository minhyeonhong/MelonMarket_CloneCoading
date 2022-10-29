import React from 'react';
import styled from "styled-components";
import Header from './Header';
import Footer from './Footer';

import { useSelector } from "react-redux";
import LoginModal from "../common/LoginModal";
import CntWriteModal from "../common/CntWriteModal";

const Layout = (props) => {
    //로그인 모달 상태값으로 띄우기 위해
    const { loginModal } = useSelector(state => state.membersSlice);
    //작성글 모달 상태값으로 띄우기 위해
    const { cntWriteModal } = useSelector(state => state.contentsSlice);

    return (
        <>
            <StLayoutDiv>
                {/* 로그인 모달 */}
                {loginModal && <LoginModal />}
                {/* 글작성 모달 */}
                {cntWriteModal && <CntWriteModal />}
                <Header />
                {props.children}
                <Footer />
            </StLayoutDiv>

        </>
    );
};

export default Layout;

const StLayoutDiv = styled.div`    
  /* max-width: 1200px;
  min-width: 800px;
  margin: 0 auto; */
    display:flex;
    align-items : center;
    flex-direction : column;

`;