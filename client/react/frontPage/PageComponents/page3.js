import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { Spacer, Text } from '../../components';
import Page from './Page';

import classNames from 'classnames';

const styles = {
  withColor: {
    backgroundColor: 'rgb(1,147,172)'
  },
  background: {
    backgroundImage: 'linear-gradient(to bottom, rgba(1,147,172, 0.9) 0%, rgba(1,147,172, 0.9) 100%), url(assets/home_page_4th.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  underlinedSection: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    borderBottomStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'white',
    width: '10%'
  },
  boxInfinity: {
    justifyContent: 'center',
    align: 'center',
    marginLeft: '40px',
    borderRadius: '25px',
    border: '2px solid rgb(242, 201, 128)',
    padding: '20px',
    width: '100px',
    height: '100px'
  },
  pushDown: {
    marginTop: 60
  },
  centerTextSection: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 15
  },
  centerSection: {
    borderRadius: '10px',
    align: 'center'
  },
  centerText: {
    textAlign: 'center'
  },
  boxText: {
    textAlign: 'center'
  },
  row: {
    display: 'inline-block',
    marginLeft: 75,
    marginRight: 100,
    marginTop: -65
  },
  fullWidth: {
    width: '100%'
  },
  flex: {
    flex: 1,
    display: 'flex'
  },
  spaceEvenly: {
    justifyContent: 'space-evenly'
  },
  centerAlign: {
    alignItems: 'center'
  },
  superPush: {
    marginTop: 200
  },
  pushRight: {
    marginLeft: 50
  },
  negative150: {
    marginTop: -150
  },
  smallTopPush: {
    marginTop: 20
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: '25px',
    width: '50em'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
    marginLeft: 40,
    marginRight: 40,
    width: '100%'
  },
  icon: {
    width: '30%',
    fill: 'rgb(242, 201, 128)',
    paddingTop: '15px',
    paddingBottom: '15px'
  },
  sectionDescription: {
    marginBottom: 25,
    width: '70%',
    textAlign: 'center'
  }
};

const infinityIcon = (classes) => {
  return (
    <svg
      className={classes.icon}
      version="1.0" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="rgb(242, 201, 128)" stroke="none">
        <path
          d="M1100 3813 c-375 -59 -686 -253 -886 -554 -298 -447 -280 -1036 44
          -1463 141 -184 356 -344 568 -420 163 -59 235 -71 439 -71 164 0 202 4 280 23
          181 45 350 125 489 231 28 21 156 139 285 262 129 123 237 224 241 224 4 0
          110 -99 236 -219 321 -307 433 -386 654 -460 161 -54 275 -70 454 -63 268 9
          491 86 697 238 626 464 695 1361 148 1911 -167 167 -367 279 -609 339 -83 21
          -119 24 -285 24 -164 0 -202 -3 -280 -23 -123 -31 -216 -66 -303 -113 -158
          -84 -204 -122 -516 -423 l-196 -188 -175 168 c-249 239 -338 318 -431 380
          -207 138 -440 205 -699 203 -71 -1 -141 -3 -155 -6z m341 -752 c32 -12 83 -39
          115 -60 54 -36 469 -426 469 -441 0 -15 -429 -417 -475 -446 -78 -49 -177 -76
          -283 -76 -160 0 -272 45 -380 153 -82 81 -131 179 -149 293 -40 261 131 517
          394 591 77 22 236 14 309 -14z m2569 2 c248 -68 411 -324 372 -580 -18 -112
          -69 -212 -151 -294 -108 -108 -220 -153 -381 -152 -111 0 -204 28 -291 86 -51
          34 -464 425 -464 439 0 15 415 403 469 439 124 82 292 105 446 62z"
        />
      </g>
    </svg>
  );
};


const starIcon = (classes) => {
  return (
    <svg className={classes.icon} viewBox="0 0 24 24" width="75pt">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

const accessTimeIcon = (classes) => {
  return (
    <svg className={classes.icon} viewBox="0 0 24 24" width="75pt">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
};

@withStyles(styles)
export default class PageThree extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired
  };

  render() {
    let { classes, currentPage } = this.props;

    return (
      <Page
        page={3} currentPage={currentPage}
        className={classNames(classes.withColor, classes.background)}
      >
        <Text type="display2" color="white" className={classNames(classes.centerText, classes.superPush)}>THE GURU</Text>
        <Text type="display1" color='white' className={classNames(classes.centerText, classes.smallTopPush)}>The Power In Teaching You</Text>
        <div className={classes.underlinedSection} />
        <div className={classes.body}>
          <div className={classes.column}>
            {starIcon(classes)}
            <Text type="subheading" className={classes.sectionDescription}>Gain volunteer hours</Text>
          </div>
          <div className={classes.column}>
            {infinityIcon(classes)}
            <Text type="subheading" className={classes.sectionDescription}>Record hours on voluntu.io</Text>
          </div>
          <div className={classes.column}>
            {accessTimeIcon(classes)}
            <Text type="subheading" className={classes.sectionDescription}>Earn the PVSA award</Text>
          </div>
        </div>
      </Page>
    );
  }
}
