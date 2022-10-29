import React from 'react';
import styled from "styled-components";
import Header from './Header';
import Footer from './Footer';

import { useSelector } from "react-redux";
import LoginModal from "../common/LoginModal";

const Layout = (props) => {
    //모달 상태값으로 띄우기 위해
    const { modal } = useSelector(state => state.membersSlice);

    return (
        <>
            <StLayoutDiv>
                {/* 로그인 모달 */}
                {modal && <LoginModal />}
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