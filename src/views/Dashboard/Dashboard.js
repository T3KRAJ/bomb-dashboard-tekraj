import React, { useMemo } from 'react';
import Page from '../../components/Page';
import { makeStyles } from '@material-ui/core/styles';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import moment from 'moment';

import { Box, Card, CardContent, Button, Typography, Grid, Divider } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';

import HomeImage from '../../assets/img/background.jpg';
import useWallet from 'use-wallet';
import BombfarmsCard from './BombfarmsCard';
import BondsCard from './BondsCard';
import BoardroomCard from './BoardroomCard';
import { roundAndFormatNumber } from '../../0x';
import ProgressCountdown from './components/ProgressCountdown';

import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import useBombFinance from '../../hooks/useBombFinance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | Boardroom';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      // height: '90px',
    },
  },
  right: {
    marginLeft: 'auto',
  },
  left: {
    marginRight: 'auto',
  },
  divider: {
    background: '#fff',
    marginBottom: 6,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();

  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const liveTWAP = -1;
  const tvl = -1;
  const lastEpochTWAP = -1;
  return (
    <div>
      <Page>
        <BackgroundImage />
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Box mt={10}>
          <Grid container justify="center" spacing={3} mt={10}>
            <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
              <Card className={classes.gridItem} style={{ backgroundColor: '#23284B' }}>
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography color="textPrimary" variant="h6" gutterBottom>
                    Bomb finance Summary
                  </Typography>
                  <Divider className={classes.divider} />
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="body2" color="textPrimary" gutterBottom></Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body2" color="textPrimary" gutterBottom>
                        Current Supply
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body2" color="textPrimary" gutterBottom>
                        Total Supply
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="body2" color="textPrimary" gutterBottom>
                        Price
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body2" gutterBottom>
                        {/* Metamask */}
                      </Typography>
                    </Grid>
                    <Divider />
                    {/* $BOMB */}
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="h6" gutterBottom>
                        $BOMB
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bombCirculatingSupply, 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bombTotalSupply, 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="body1" gutterBottom>
                        {bombPriceInDollars ? '$' + bombPriceInDollars : '$-.----'} <br />
                        {bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        <Button
                          onClick={() => {
                            bombFinance.watchAssetInMetamask('BOMB');
                          }}
                        >
                          {' '}
                          <img
                            alt="metamask fox"
                            style={{ width: '20px', filter: 'grayscale(100%)' }}
                            src={MetamaskFox}
                          />
                        </Button>
                      </Typography>
                    </Grid>

                    {/* $BSHARE */}
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="h6" gutterBottom>
                        $BSHARE
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bShareCirculatingSupply, 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bShareTotalSupply, 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="body1" gutterBottom>
                        {bSharePriceInDollars ? '$' + bSharePriceInDollars : '$-.----'} <br />
                        {bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BTC
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        <Button
                          onClick={() => {
                            bombFinance.watchAssetInMetamask('BSHARE');
                          }}
                        >
                          {' '}
                          <img
                            alt="metamask fox"
                            style={{ width: '20px', filter: 'grayscale(100%)' }}
                            src={MetamaskFox}
                          />
                        </Button>
                      </Typography>
                    </Grid>

                    {/* $BBOND */}
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="h6" gutterBottom>
                        $BBOND
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(tBondCirculatingSupply, 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(tBondTotalSupply, 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Typography variant="body1" gutterBottom>
                        {tBondPriceInDollars ? '$' + tBondPriceInDollars : '$-.----'} <br />
                        {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography variant="body1" gutterBottom>
                        <Button
                          onClick={() => {
                            bombFinance.watchAssetInMetamask('BBOND');
                          }}
                        >
                          {' '}
                          <img
                            alt="metamask fox"
                            style={{ width: '20px', filter: 'grayscale(100%)' }}
                            src={MetamaskFox}
                          />
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <Card className={classes.gridItem}>
                <CardContent style={{ textAlign: 'center' }}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography>
                        Current Epoch <br />
                        {Number(currentEpoch)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <ProgressCountdown
                        base={moment().toDate()}
                        hideBar={true}
                        deadline={to}
                        description="Next Epoch"
                      />
                      <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch in</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography variant="body2">
                        <br />
                        Live TWAP: <span style={{ color: 'green' }}>{roundAndFormatNumber(liveTWAP, 2)}</span> <br />
                        TVL: <span style={{ color: 'green' }}>{roundAndFormatNumber(tvl, 2)}</span> <br />
                        Last Epoch TWAP:{' '}
                        <span style={{ color: 'green' }}>{roundAndFormatNumber(lastEpochTWAP, 2)}</span> <br />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <BoardroomCard />
          <BombfarmsCard />
          <BondsCard />
        </Box>
      </Page>
    </div>
  );
};

export default Dashboard;
