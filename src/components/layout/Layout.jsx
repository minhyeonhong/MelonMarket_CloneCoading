import React from 'react';
import styled from "styled-components";
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <>
            <StLayoutDiv>
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