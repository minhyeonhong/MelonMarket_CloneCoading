import React from 'react';
import styled from "styled-components";
import axios from "axios"; // axios import 합니다.
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { __getContent } from "../../redux/modules/contentsSlice"



const List = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contents = useSelector((state) => state.contentsSlice.contents);
    // const contents = useSelector((state) => state.contents.contents);


    useEffect(() => {
        dispatch(__getContent());
    }, []);

    const moveToDetailPage = (id) => {
        navigate(`/detail/${id}`)
    }

    return (
        <StHomeHotContent>
            <StHomeMainTitle>중고거래 인기매물</StHomeMainTitle>
            <StCardsWrap>
                {
                    contents !== undefined &&
                    (
                        <>
                            {
                                contents.map((item) => {
                                    return (
                                        <StCardTop key={item.postId}>
                                            <StEachCard>
                                                <StCardPhoto
                                                    onClick={() => {
                                                        moveToDetailPage(item.postId)
                                                    }}
                                                    src=
                                                    {item.images.length > 0 ?
                                                        item.images[0].image : ""} />

                                                {/* <StCardPhoto src={item.images[0].image} /> */}
                                            </StEachCard>
                                            <StCardDesc>
                                                <StCardTitle>{item.title}</StCardTitle>
                                                <StCardPrice>{item.price}원</StCardPrice>
                                                <StCardRegion>{item.place}</StCardRegion>
                                            </StCardDesc>
                                        </StCardTop>
                                    )
                                })
                            }
                        </>
                    )
                }
            </StCardsWrap>
        </StHomeHotContent>
    );
};

const StHomeHotContent = styled.div`
    width: 1024px;
    margin: 6rem auto 12rem auto;
    /* border: 3px solid yellow; */

`;

const StHomeMainTitle = styled.h1`
font-size: 80px;
    margin-bottom: 8rem;
    text-align: center;
    /* border: 3px solid black; */

`;

const StCardsWrap = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    /* border: 3px solid green; */
`;

const StCardTop = styled.article`
    width: calc(25% - 44px);
    margin-right: 44px;
    margin-bottom: 56px;
    /* border: 3px solid blue; */
`;
const StEachCard = styled.a`
text-decoration: none;
    color: #212529;
    /* border: 3px solid red; */
`;
const StCardPhoto = styled.img`
width: 220px;
height: 220px;
border-radius: 10px;
//여기에 사진 들어감
`;
const StCardDesc = styled.div`
//이거 사진 설명 컨테이너
margin-top: 12px;
`;

const StCardTitle = styled.h2`
//이거 사진 제목
font-size: 16px;
    letter-spacing: -0.02px;
    color: #212529;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    line-height: 1.5;
    font-weight: normal;
`;

const StCardPrice = styled.div`
//이거 사진 가격
    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 4px;
`;
const StCardRegion = styled.div`
////이거 사진 지역
    font-size: 13px;
    color: #212529;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    line-height: 1.5;
`;


export default List;