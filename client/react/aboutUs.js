import React from 'react';

import { withStyles } from 'material-ui/styles';

import Text from './components/Text';

import classNames from 'classnames';

import { GuestAppBar } from './components';

const styles = {
  backgroundHeader: {
    backgroundImage: 'linear-gradient(to bottom, rgba(153,50,204, 0.8) 0%, rgba(153,50,204, 0.8) 100%), url(assets/about_us_header.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  centerText: {
    textAlign: 'center'
  },
  line: {
    width: 100,
    marginTop: 20,
    height: 1,
    backgroundColor: '#7FB8BF',
    marginBottom: 30
  },
  profileCircle: {
    borderRadius: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 20,
    height: 100,
    width: 100
  },
  greyBackground: {
    backgroundColor: 'lightgray'
  },
  roundedCorners: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  DKF: {
    backgroundImage: 'url(assets/DKF_icon.png)'
  },
  centerDiv: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  middleTiles: {
    textAlign: 'center'
  },
  middleTile: {
    display: 'inline-block'
  },
  topHeaderText: {
    paddingTop: 150,
    paddingBottom: 150
  },
  sidePadding: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  sidePaddingExtreme: {
    paddingTop: 30,
    paddingLeft: 300,
    paddingRight: 300
  },
  bottomPadding: {
    paddingBottom: 50
  },
  topPaddingText: {
    paddingTop: 50
  },
  blueBackground: {
    backgroundColor: '#7FB8BF'
  }
};

@withStyles(styles)
export default class AboutUs extends React.Component {
  render = () => {
    let { classes } = this.props;
    return (
      <div>
        <GuestAppBar currentPage={1} />
        <div className={classes.backgroundHeader}>
          <Text type='display2' color='white' className={classNames(classes.centerText, classes.topHeaderText)}>ABOUT
            US</Text>
        </div>
        <div>
          <div>
            <Text type='display1' color='#7FB8BF' className={classNames(classes.centerText, classes.topPaddingText)}>MEET
              THE TEAM</Text>
            <div className={classNames(classes.line, classes.centerDiv)} />
          </div>
          <div className={classNames(classes.centerDiv, classes.middleTiles)}>
            <div className={classNames(classes.greyBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}><img src='assets/DKF_icon.png' /></p>
              <Text type='subheading' color='black' className={classNames(classes.centerText, classes.bottomPadding)}>Hana Stauss</Text>
            </div>
            <div className={classNames(classes.greyBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}><img src='assets/ms_icon.png' /></p>
              <Text type='subheading' color='black' className={classNames(classes.centerText, classes.bottomPadding)}>Hana Stauss</Text>
            </div>
            <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}><img src='assets/hana_icon.png' /></p>
              <Text type='subheading' color='white' className={classNames(classes.centerText, classes.bottomPadding)}>Dragon Kim Foundation</Text>
            </div>
            <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}>
                <img src='assets/businessguy_icon.png' />
              </p>
              <Text type='subheading' color='white' className={classNames(classes.centerText, classes.bottomPadding)}>Hanju Lee</Text>
            </div>
            <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}>
                <img src='' alt='' />
              </p>
              <Text type='subheading' color='white' className={classNames(classes.centerText, classes.bottomPadding)}>Jack Sun</Text>
            </div>
            <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}>
                <img src='' alt='' />
              </p>
              <Text type='subheading' color='white' className={classNames(classes.centerText, classes.bottomPadding)}>Jeff Guo</Text>
            </div>
            <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
              <p className={classNames(classes.centerText, classes.sidePadding)}>
                <img src='' alt='' />
              </p>
              <Text type='subheading' color='white' className={classNames(classes.centerText, classes.bottomPadding)}>Jason Yu</Text>
            </div>
          </div>
          <div>
            <Text type='display1' color='#7FB8BF' className={classNames(classes.centerText, classes.topPaddingText)}>SUMMARY
              OF HOW WE GOT INVOLVED</Text>
            <div className={classNames(classes.line, classes.centerDiv)} />
          </div>
          <div>
            <Text type='body2' color='gray' className={classNames(classes.centerText, classes.sidePaddingExtreme)}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard
              dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting.
            </Text>
          </div>
        </div>
      </div>);
  };
}