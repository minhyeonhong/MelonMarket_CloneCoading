import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout';
import styled from "styled-components";
import { __mypage } from "../redux/modules/contentsSlice"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import profile2 from "../assets/핫.jpeg"

const Mypage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mypage } = useSelector((state) => state.contentsSlice);

    useEffect(() => {
        dispatch(__mypage());
    }, [dispatch])

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
                        <StProfilePhoto src={profile2} style={{ textAlign: "center" }}>
                        </StProfilePhoto  >
                        <h2 style={{ marginTop: "140px", color: "#FA6615", margin: "auto" }}>{mypage !== undefined && mypage.accountName}의 상점</h2>
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
                                                <img style={{ width: "220px", height: "220px" }} src={val.images.length < 1 ? process.env.PUBLIC_URL + "/img/noimg.jpg" : val.images[0].image} />
                                            </div>
                                            <div>
                                                <div><strong>상품제목:</strong>{val.title}</div>
                                                <div><strong>가격:</strong>{val.price}원</div>
                                            </div>
                                            <div>
                                                <strong>위치:</strong>{val.place}<br />
                                                <strong style={{ color: "green" }}>{val.modifiedAt}</strong>
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
    height: 100%;
`;
const StWrap = styled.div`
width: 1024px;
    margin-top: 30px;
    
`;
const StProfileContainer = styled.div`
        display: flex;
    width: 100%;
    border: 1px solid rgb(238, 238, 238);
`;
const StProfilePhoto = styled.img`
    flex-shrink: 0;
    width: 310px;
    height: 310px;
    /* position: relative; */
    color: black;
    border: 1px solid rgb(238, 238, 238);
    text-align: center;
`;
const StProfileText = styled.div`
    flex: 1 0 0%;
    padding: 0px 30px;
    border-top: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    height: 400px;
    flex-direction: column;
    /* border: 3px solid blue; */
`;

const StToggleMenus = styled.div`
    display: flex;
    height: 50px;
    border: 1px solid rgb(238, 238, 238);
`;
const StToggleMenu = styled.a`
    flex: 1 1 0%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    border-top: 1px solid rgb(255, 255, 255);
    /* border-right: 1px solid rgb(33, 33, 33); */
    border-bottom: 1px solid rgb(33, 33, 33);
    background: rgb(255, 255, 255);
    border: 1px solid rgb(255, 255, 255);
    font-weight: 600;
`;

const StEachContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StEachContent = styled.div`
    padding: 30px;
    width: 220px;
    margin-left:0px;
    height: 330px;

    margin-right: 11px;
    margin-bottom: 11px;
    margin: auto;
    /* border: 3px solid pink; */
    
    `;

export default Mypage