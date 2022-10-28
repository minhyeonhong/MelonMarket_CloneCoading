import React, { useEffect } from 'react';
import styled from "styled-components";
import Header from './Header';
import Footer from './Footer';

import { useSelector } from "react-redux";
import LoginModal from "../common/LoginModal";

const Layout = (props) => {
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
    display:flex;
    align-items : center;
    flex-direction : column;

`;