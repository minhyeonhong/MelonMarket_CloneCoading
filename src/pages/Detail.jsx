import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from '../components/layout/Layout';
import { __getContentDetail } from "../redux/modules/contentsSlice"

import DetailContent from '../components/pageProps/DetailContent';
import DetailContentUpdate from '../components/pageProps/DetailContentUpdate';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { content, comments } = useSelector((state) => state.contentsSlice);

    useEffect(() => {
        dispatch(__getContentDetail(id));
    }, [dispatch, id]);


    const [edit, setEdit] = useState(false);

    //수정 기능
    const editHandler = () => {
        setEdit(true);
    }

    return (

        <Layout>
            {edit === false ?
                //디테일컴포넌트
                < DetailContent content={content} comments={comments} edit={edit} paramId={id} editHandler={editHandler} />
                :
                //수정컴포넌트
                <DetailContentUpdate content={content} paramId={id} editHandler={editHandler} />
            }

        </Layout >
    )
}


export default Detail