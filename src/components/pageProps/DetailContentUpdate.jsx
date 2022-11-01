import React, { useState } from 'react';

import { getCookie } from '../../cookie/cookie';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getContentDetail, __deleteContent, __editContent } from "../../redux/modules/contentsSlice"

import styled from "styled-components";
import useInput from "../../hooks/useInput";

const DetailContentUpdate = ({ content }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();

    //삭제 기능
    const deleteHandler = (id) => {
        dispatch(__deleteContent(id))
    }

    const [edit, setEdit] = useState(false);
    //수정 기능
    const editHandler = () => {
        setEdit(true);
        console.log(edit)
        // dispatch(__editContent(id))
    }


    const [upInput, setUpInput, upInputHandle] = useInput({
        title: content.title,
        content: content.content,
        price: content.price,
        place: content.place
    });

    const contentUpdate = () => {
        console.log("upInput", upInput);
    }
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
                            선택 기본으로 원래꺼 선택돼 있음
                            <div style={{ fontSize: "15px" }}>
                                <select name="place" onChange={upInputHandle}>
                                    <option value="서울" selected={content.place === "서울" && "selected"}>서울</option>
                                    <option value="강원도" selected={content.place === "강원도" && "selected"}>강원도</option>
                                    <option value="경기도" selected={content.place === "경기도" && "selected"}>경기도</option>
                                    <option value="충청도" selected={content.place === "충청도" && "selected"}>충청도</option>
                                    <option value="전라도" selected={content.place === "전라도" && "selected"}>전라도</option>
                                    <option value="경상도" selected={content.place === "경상도" && "selected"}>경상도</option>
                                    <option value="제주도" selected={content.place === "제주도" && "selected"}>제주도</option>
                                </select>
                            </div>
                            <div style={{ fontSize: "10px", marginRight: "10px" }}>{content.createdAt}</div>
                        </StAuthorLeft>

                        <StAuthorRight>매너온도</StAuthorRight>
                    </StAuthorDivide>
                </StAuthorWrap>
            </StAuthorContainer>
            <StContentContainer>
                <StContentTitle>
                    타이틀<input type='text' name='title' value={upInput.title || ""} onChange={upInputHandle} />
                </StContentTitle>
                <StContentPrice>금액 : <input type='text' name='price' value={upInput.price || ""} onChange={upInputHandle} />원</StContentPrice>
                <StContentInfo>
                    내용<textarea type='text' name='content' value={upInput.content || ""} onChange={upInputHandle} />
                </StContentInfo>
                {
                    getCookie("nickname") === content.accountName &&
                    <div>
                        <StModifyButton onClick={() => { window.location.replace(`/detail/${id}`) }}>이전으로</StModifyButton>
                        <StModifyButton style={{ backgroundColor: "green" }} onClick={contentUpdate}>수정하기</StModifyButton>
                    </div>
                }

            </StContentContainer>

        </div>
    );
};

export default DetailContentUpdate;

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