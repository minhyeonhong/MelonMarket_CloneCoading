import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { cntWriteModalTogle } from "../../redux/modules/contentsSlice";
import { __insertContent } from "../../redux/modules/contentsSlice";
import Input from "../elements/Input";
import Button from "../elements/Button";
import useInput from "../../hooks/useInput";
import useImgUpload from "../../hooks/useImgUpload";
import photoIMG from "../../assets/photoIMG.png"

import { BsFillCameraFill } from "react-icons/bs"


const CntWriteModal = () => {
  const dispatch = useDispatch();

  const { cntWriteModal } = useSelector((state) => state.contentsSlice);
  const closeModal = () => {
    dispatch(cntWriteModalTogle(!cntWriteModal));
  };


  const [write, setWrite, writeHandle] = useInput({
    title: "",
    content: "",
    price: "",
    place: "서울"
  });

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.3, 1000);

  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef();

  //submit
  const writeSubmit = () => {
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


    if (write.title === "") {
      alert("제목 써줘")
      return
    }
    if (write.content === "") {
      alert("내용 써줘")
      return
    }
    if (write.price === "") {
      alert("가격 써줘")
      return
    }

    //폼 데이터에 글작성 데이터 넣기
    formData.append("post", JSON.stringify(write));

    //Api 날리기
    dispatch(__insertContent(formData));
  }


  return (
    <StModalBackground>
      <StModalWrap>

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
            <StImgUploadBtn type='button' onClick={() => { imgRef.current.click() }}>
              <img src={photoIMG} style={{ width: "200px", marginTop: "10px" }}></img>
            </StImgUploadBtn>
          </label>
          <StImgExplain >* 상품 이미지는 640x640에 최적화 되어 있습니다.<br />
            - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여집니다.<br />
            - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.<br />
            - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.<br />
            - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.<br />
            - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br />
            최대 지원 사이즈인 640 X 640으로 리사이즈 해서 올려주세요.(개당 이미지 최대 10M)</StImgExplain>
          <StBorderBottomLine />
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

        <Input size='large' onChange={writeHandle} name='title' value={write.title || ""} type='text' placeholder='상품 제목을 입력하세요.' />
        <StBorderBottomLine />
        <StTextAreaInput onChange={writeHandle} name='content' value={write.content || ""} type='textarea' placeholder='
          여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등
          구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)
          안전하고 건전한 거래 환경을 위해 항해 9기 4조가 함께 합니다.'/>
        {/* <Input style={{ height: "200px" }} size='large' onChange={writeHandle} name='content' value={write.content || ""} type='textarea' placeholder='
          여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)
          안전하고 건전한 거래 환경을 위해 항해 9기 4조가 함께 합니다.'/> */}
        <StBorderBottomLine />

        <Input size='medium' style={{ marginTop: '20px' }} onChange={writeHandle} name='price' value={write.price || ""} type='number' placeholder='가격을 입력하세요' />
        <StBorderBottomLine />
        <div style={{ display: "flex", marginTop: "20px" }}>
          <strong style={{ margin: "auto", marginRight: "20px" }}>거래지역</strong>
          <select style={{ width: "100px", textAlign: "center", borderRadius: "10px" }} name="place" onChange={writeHandle}>
            <option value="서울">서울</option>
            <option value="강원도">강원도</option>
            <option value="경기도">경기도</option>
            <option value="충청도">충청도</option>
            <option value="전라도">전라도</option>
            <option value="경상도">경상도</option>
            <option value="제주도">제주도</option>
          </select>
        </div>
        <StBorderBottomLine />
        <Button style={{ marginTop: "20px", backgroundColor: "rgb(255, 80, 88)", textAlign: "center" }} onClick={writeSubmit}>글 작성</Button>

        <Button style={{ marginTop: "10px" }} onClick={closeModal}>닫기</Button>
      </StModalWrap>
    </StModalBackground>
  );
};

export default CntWriteModal;

const StTextAreaInput = styled.input`
  padding: 2px 20px;
  margin: 5px 5px;
  width: 650px;
  height: 200px !important;
  font-weight: 400;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.4;
  border: 0;
  color: #141414;
  border-radius: 10px;
  box-shadow: 0px 2px 10px #e1cccd;
  background-color: #fff;
`;

const StBorderBottomLine = styled.div`
    width: 53%;
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid rgb(220, 219, 228);
`;

const StImgExplain = styled.div`
    margin-top: 1.5rem;
    color: rgb(74, 164, 255);
    line-height: 1.5;
    font-size: 14px;
`;

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

const StModalBackground = styled.div`
  margin-top : 70px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
`;

const StModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 모달창 크기 */
  width: 1300px;
  height: 1100px;
  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 내부 X버튼 */
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #ff5f2e;
    color: #e1eef6;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
  }
`;
