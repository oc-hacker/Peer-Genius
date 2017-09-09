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
    borderColor: 'black',
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
};

const infinity = (
  <svg
    version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="75pt" height="75pt" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="white" stroke="none">
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
        <Text type="display2" color="black" className={classes.centerText}>THE GURU</Text>
        <Text type="display1" color='black' className={classes.centerText}>The Power In Teaching You</Text>
        <div className={classes.underlinedSection} />
        <div className={classes.pushDown}>
          <div style={{ marginBottom: 10 }}>
            <Text type='subheading' color='black' className={classes.boxText}>
              The Possibilities are Endless...
            </Text>
          </div>
          <div className={classNames(classes.centerSection, classes.boxInfinity)}>
            {infinity}
          </div>
        </div>
        <Spacer height='8%' />
        <div>
          <div className={classes.fullWidth}>
            <div className={classes.row}>
              <Text type="title" color="white" className={classes.centerText}>Gain Volunteer Hours</Text>
            </div>
            <div className={classes.row}>
              <Text type="title" color="white" className={classes.centerText}>
                Record Hours on voluntu.io
              </Text>
            </div>
            <div className={classes.row}>
              <Text type="title" color="white" className={classes.centerText}>Customize</Text>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
