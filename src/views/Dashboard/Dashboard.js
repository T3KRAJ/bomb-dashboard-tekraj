import React from 'react'
import Page from '../../components/Page'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import HomeImage from '../../assets/img/background.jpg';
import useWallet from 'use-wallet';
import BombfarmsCard from './BombfarmsCard';
import BondsCard from './BondsCard';
import BoardroomCard from './BoardroomCard';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | Boardroom'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      // height: '90px',
    },
  },
  right: {
    marginLeft: 'auto'
  },
  left: {
    marginRight: 'auto'
  }
}));

const Dashboard = () => {
    const classes = useStyles();
    const { account } = useWallet();
  return (
    <div>
      <Page>
        <BackgroundImage />
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Typography color="textPrimary" align="center" variant="body2" gutterBottom>
          Bomb Finance Summary
        </Typography>
        <BoardroomCard />
        <BombfarmsCard />
        <BondsCard />
      </Page>
    </div>
  );
}

export default Dashboard