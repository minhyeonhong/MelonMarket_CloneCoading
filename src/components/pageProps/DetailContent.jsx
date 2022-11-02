import React from 'react';

import { getCookie } from '../../cookie/cookie';
import Comment from "../../components/common/Comment"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getContentDetail, __deleteContent, __editContent } from "../../redux/modules/contentsSlice"

import styled from "styled-components";
const DetailContent = ({ content, comments, editHandler, paramId }) => {
    const dispatch = useDispatch();

    //삭제 기능
    const deleteHandler = (id) => {
        dispatch(__deleteContent(id))
    }

    console.log("content:", content)

    return (
        <div>
            <StPhotoContainer>
                {
                    content.images !== undefined &&
                    content.images.map((item) => {
                        return (
                            <StPhoto src={item.image} key={item.imageId} />
                        )
                    })
                }
            </StPhotoContainer>
            <StAuthorContainer>
                <StAuthorWrap>
                    <StAuthorProfile></StAuthorProfile>
                    <StAuthorDivide>
                        <StAuthorLeft>
                            <strong>{content.accountName}</strong>
                            <div style={{ fontSize: "15px" }}>{content.place}</div>
                            <div style={{ fontSize: "10px", marginRight: "10px" }}>{content.createdAt}</div>
                        </StAuthorLeft>

                        <StAuthorRight>매너온도</StAuthorRight>
                    </StAuthorDivide>
                </StAuthorWrap>
            </StAuthorContainer>
            <StContentContainer>
                <StContentTitle>{content.title}</StContentTitle>
                <StContentPrice>금액 : {content.price}원</StContentPrice>
                <StContentInfo>{content.content}</StContentInfo>
                {
                    getCookie("nickname") === content.accountName &&
                    <div>
                        <StModifyButton onClick={() => { deleteHandler(paramId) }}>삭제하기</StModifyButton>
                        <StModifyButton style={{ backgroundColor: "green" }} onClick={() => { editHandler() }}>수정하기</StModifyButton>
                    </div>
                }

            </StContentContainer>
            {/* 댓글 컴포넌츠 호출 */}
            {
                comments !== undefined &&
                <Comment reply={comments}></Comment>
            }

        </div>
    );
};

export default DetailContent;

const StModifyButton = styled.button`
border: 2px solid red;
font-weight: 700;
width: 100px;
height: 50px;
`;

const StPhotoContainer = styled.section`
    /* position: relative; */
    height: 500px;
    width: 729px;
    margin: 0 auto;
    /* border: 3px solid black; */
`;

const StPhoto = styled.img`
/* 크기조절 */
    width: 220px;
    height: 220px;
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