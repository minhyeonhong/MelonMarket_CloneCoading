import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import melonlogo from "../../assets/melonlogo.png"
import { useSelector, useDispatch } from "react-redux";
import { modalTogle, __login, __join } from "../../redux/modules/membersSlice"

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { modal } = useSelector(state => state.membersSlice);
    //모달 상태값을 바꾸기 위해
    const modalToggle = () => {
        dispatch(modalTogle(!modal));
    }

    return (


        <HeadContainer>
            <StHomeBtn onClick={() => { navigate("/") }}>
                {/* <IoMdHome className="head-ico" /> */}
                {/* <IoMdHome /> */}
                <img src={melonlogo}></img>
                <div style={{ margin: "20px", fontSize: "30px" }}>멜론 마켓</div>
            </StHomeBtn>
            <StNavWrap>
                {
                    localStorage.getItem("token") === null ?
                        <StNavItem onClick={() => { modalToggle() }}>Login</StNavItem>
                        :
                        <>
                            <StNavItem onClick={() => {
                                localStorage.clear();
                                navigate("/");
                            }
                            }>Logout</StNavItem>
                            <StNavItem onClick={() => { navigate("/MyList") }}>My List</StNavItem>
                            <StNavItem onClick={() => { navigate("/Write") }}>Write</StNavItem>
                        </>
                }
            </StNavWrap>
        </HeadContainer>
    );
}
export default Header;




const HeadContainer = styled.div`
  display: flex;
  flex-direction : row;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  background-color: white;
  color: orange;
  position:sticky;
  top : 0;
  box-shadow: 0px 2px 10px #9dabca;
  z-index: 1;
`
const StHomeBtn = styled.a`
    width: 300px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #51e241;
.head-ico {
font-size: 1.6rem;
margin: 5px;
color: #51e241;
height: 40px;
}
&:hover {
color: orange;
}
`

const StNavWrap = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: end;
    align-items : center;
    width: 80%;
    gap : 10px;
`

const StNavItem = styled.button`
    background-color : white;
    width : 100px;
    height: 80%;
    border-radius : 8px;
    border : none;//#fff solid 1px;
    background-color: #59ed49;
    color: #fff;
    &:hover{
        background-color: #a9e5a2;
        color: white;
    }
`