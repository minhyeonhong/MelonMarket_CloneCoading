import React from 'react'
import Header from '../components/layout/Header'
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from '../components/layout/Layout';
import { __getContentDetail, __deleteContent, __editContent } from "../redux/modules/contentsSlice"
import { getCookie } from '../cookie/cookie';

import DetailContent from '../components/pageProps/DetailContent';
import DetailContentUpdate from '../components/pageProps/DetailContentUpdate';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { content, comments } = useSelector((state) => state.contentsSlice);

    useEffect(() => {
        dispatch(__getContentDetail(id));
    }, []);


    const [edit, setEdit] = useState(false);
    const [target, setTarget] = useState();
    const [revise, setRevise] = useState();

    //삭제 기능
    const deleteHandler = (id) => {
        dispatch(__deleteContent(id))
    }

    //수정 기능
    const editHandler = () => {
        setEdit(true);
        console.log(edit)
        // dispatch(__editContent(id))
    }

    const onContentUpdate = (id) => {
        // dispatch(__editContent({ id: id, target: target }));
        setEdit(false);
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setRevise({ ...revise, [name]: value });
    };
    const btnCancle = () => {
        setEdit(false);
    };

    return (

        <Layout>
            {edit === false ?
                //디테일컴포넌트
                < DetailContent content={content} comments={comments} edit={edit} editHandler={editHandler} />
                :
                //수정컴포넌트
                <DetailContentUpdate content={content} editHandler={editHandler} />
            }

        </Layout >
    )
}


export default Detail