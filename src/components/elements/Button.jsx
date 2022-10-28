import React from "react";
import styled, { css } from "styled-components";

const Button = (props) => {
  return (
    <StButton {...props} disabled={props.disabled}>
      {props.children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  padding: 10px;
  margin: 5px 5px;
  align-self: center;
  width: 240px;
  height: 40px !important;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4;
  border: 0;
  color: ${(props) => props.bgColor};
  border-radius: 0px;
  box-shadow: 0px 2px 10px #5688b9;
  background-color: white;
  cursor: pointer;
  /* &:hover {
    background-color: #4267b2;
    border: 0;
    color: white;
  } */
  ${({ size }) => {
    switch (size) {
      case "full":
        return css`
          width: 100%;
        `;
      case "large":
        return css`
          width: 50%;
        `;
      case "medium":
        return css`
          width: 200px;
          height: 40px !important;
          padding; 5px;
        `;
      case "short":
        return css`
          width: 120px;
          height: 40px !important;
          padding: 5px;
        `;
      case "small":
        return css`
          width: 30px;
          height: 30px !important;
          padding: 6px;
          border: 0;
          box-shadow: 0px 2px 10px #e1cccd;
        `;
      case "percent":
        return css`
          width: 30%;
          height: 50px !important;
          padding: 6px;
          margin: 0;
          margin-left: 20px
          border: 0;
          box-shadow: 0px 2px 10px #e1cccd;
          @media screen and (max-width: 1080px) {
            width: 40%;
            margin-right: 0;
          }
        `;
      case "round":
        return css`
          width: 60px;
          height: 60px !important;
          background-color: ${(props) => props.bgColor}; !important;
          color: white !important;
          line-height: 1.6;
          font-size: 30px;
          font-weight: 700;
          padding: 10px;
          border-radius: 50px;
          margin: 0 10px 0 0;
          border: 0;
          box-shadow: 0px 2px 10px #e1cccd;
          /* :hover {
            background-color: white !important;
            color: #4267B2 !important;
          } */
        `;
      default:
        return css`
          width: 240px;
          height: 40px !important;
          padding: 10px;
        `;
    }
  }}
  ${({ color }) => {
    switch (color) {
      case "reverse":
        return css`
          color: white;
          background-color: #4267b2;
          /* :hover {
            background-color: white;
            border: 0;
            color: #4267b2;
          } */
        `;
      case "line":
        return css`
          background-color: white;
          border: 1px solid #4267b2;
        `;
      case "tag-b":
        return css`
          background-color: white;
          border: 1px solid #121212;
          color: #121212;
          cursor: default;
          width: 40px;
          font-size: 13px;
          font-weight: 400;
          padding: 3px;
          line-height: 0;
          height: 20px !important;
          border-radius: 0px;
          margin: 0 3px;
          box-shadow: none;
          /* :hover {
            background-color: white;
            color: #121212;
            border: 1px solid #121212;
          } */
        `;
      case "tag-red":
        return css`
          background-color: white;
          border: 1px solid #4267b2;
          cursor: default;
          width: 40px;
          font-size: 13px;
          font-weight: 400;
          padding: 3px;
          line-height: 0;
          height: 20px !important;
          border-radius: 0px;
          margin: 0 3px;
          box-shadow: none;
          /* :hover {
            background-color: white;
            color: #4267b2;
            border: 1px solid #4267b2;
          } */
        `;
      case "cmt-b":
        return css`
          background-color: white;
          border: 1px solid #121212;
          color: #121212;
          cursor: pointer;
          width: 100%;
          font-size: 11px;
          font-weight: 400;
          padding: 3px;
          line-height: 0;
          height: 20px !important;
          border-radius: 0px;
          margin: 0 3px;
          box-shadow: none;
          /* :hover {
            background-color: #333;
            color: white;
            border: 1px solid #333;
          } */
        `;
      case "cmt-red":
        return css`
          background-color: white;
          border: 1px solid #4267b2;
          cursor: pointer;
          width: 100%;
          font-size: 11px;
          font-weight: 400;
          padding: 3px;
          line-height: 0;
          height: 20px !important;
          border-radius: 0px;
          margin: 0 3px;
          box-shadow: none;
          /* :hover {
            background-color: #4267b2;
            color: #white;
            border: 1px solid #4267b2;
          } */
        `;
      default:
        return css`
          color: #4267b2;
          background-color: white;
          /* &:hover {
            background-color: #4267b2;
            border: 0;
            color: white;
          } */
        `;
    }
  }}
`;
