import React from 'react'
import Header from '../components/layout/Header'
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/common/Comment"
import Layout from '../components/layout/Layout';
import { __getContentDetail } from "../redux/modules/contentsSlice"

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { content, comments } = useSelector((state) => state.contentsSlice);


    useEffect(() => {
        dispatch(__getContentDetail(id));
    }, []);

    useEffect(() => {
        console.log(comments);
    }, [content]);


    return (

        <div>
            <Header></Header>

            <div>
                <StPhotoContainer>
                    {
                        content.images !== undefined &&
                        content.images.map((item) => {
                            return (
                                <StPhoto src=
                                    {item.image}></StPhoto>
                            )
                        })
                    }
                    {/* <StPhoto src=
                        {content.images.length > 0 ?
                            content.images[0].image : ""}></StPhoto> */}
                </StPhotoContainer>
                <StAuthorContainer>
                    <StAuthorWrap>
                        <StAuthorProfile></StAuthorProfile>
                        <StAuthorDivide>
                            <StAuthorLeft>
                                <strong>{content.accoountName}</strong>
                                <div style={{ fontSize: "15px" }}>{content.place}</div>
                                <div style={{ fontSize: "10px" }}>{content.createdAt}</div>
                            </StAuthorLeft>

                            <StAuthorRight>매너온도</StAuthorRight>
                        </StAuthorDivide>
                    </StAuthorWrap>
                </StAuthorContainer>
                <StContentContainer>
                    <StContentTitle>{content.title}</StContentTitle>
                    <StContentPrice>금액 : {content.price}원</StContentPrice>
                    <StContentInfo>{content.content}</StContentInfo>

                </StContentContainer>
                {/* 댓글 컴포넌츠 호출 */}
                <Comment reply={comments}></Comment>
            </div>
            {/* <StPhotoContainer>
                    <StPhoto>포토 들어갈 자리</StPhoto>
                </StPhotoContainer>
                <StAuthorContainer>
                    <StAuthorWrap>
                        <StAuthorProfile></StAuthorProfile>
                        <StAuthorDivide>
                            <StAuthorLeft>작성자 프로필 사진용</StAuthorLeft>
                            <StAuthorRight>매너온도</StAuthorRight>
                        </StAuthorDivide>
                    </StAuthorWrap>
                </StAuthorContainer>
                <StContentContainer>
                    <StContentTitle>판매 제품 제목올라가는 자리</StContentTitle>
                    <StContentPrice>가격임</StContentPrice>
                    <StContentInfo>내용들어감</StContentInfo>
                </StContentContainer> */}
        </div >
    )
}


const StPhotoContainer = styled.section`
    position: relative;
    height: 500px;
    width: 729px;
    margin: 0 auto;
    /* border: 3px solid black; */
`;

const StPhoto = styled.img`
    margin: auto;
    text-align: center;
    /* left: -9999px;
    top: -9999px; */
    /* border: 3px solid red; */
`;
const StAuthorContainer = styled.section`
    width: 677px;
    margin: 0 auto;
    border-bottom: 1px solid #E9ECEF;
    /* border: 3px solid blue; */
`;
const StAuthorWrap = styled.a`
    text-decoration: none;
    display: block;
    margin-top: 25px;
    padding-bottom: 23px;
    position: relative;
    border-bottom: 1px solid #e9ecef;
    /* border: 3px solid green; */
`;

const StAuthorProfile = styled.h3`
position: absolute;
    left: -9999px;
    top: -9999px;
    /* border: 3px solid pink; */
`;
const StAuthorDivide = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 3px solid orange; */
`;
const StAuthorRight = styled.div`
position: absolute;
    right: 0;
    padding-right: 36px;
    /* border: 3px solid red; */
`;
const StAuthorLeft = styled.div`
    display: inline-block;
    margin-left: 8px;
    /* border: 3px solid red; */

`;

const StContentContainer = styled.section`
padding: 32px 0;
    width: 677px;
    margin: 0 auto;
    border-bottom: 1px solid #E9ECEF;
    /* border: 3px solid crimson; */

`;
const StContentTitle = styled.h1`
margin-top: 16px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -0.6px;
    /* border: 3px solid beige; */
`;

const StContentPrice = styled.p`
font-size: 18px;
    font-weight: bold;
    /* border: 3px solid orange; */
`;

const StContentInfo = styled.p`
font-size: 17px;
    line-height: 1.6;
    letter-spacing: -0.6px;
    margin: 16px 0;
    word-break: break-all;
`;

export default Detail