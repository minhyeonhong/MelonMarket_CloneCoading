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
                <Header />

                <StBannerContainer>
                    <div>
                        <StBodyTitle>
                            당신 근처의
                            <br></br>
                            멜론마켓
                        </StBodyTitle>
                        <StBodyText>
                            중고 거래부터 동네 정보까지 이웃과 함께해요.
                            <br></br>
                            가깝고 따듯한 당신의 근처를 만들어요.
                        </StBodyText>
                    </div>

                    <StBodyPic />
                </StBannerContainer>

                <StBannerContainer style={{ backgroundColor: 'White' }}>
                    <StBodyPic2 />
                    <div>
                        <StBodyTitle>
                            우리 동네
                            <br></br>
                            중고 직거래 마켓
                        </StBodyTitle>
                        <StBodyText>
                            동네 주민들과 가깝고 따뜻한 거래를 지금 경험해 보세요
                        </StBodyText>
                    </div>

                </StBannerContainer>

                {/* 로그인 모달 */}
                {loginModal && <LoginModal />}
                {/* 글작성 모달 */}
                {cntWriteModal && <CntWriteModal />}
                {props.children}
                <Footer />

            </StLayoutDiv>

        </>
    );
};

export default Layout;

const StBannerContainer = styled.div`
    width: 1920px;
    height: 760px;
    margin: 0 auto;
    padding: 0 200px;
    position: relative;
    background-color: #FBF7F2;
    display: flex;
`;

const StBodyPic = styled.section`
height: 800px;
width: 1024px;
background-image: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp) ;
background-size: cover;
`;

const StBodyPic2 = styled.section`
height: 800px;
width: 850px;
background-image: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp) ;
background-size: contain;
background-repeat: no-repeat;
`;

const StBodyText = styled.p`
/* margin-left: 200px; */
font-size: 1.6rem !important;
    line-height: 1.5;
    letter-spacing: -0.3px;
    display: flex;
    margin-right: 100px;
`;

const StBodyTitle = styled.h1`
/* margin-left: 200px; */
margin-top: 200px;
    font-size: 3.8rem;
    line-height: 1.3;
    /* padding-top: 27rem;
    margin-bottom: 3.2rem; */
    letter-spacing: -0.4px;
`;

const StLayoutDiv = styled.div`    
  /* max-width: 1200px;
  min-width: 800px;
  margin: 0 auto; */
  width: 100%;
    display:flex;
    align-items : center;
    flex-direction : column;

`;