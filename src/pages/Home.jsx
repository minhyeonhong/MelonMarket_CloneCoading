import React from 'react';
import styled from 'styled-components';
import Box from '../components/elements/Box';
import Layout from '../components/layout/Layout';

import HomeAd from '../components/pageProps/HomeAd';
import List from '../components/pageProps/List';

const Home = () => {
    return (
        <Layout>
            <HomeAd />
            <List />
        </Layout>
    );
};

export default Home;

