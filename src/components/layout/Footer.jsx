import React from 'react'
import styled from 'styled-components'
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <StFootContainer>
      <StMake>
        HANG-HAE 99 Week7 - TEAM 4 / Copyright 2022 All rights reserved
      </StMake>
      <StGitWrap>
        <div className='item'>
          <StGitBtn onClick={() => window.open('https://github.com/BLAKE198492/MelonMarket_CloneCoading', '_blank')} ><IoLogoGithub className="head-ico" /></StGitBtn>
          FRONT
        </div>
        <div className='item'>
          <StGitBtn onClick={() => window.open('https://github.com/Younddo/melonmarket_team4', '_blank')} ><IoLogoGithub className="head-ico" /></StGitBtn>
          BACK
        </div>
      </StGitWrap>
    </StFootContainer>
  )
}

export default Footer

const StFootContainer = styled.section`
 width : 100%;
  display: flex;
  flex-direction : row;
  margin : 0 auto;
  align-items : center;
  justify-content : space-around;
  background-color: #eab45d;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0px -2px 10px #c6c6c6;
  @media screen and (max-width: 900px) {
        font-size: 0.6rem;
    }
`
const StMake = styled.div`
  margin-left : 5px;
`

const StGitWrap = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  gap : 15px;
  .item{
    padding : 10px;
  }
`

const StGitBtn = styled.div`
margin : 0 auto;
font-size: 0.9rem;
width: 60px;
height: 40px;
color: #00251a;
border: 0;
cursor: pointer;
font-weight: 600;
background-color: transparent;
justify-content: center;

.head-ico {
  font-size: 1.6rem;
  margin: 5px;
  color: white;
  background-color: transparent;
}
`
