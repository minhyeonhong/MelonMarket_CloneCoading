import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout';
import styled from "styled-components";

import { __mypage, __getContentDetail } from "../redux/modules/contentsSlice"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mypage } = useSelector((state) => state.contentsSlice);

    useEffect(() => {
        dispatch(__mypage());
    }, [])

    useEffect(() => {
        console.log("useEffect mypage", mypage);
    }, [mypage])

    const [swap, setSwap] = useState(1);

    const toggleGoods = (num) => {
        setSwap(num);
    }

    const moveToDetailPage = (postId) => {
        navigate(`/detail/${postId}`)
    }

    return (
        <Layout>
            <StContainer>
                <StWrap>
                    <StProfileContainer>
                        <StProfilePhoto>
                            여기 내 프로필 사진 들어갈거임
                        </StProfilePhoto>
                        닉네임 : {mypage !== undefined && mypage.accountName}
                    </StProfileContainer>

                    <StToggleMenus>
                        <StToggleMenu onClick={() => toggleGoods(1)}>내 상품</StToggleMenu>
                        <StToggleMenu onClick={() => toggleGoods(2)}>찜 상품</StToggleMenu>
                    </StToggleMenus>
                    <StProfileText>
                        <StEachContainer>
                            {mypage !== undefined &&
                                swap === 1 &&
                                mypage.myPost.map((val) => {
                                    return (
                                        <StEachContent key={val.postId} onClick={() => moveToDetailPage(val.postId)}>
                                            <div>
                                                <img style={{ width: "22px0", height: "220px" }} src={val.images.length > 0 && val.images[0].image} />
                                            </div>
                                            <div>
                                                <div>title:{val.title}</div>
                                                <div>price:{val.price} | {val.modifiedAt} </div>
                                            </div>
                                            <div>
                                                place:{val.place}
                                            </div>
                                        </StEachContent>

                                    )
                                })

                            }
                            {mypage !== undefined &&
                                swap === 2 &&
                                <StEachContent> 찜상품 해야함</StEachContent>
                            }
                        </StEachContainer>

                    </StProfileText>
                </StWrap>

            </StContainer>
        </Layout>
    )
}

const StContainer = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    
`;
const StWrap = styled.div`
width: 1024px;
    margin-top: 30px;
    
`;
const StProfileContainer = styled.div`
        display: flex;
    width: 100%;
    border: 3px solid red;
`;
const StProfilePhoto = styled.div`
    flex-shrink: 0;
    width: 310px;
    height: 310px;
    /* position: relative; */
    color: black;
    border: 3px solid black;
`;
const StProfileText = styled.div`
    flex: 1 0 0%;
    padding: 0px 30px;
    border-top: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    height: 700px;
    flex-direction: column;
    border: 3px solid blue;
`;

const StToggleMenus = styled.div`
    display: flex;
    height: 50px;
    border: 5px solid green;
`;
const StToggleMenu = styled.a`
flex: 1 1 0%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    border-top: 1px solid rgb(33, 33, 33);
    border-right: 1px solid rgb(33, 33, 33);
    border-bottom: 1px solid rgb(255, 255, 255);
    background: rgb(255, 255, 255);
    color: rgb(33, 33, 33);
    font-weight: 600;
`;

const StEachContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StEachContent = styled.div`

width: 200px;
    margin-left:0px;
    height: 300px;
    margin-right: 11px;
    margin-bottom: 11px;
    margin: auto;
    border: 3px solid pink;
    `;

export default Mypage