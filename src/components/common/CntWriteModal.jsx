import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { cntWriteModalTogle } from "../../redux/modules/contentsSlice";
import { __insertContent } from "../../redux/modules/contentsSlice";

import Input from "../elements/Input";
import Button from "../elements/Button";
import useInput from "../../hooks/useInput";

import { BsFillCameraFill } from "react-icons/bs"

//이미지 압축
import imageCompression from "browser-image-compression";

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


  //프리뷰 useState
  const [compImgs, setCompImgs] = useState();
  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef();
  //request로 날릴 폼데이터
  const formData = new FormData();

  //이미지 파일 압축
  const actionImgCompress = (files) => {
    const compImgs = {
      files: [],
      fileUrls: []
    }

    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 220,
      useWebWorker: true,
    };

    try {
      //파일 압축 
      files.forEach(async (file) => {
        //기존
        compImgs.files.push(await imageCompression(file, options));

        const reader = new FileReader(); // FileReader API로 이미지 인식
        reader.readAsDataURL(await imageCompression(file, options)); //reader에게 file을 먼저 읽힘
        reader.onload = () => {// 사진 올리고 나서 처리하는 event
          //기존
          compImgs.fileUrls.push(reader.result);

        };
      })

      return compImgs;

    } catch (error) {
      console.log(error);
    }
  };


  //이미지 가져오기 핸들러
  // const onChangeImage = () => {
  //   const files = imgRef.current.files;
  //   const uploadFiles = [];//이미지 파일들 담길 변수

  //   //파일 갯수 제한
  //   if ([...files].length > 5) {
  //     alert('이미지는 최대 5개까지 업로드가 가능합니다.');
  //     return;
  //   }

  //   //선택한 이미지 파일 반복문 돌리기
  //   [...files].forEach(file => {
  //     //이미지 파일만 올릴수 있게 체크
  //     if (!file.type.match("image/.*")) {
  //       alert('이미지 파일만 업로드가 가능합니다.');
  //       return;
  //     }
  //     //파일 변수에 담기
  //     uploadFiles.push(file);
  //   });

  //   //압축된 파일 & URL useState에 담기
  //   setCompImgs(actionImgCompress(uploadFiles));
  // }

  //이미지 가져오기 핸들러
  const onChangeImage = () => {
    const files = imgRef.current.files;

    //파일 갯수 제한
    if ([...files].length > 5) {
      alert('이미지는 최대 5개까지 업로드가 가능합니다.');
      return;
    }

    //선택한 이미지 파일 반복문 돌리기
    [...files].forEach(file => {
      //이미지 파일만 올릴수 있게 체크
      if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
      }
    });

    const compImgs = {
      files: [],
      fileUrls: []
    }

    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 220,
      useWebWorker: true,
    };

    try {
      //파일 압축 
      [...files].forEach(async (file) => {
        //기존
        compImgs.files.push(await imageCompression(file, options));

        const reader = new FileReader(); // FileReader API로 이미지 인식
        reader.readAsDataURL(await imageCompression(file, options)); //reader에게 file을 먼저 읽힘
        reader.onload = () => {// 사진 올리고 나서 처리하는 event
          //기존
          compImgs.fileUrls.push(reader.result);

        };
      })

      return compImgs;

    } catch (error) {
      console.log(error);
    }

    //압축된 파일 & URL useState에 담기
    //setCompImgs(actionImgCompress(uploadFiles));
  }



  //submit
  const writeSubmit = () => {
    //폼 데이터에 이미지 파이들 담기
    //formData.append("images", compImgs.files);
    //폼 데이터에 글작성 데이터 넣기
    console.log("write", write)
    formData.append("post", JSON.stringify(write));
    //Api 날리기
    //dispatch(__insertContent(formData));
    //dispatch(__insertContent(compImgs));
    //리보크 나중에 URL.revokeObjectURL(element);
  }

  useEffect(() => {
    console.log("compImgs", compImgs)
  }, [onChangeImage])

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
              onChange={onChangeImage}
              ref={imgRef}
            />
            <StImgUploadBtn type='button' onClick={() => { imgRef.current.click() }}><BsFillCameraFill style={{ width: "100px", height: "100px" }} /></StImgUploadBtn>
          </label>

          <div className="preview">
            {/*previews map쓸곳*/
              compImgs === undefined ? "" :
                compImgs.fileUrls.map((val, i) => {
                  return (
                    <StPreviewImg src={val} alt="game image" key={i} />
                  )
                })
            }
          </div>
        </StImgsWrap>

        <Input size='large' onChange={writeHandle} name='title' value={write.title || ""} type='text' placeholder='제목' />
        <select name="place" onChange={writeHandle}>
          <option value="서울">서울</option>
          <option value="강원도">강원도</option>
          <option value="경기도">경기도</option>
          <option value="충청도">충청도</option>
          <option value="전라도">전라도</option>
          <option value="경상도">경상도</option>
          <option value="제주도">제주도</option>
        </select>
        <Input size='large' onChange={writeHandle} name='content' value={write.content || ""} type='text' placeholder='내용' />
        <Input size='large' onChange={writeHandle} name='price' value={write.price || ""} type='text' placeholder='가격' />

        <Button onClick={writeSubmit}>글 작성</Button>

        <Button onClick={closeModal}>닫기</Button>
      </StModalWrap>
    </StModalBackground>
  );
};

export default CntWriteModal;

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
  height: 800px;
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
