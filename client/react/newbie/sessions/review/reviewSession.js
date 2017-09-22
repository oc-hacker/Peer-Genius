import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Text, Spacer, Button, Flex } from '../../../components';
import { ReduxForm, StarField, TextField } from '../../../components/form';

import { required } from '../../../components/form/validator';
import { giveReview } from '../../../../redux/actions/creators/review';

const styles = ({ spacing }) => ({
  dialog: {
    width: '50vw',
    padding: `${spacing.unit * 2}px ${spacing.unit * 4}px`
  },
  comment: {
    alignSelf: 'stretch',
    margin: 10
  }
});

@connect(null, {
  push,
  giveReview
})
@withStyles(styles)
export default class ReviewSession extends Component {
  render() {
    let { classes, push, giveReview, match: { params } } = this.props;

    return (
      <Dialog
        open
        onRequestClose={() => push('.')}
        classes={{
          paperWidthMd: classes.dialog
        }}
        maxWidth="md"
      >
        <Text
          type="headline"
          size="2em"
          weight="300"
          color="#4d4d4d"
          align="center"
        >
          Rate The Tutor!
        </Text>
        <Spacer height="1em" />
        <ReduxForm
          form="rateTutor"
          onSubmit={values => giveReview(params.sessionID, values.rating, values.comment)}
        >
          <Flex
            column
            align="center"
          >
            <StarField
              name="rating"
              validate={required`Please select a rating.`}
            />
            <Spacer height="1em" />
            <Text
              type="subheading"
              color="primary"
              align="center"
            >
              Additional comments
            </Text>
            <TextField
              className={classes.comment}
              name="comment"
              multiline
              placeholder="Write Your Review Here"
            />
            <Button
              type="submit"
              color="accent"
              raised round
            >
              Submit
            </Button>
          </Flex>
        </ReduxForm>
      </Dialog>
    );
  }
}