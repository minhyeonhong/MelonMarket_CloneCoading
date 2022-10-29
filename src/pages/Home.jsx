import React from 'react';
import styled from 'styled-components';
import Box from '../components/elements/Box';
import Layout from '../components/layout/Layout';

import List from '../components/pageProps/List';

const Home = () => {
    return (
        <Layout>
            <Box size="account">
                <List />
            </Box>
        </Layout>
    );
};

export default Home;

