import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 홈 페이지 */}
                <Route path="/" element={<Home />} />
                {/* 마이페이지 */}
                <Route path="/mypage" element={<Mypage />} />
                {/* 상세보기 페이지 */}
                <Route path="/detail/:id" element={<Detail />} />

            </Routes>
        </BrowserRouter>
    );
};

export default Router;



