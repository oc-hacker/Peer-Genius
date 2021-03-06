import React from 'react';

import { withStyles } from 'material-ui/styles';

import { Flex, GuestAppBar, Text, Spacer } from './components';

import classNames from 'classnames';

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
    display: 'inline-block',
    width: '25%'
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
  },
  textSidePadding: {
    paddingLeft: '8%',
    paddingRight: '8%'
  },
  imageSize: {
    height: 156,
    width: 156
  }
};

@withStyles(styles)
export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: 'transparent'
    };
  }

  handleScroll() {
    let newcolor = 'rgba(153, 50, 204, ' + document.documentElement.scrollTop / 272 + ')';
    this.setState({ backgroundColor: newcolor });
  }

  componentDidMount() {
    window.onscroll = () => this.handleScroll();
  }

  render = () => {
    let { classes } = this.props;
    return (
      <div>
        <GuestAppBar currentPage={1} background={this.state.backgroundColor} />
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
            <Flex
              align={'stretch'}
              justify={'center'}
            >
              <div className={classNames(classes.greyBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/miya_image.png' className={classes.imageSize} alt='' />
                </Text>
                <Text type='subheading' color='black' className={classNames(classes.centerText)}>
                  Miya Stauss
                </Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  A co-founder of Peer Genius, who is in charge of marketing and communications. Miya advertises to
                  schools, runs the emails, and organizes meetings.
                  <br />
                  As a sophomore at Sage Hill School, Miya is 16 years old and has a deep passion for educating the
                  youth.
                </Text>
              </div>
              <div className={classNames(classes.greyBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/hana_image.png' className={classes.imageSize} alt='' />
                </Text>
                <Text type='subheading' color='black' className={classNames(classes.centerText)}>Hana Stauss</Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  A co-founder of Peer Genius, who is responsible for operations and logistics.
                  <br />
                  As Hana’s job as a hustler, she makes sure everything runs smoothly and does lots of behind the scenes
                  work.
                  <br />
                  Hana is also a sophomore at Sage Hill School and finds passion for reaching out to the community and
                  giving back.
                </Text>
              </div>
              <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/dkf_logo.png' className={classes.imageSize} alt='' />
                </Text>
                <Text type='subheading' color='white' className={classNames(classes.centerText)}>Dragon Kim
                  Foundation</Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  The Dragon Kim Foundation has been instrumental in guiding, growing, and making Peer Genius what it is
                  today.
                  <br />
                  Hana and Miya Stauss were awarded the “Dragon Kim Fellowship” opportunity in the early year of 2016.
                  <br />
                  Ever since, they have provided Hana and Miya with a mentor and useful leadership sessions.
                </Text>
              </div>
            </Flex>
            <Spacer height={20} />
            <Flex
              align={'stretch'}
              justify={'center'}
            >
              <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/bos_media_group.png' className={classes.imageSize} alt='' />
                </Text>
                <Text type='subheading' color='white' className={classNames(classes.centerText)}>Hanju Lee</Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  Hanju Lee is Hana and Miya’s mentor and graphic designer.
                  <br />
                  He worked with them to create their logo and helped to design page layouts for the website.
                  <br />
                  Hanju has been extremely helpful in helping to guide Peer Genius and give quality advice.
                </Text>
              </div>
              <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/jack_image.png' alt='Jack Sun' className={classes.imageSize} />
                </Text>
                <Text type='subheading' color='white' className={classNames(classes.centerText)}>
                  Jack Sun
                </Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  Jack is one of the programmers working for Peer Genius.
                </Text>
              </div>
              <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/jeff_image.png' alt='Jeff Guo' className={classes.imageSize} />
                </Text>
                <Text type='subheading' color='white' className={classNames(classes.centerText)}>Jeff Guo</Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  Jeff is one of the programmers working for Peer Genius.
                </Text>
              </div>
            </Flex>
            <Spacer height={20} />
            <Flex
              align={'stretch'}
              justify={'center'}
            >
              <div className={classNames(classes.blueBackground, classes.roundedCorners, classes.middleTile)}>
                <Text className={classNames(classes.sidePadding)}>
                  <img src='/assets/jason_image.png' alt='Jason Yu' className={classes.imageSize} />
                </Text>
                <Text type='subheading' color='white' className={classNames(classes.centerText)}>Jason Yu</Text>
                <Text className={classNames(classes.bottomPadding, classes.textSidePadding)}>
                  Jason is one of the programmers working for Peer Genius.
                </Text>
              </div>
            </Flex>
          </div>
          <div>
            <Text type='display1' color='#7FB8BF' className={classNames(classes.centerText, classes.topPaddingText)}>
              SUMMARY OF HOW WE GOT INVOLVED
            </Text>
            <div className={classNames(classes.line, classes.centerDiv)} />
          </div>
          <div>
            <Text type='body2' color='gray' className={classNames(classes.centerText, classes.sidePaddingExtreme)}>
              For twin sisters, Hana and Miya, education has always been fundamental in their upbringing. Whilst in
              middle school, they shared a buddy at the sister school in Ghana. Comprised of students whom were former
              child slaves, the school’s motto- “Education is Emancipation,” had a profound effect on the twins. The
              twins identified the need to strengthen a student’s confidence, particularly, in STEM subjects. Their
              market research concluded that private tutoring is cost prohibitive and hence, inaccessible.
              Alternatively, peer tutoring is largely ineffective. Even at their own high school, the Peer Tutoring
              program dissolved due to scheduling conflicts. Thus, a solution was born: Peer Genius (PG), a free,
              on-demand webapp, providing high quality peer-to-peer tutorial services to underserved students.
            </Text>
          </div>
          <Spacer height={'8em'} />
        </div>
      </div>);
  };
}