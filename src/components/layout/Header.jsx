import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

function Header() {
    const navigate = useNavigate();

    return (
        <HeadContainer>
            <StHomeBtn onClick={() => { navigate("/List") }}>
                <IoMdHome className="head-ico" />
                <div>Find game friends</div>
            </StHomeBtn>
            <StNavWrap>
                {
                    localStorage.getItem("token") === null ?
                        <StNavItem onClick={() => { navigate("/") }}>Login</StNavItem>

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

const HeadContainer = styled.section`
  display: flex;
  flex-direction : row;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  background-color: #2c5cc5;
  color: #fff;
  position:sticky;
  top : 0;
  box-shadow: 0px 2px 10px #9dabca;
  z-index: 1;
`
const StHomeBtn = styled.a`
    width: 148px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
.head-ico {
font-size: 1.6rem;
margin: 5px;
color: white;
height: 40px;
}
&:hover {
color: white;
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
    background-color: #2c5cc5;
    color: #fff;
    &:hover{
        background-color: #fff;
        color: #2c5cc5;
    }
`