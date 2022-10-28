import React from "react"
import styled, { css } from "styled-components"

const Input = (props) => {
    return (
        <StInput {...props} disabled={props.disabled}>
            {props.children}
        </StInput>
    )
}

export default Input

const StInput = styled.input`
  padding: 5px 20px;
  margin: 5px 5px;
  width: 240px;
  height: 40px !important;
  font-weight: 400;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.4;
  border: 0;
  color: #141414;
  border-radius: 10px;
  box-shadow: 0px 2px 10px #e1cccd;
  background-color: #fff;
  ${({ size }) => {
        switch (size) {
            case "full":
                return css`
          width: 94%;
        `
            case "large":
                return css`
          width: 50%;
        `
            case "medium":
                return css`
          width: 200px;
          height: 40px !important;
        `
            case "short":
                return css`
          width: 120px;
          height: 40px !important;
          color: #121212;
        `
            default:
                return css`
          width: 240px;
          height: 40px !important;
        `
        }
    }}
  ${({ color }) => {
        switch (color) {
            case "line":
                return css`
          background-color: white;
          border: 1px solid #fd5c63;
        `
            case "gray":
                return css`
          background-color: #f7f2f4;
        `
            default:
                return css`
          color: #141414;
          background-color: #fff;
        `
        }
    }}
`