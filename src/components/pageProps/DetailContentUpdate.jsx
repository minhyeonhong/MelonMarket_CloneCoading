import React, { useState, useRef, useEffect } from 'react';

import { getCookie } from '../../cookie/cookie';
import { useDispatch } from "react-redux";
import { __updataContent } from "../../redux/modules/contentsSlice"
import Button from '../elements/Button';

import styled from "styled-components";
import useInput from "../../hooks/useInput";

import { BsFillCameraFill } from "react-icons/bs"

import useImgUpload from "../../hooks/useImgUpload";

const DetailContentUpdate = ({ content, paramId }) => {
    const dispatch = useDispatch();
    //이미지 업로드 인풋돔 선택 훅
    const imgRef = useRef();
    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.3, 1000);

    //수정 내용
    const [upInput, setUpInput, upInputHandle] = useInput({
        title: content.title,
        content: content.content,
        price: content.price,
        place: content.place
    });
    //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);

    //submit
    const updateSubmit = () => {
        //request로 날릴 폼데이터
        const formData = new FormData();

        //폼 데이터에 파일 담기
        if (files.length > 0) {
            files.forEach((file) => {
                formData.append("images", file);
            })
        } else {
            formData.append("images", null);
        }


        if (upInput.title === "") {
            alert("제목 써줘")
            return
        }
        if (upInput.content === "") {
            alert("내용 써줘")
            return
        }
        if (upInput.price === "") {
            alert("가격 써줘")
            return
        }

        //폼 데이터에 글작성 데이터 넣기
        formData.append("post", JSON.stringify(upInput));

        formData.append("imageId", delImg);


        const obj = {
            id: paramId,
            contentInfo: formData
        }
        //Api 날리기
        dispatch(__updataContent(obj));
    }

    const delPreview = (imgId) => {
        //삭제할 이미지 번호 담기
        setDelImg((e) => [...e, imgId]);

    }

    return (
        <div>
            <StPhotoContainer>
                <StImgsWrap>
                    <label htmlFor="imgFile">
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            id="imgFile"
                            name="imgFile"
                            multiple
                            onChange={uploadHandle}
                            ref={imgRef}
                        />
                        <StImgUploadBtn type='button' onClick={() => { imgRef.current.click() }}><BsFillCameraFill style={{ width: "100px", height: "100px" }} /></StImgUploadBtn>
                    </label>
                    <StContentPreviewsWrap>
                        {//기존 이미지 뿌려줄
                            content.images !== undefined &&
                            content.images.map((item) => {
                                return (
                                    <StContentPreviews key={item.imageId} isView={delImg.indexOf(item.imageId) > -1 ? "none" : "block"}>
                                        <StPhoto src={item.image} />
                                        <Button style={{ width: "100px", marginLeft: "20px", borderRadius: "10px" }} onClick={() => { delPreview(item.imageId); }}>삭제</Button>
                                    </StContentPreviews>
                                )
                            })
                        }
                    </StContentPreviewsWrap>
                    <div className="preview">
                        {/*previews map쓸곳*/
                            fileUrls.map((val, i) => {
                                return (
                                    <StPreviewImg src={val} alt="game image" key={i} />
                                )
                            })
                        }
                    </div>
                </StImgsWrap>

            </StPhotoContainer>
            <StAuthorContainer>
                <StAuthorWrap>
                    <StAuthorProfile></StAuthorProfile>
                    <StAuthorDivide>
                        <StAuthorLeft>
                            <strong>{content.accountName}</strong>

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

                        <StAuthorRight><strong>매너온도</strong></StAuthorRight>
                    </StAuthorDivide>
                </StAuthorWrap>
            </StAuthorContainer>
            <StContentContainer>
                <StContentTitle>
                    제목 : <input style={{ width: "300px", marginTop: "18px", border: "1px solid orange", borderRadius: "15px", textAlign: "center" }} type='text' name='title' value={upInput.title || ""} placeholder="변경하실 제목을 입력하세요" onChange={upInputHandle} />
                </StContentTitle>
                <StContentPrice>금액 : <input style={{ width: "300px", marginTop: "18px", border: "1px solid orange", borderRadius: "15px", textAlign: "center" }} type='text' placeholder="변경하실 금액을 입력하세요" name='price' value={upInput.price || ""} onChange={upInputHandle} /></StContentPrice>
                <StContentInfo style={{ display: "flex" }}>
                    <div style={{ textAlign: "center", marginTop: "18px" }}>
                        <strong style={{ marginRight: "10px", marginBottom: "15px" }}>
                            내용 :
                        </strong>
                    </div>
                    <textarea style={{ width: "300px", border: "1px solid orange", borderRadius: "15px", marginTop: "10px", textAlign: "center" }} placeholder="변경하실 내용을 입력하세요" type='text' name='content' value={upInput.content || ""} onChange={upInputHandle} />
                </StContentInfo>
                {
                    getCookie("nickname") === content.accountName &&
                    <div>
                        <StModifyButton style={{ color: "red" }} onClick={() => { window.location.replace(`/detail/${paramId}`) }}>이전으로</StModifyButton>
                        <StModifyButton style={{ backgroundColor: "#5af45a", marginLeft: "20px", color: "white" }} onClick={updateSubmit}>수정하기</StModifyButton>
                    </div>
                }

            </StContentContainer>

        </div>
    );
};

export default DetailContentUpdate;

const StContentPreviewsWrap = styled.div`
    display:flex;
    flex-direction:row;
    gap : 5px;
`

const StContentPreviews = styled.div`
    display : ${(props) => props.isView};
`

const StImgUploadBtn = styled.button`
  border : none;
`

const StImgsWrap = styled.div`
  width : 100%;
  display :flex;
  flex-direction : column;
  justify-content: center;
  align-items : center;
  .preview {
    text-align : center;
    display :flex;
    flex-direction : row;
    align-items : center;
    gap : 10px;
  }
`
const StPreviewImg = styled.img`
  width : 220px;
  height :220px;
  border-radius : 1rem;
`

const StModifyButton = styled.button`
font-weight: 700;
width: 100px;
height: 50px;
border-radius: 5px;
border: 0.5px solid gray;
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
    border-radius : 1rem;

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
    height: 630px;
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