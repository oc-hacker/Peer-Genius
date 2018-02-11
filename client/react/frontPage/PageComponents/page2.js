import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { Text } from '../../components';
import Page from './Page';

import classNames from 'classnames';

import { awardIcon, teacherIcon, handIcon, ratePersonIcon } from './icons';

const styles = {
  withColor: {
    backgroundColor: 'rgba(249,202,120, 0.9)'
  },
  background: {
    backgroundImage: 'linear-gradient(to bottom, rgba(249,202,120, 0.9) 0%, rgba(249,202,120, 0.9) 100%), url(assets/home_page_3rd.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  centerText: {
    textAlign: 'center'
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
  centerTextSection: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 15
  },
  centerSection: {
    backgroundColor: 'rgb(1, 147, 172)',
    borderRadius: '10px',
    width: '100%',
    height: '100%'
  },
  pushDown: {
    marginTop: 70,
    width: '15%',
    height: '6%'
  },
  flex: {
    display: 'flex'
  },
  flexRow: {
    display: 'inline-flex'
  },
  fullWidth: {
    width: '100%'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  block: {
    display: 'block'
  },
  inline: {
    display: 'inline'
  }
};

@withStyles(styles)
export default class PageTwo extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired
  };

  render() {
    let { classes, currentPage } = this.props;

    return (
      <Page
        page={2} currentPage={currentPage}
        className={classNames(classes.background, classes.withColor)}
      >
        <Text type="display2" color="black" className={classes.centerText}>THE NEWBIE</Text>
        <div className={classes.underlinedSection} />
        <div className={classes.pushDown}/>
        <div style={{width: '90%', marginTop: 20}}>
          <div className={classNames(classes.flex, classes.spaceAround)}>
            <div>
              {awardIcon}
              <Text type="title" color="black" className={classNames(classes.centerText, classes.block)} > Guaranteed Tutoring</Text>
            </div>
            
            <div>
              {ratePersonIcon}
              <Text type="title" color="black" className={classes.centerText}>Rate your Guru</Text>
            </div>
            <div>
              {teacherIcon}
              <Text type="title" color="black" className={classes.centerText}>Find the Perfect Guru</Text>
            </div>
            <div>
              {handIcon}
              <Text type="title" color="black" className={classes.centerText}>3 Clicks</Text>
            </div>
            </div>
        </div>
      </Page>
    );
  }
}
