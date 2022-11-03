# 항해 7주차 팀과제 1 : React, Redux-Toolkit, Spring 등을 활용한 미니 클론코딩 프로젝트 만들기
# 🍈멜론 마켓!
- 프로젝트 설명 : 당근마켓 클론코딩, 그러나 번개장터를 조금 곁들인
목차
# 👨‍👧‍👧 팀원소개!
|이름|파트|
|--|--|
|민현홍(팀장)|FE|
|임효진|FE|
|이재선|BE|
|장윤서|BE|
|정동훈|BE|

## 프로젝트 소개
<img width="1000" alt="스크린샷 2022-11-03 10 38 22" src="https://user-images.githubusercontent.com/86904667/199633012-850e0a85-66ee-4700-97a6-483de35847d2.png">

<img width="1000" alt="스크린샷 2022-11-03 10 41 12" src="https://user-images.githubusercontent.com/86904667/199633305-76412fd4-d766-4729-b652-eca04ca62ec1.png">
<img width="1000" alt="스크린샷 2022-11-03 10 42 30" src="https://user-images.githubusercontent.com/86904667/199633376-50019bdd-8b9f-47f6-9819-45e3046e5639.png">
<img width="1000" alt="스크린샷 2022-11-03 10 43 21" src="https://user-images.githubusercontent.com/86904667/199633430-33ae923d-d449-47b9-b9b7-d81a74941808.png">


<p align="justify">
React / Spring 바탕으로 한 클론코딩 프로젝트<br>
제한 및 공통 사항 : <br>
  <li> Middleware Instance화</li>
  <li> 백엔드와의 협업 </li>
</p>

## 와이어프레임 

<img width="533" alt="스크린샷 2022-11-03 11 14 53" src="https://user-images.githubusercontent.com/86904667/199635876-3bd7193c-f5e6-431d-b608-901d27e55898.png">

## <a href="https://hanghae-w6.vercel.app/">버셀 배포 페이지</a>

<br>

## 기술 스택

HTML / CSS Framework(Styled component) / JavaScript / React / Redux / Redux Toolkit / git / gitHub / spring / Browser Image Compression 
/ Router DOM / Axios / Cookie / React Icons / env -cmd / Google fonts / Weathermap API
<br>


## 구현 기능


### 기능 1 : react- router-dom 통한 페이지 별 관리<br>
Managing page by page through react-router-dom

- Home 화면, 보고싶은 Product 화면, 미디어 판매상품 확인, 상세페이지 등 react-router-dom으로 관리(url params)<br>
  Home Screen, Media Screen, Media Card Check, Detailed Page, etc. <br>
  react router-dom Management (via url parmarms)

- router에서 url 상세 관리<br>
  Manage details on the router

- navigate로 페이지 이동<br>
  Add the ability to move pages to Navigate

<br>

### 기능 2 : 중고 제품 카드 CRUD

- 게시물인 카드의 생성, 읽기, 수정, 삭제 기능 모두 구현<br>
  Implement the features to create, read, modify, and delete cards that are posts

- CRUD 모두 리덕스 툴킷 + thunk 활용(TodosSlice)<br>
  CRUD all leverages the redux toolkit + middleware(Thunk) (ContentSlice)

- CRUD 모두 미들웨어 이용한 action Dispatch -> 리듀서 과정 비동기 처리<br>
  CRUD all uses middleware to process action Dispatch -> reducer asynchronously

- 토글 기능 활용한 수정 창 숨기기<br>
  Hide the correction window using the Toggle function


<br>

### 기능 3 : 댓글 CRUD

- 게시물의 댓글의 생성, 읽기, 수정, 삭제 기능 모두 구현<br>
- Implement the feature to create, read, modify, and delete comments in a post


- CRUD 모두 리덕스 툴킷 + thunk 활용(commentsSlice)<br>
  CRUD all leverages the redundancy toolkit + thunk (commentsSlice)

- CRUD 모두 미들웨어 이용한 action Dispatch -> 리듀서 과정 비동기 처리<br>
  CRUD all uses middleware to process action Dispatch -> reducer asynchronously

- 댓글은 필터링 통해 부여해준 게시물과 연관된 id로 걸른 후, 모든 게시물에서 같은 댓글이 보이지 않게함<br>
  Make sure the comments don't show the same comments in all posts after walking to an ID associated with the posts you were given through filtering


- 수정은 토글 식으로 관리<br>
manage modify feature with togle type
<br>

<br>

## 컴포넌트와 나눈 이유
## The reason why we devided components

### Ducks 패턴 활용 통한 컴포넌트 나누기
### Sharing components using Ducks pattern

### 1. Components(Element)
<img width="150" alt="스크린샷 2022-11-03 10 53 40" src="https://user-images.githubusercontent.com/86904667/199634250-972f1358-f63e-448d-b6a3-0515310fd3be.png">

- CSS 컴포넌트<br>
  CSS Component

### Components(common)
<img width="150" alt="스크린샷 2022-11-03 10 55 15" src="https://user-images.githubusercontent.com/86904667/199634398-ee957236-4c74-486e-a792-7551f44d72ff.png">

- CntWriteModal : 글작성 모달 컴포넌트
- LoginModal : 로그인 / 회원가입 컴포넌트
- Comment : 댓글 관리 컴포넌트

<br>

### Layout Components
<img width="150" alt="스크린샷 2022-11-03 11 00 10" src="https://user-images.githubusercontent.com/86904667/199634741-217ca65a-430e-4780-ad73-340a7d33ef15.png">

<br>

### Page Props
<img width="150" alt="스크린샷 2022-11-03 11 01 24" src="https://user-images.githubusercontent.com/86904667/199634863-f92fb786-7239-4453-a380-4aa6546a6cc0.png">

- Detail Content : 각 제품의 상세 설명 컴포넌트
  Detail Content : Detail component for each stuffs

- DetailCotentUpdate : 상세페이지 내용 수정용 컴포넌트
  DetailCotentUpdate : Modify to content component for each stuffs

- HomeAd : 홈화면 광고 배너 
  HomeAd : Advertisement banner on Landing Page

- List : 홈화면에서 보여지는 제품 리스트
  List : List of shown stuffs on Landing Page


### 2. Pages
<img width="150" alt="스크린샷 2022-11-03 10 59 23" src="https://user-images.githubusercontent.com/86904667/199634690-9fe2a9c5-a7d8-4fa5-b664-a813de6b092a.png">

- Home.jsx : 랜딩 페이지<br>
  Home.jsx: Landing Page

- Detail.jsx : 판매제품별 상세정보<br>
  Detail.jsx: Details of each selling stuffs

- Mypage.jsx : 판매중인 제품을 관리할 수 있는 페이지<br>
  Mypage.jsx : It can Manage to selling stuffs on a Mypage


<br>

### 3. redux & Router & hooks & element
- modules > commentsSlice.js : 댓글 Reducer 관리
- modules > contentsSlice.js : 판매 제품 Reducer 관리
- modules > membersSlice.js : 로그인 및 회원가입 Reducer 관리
- shared > Router.jsx : react-router-dom 방식에 따라 Home, 상세페이지 이동 위한 설정으로 패턴 관리
- hooks > useInput.js : useInput이라는 커스텀훅을 이용한 다중 입력값 관리 기능을 구현
- hooks > useImgUpload.js : useImgUpload이라는 커스텀 훅을 이용한 이미지 압축 및 다중업로드 기능을 구현 

<br>


<br>

<p align="justify">

</p>

<br>

## 라이센스

Copyright 2022. hang-hae99 9th W7 team 4
<br/>
all rights reserved.
