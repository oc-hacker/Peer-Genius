import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import { Button, Flex, Paper } from '../../components';
import { DateField, ReduxForm, SelectField } from '../../components/form';

import { range, required } from '../../components/form/validator';
import { update } from '../../../redux/actions/creators/guru';
import { selectUser } from '../../../redux/selectors/user';

import { formValueSelector } from 'redux-form';

const formSelector = formValueSelector('becomeAGuru');

@connect(state => ({
  user: selectUser(state),
  selectedCourse: formSelector(state, 'course'),
  courses: state.config.courses ? state.config.courses : []
}), {
  update
})
export default class SignUp extends Component {
  render() {
    let { update, user, selectedCourse } = this.props;

    let courses = this.props.courses ? this.props.courses.map(course => ({
      value: course.id,
      label: course.name
    })) : [{value: 'Loading', label: 'Loading'}];

    let minDate = new Date(), maxDate = new Date();
    minDate.setUTCFullYear(minDate.getUTCFullYear() - 19);
    maxDate.setUTCFullYear(maxDate.getUTCFullYear() - 13);

    return (
      <Paper style={{width: '100%', padding: 50}}>
        <Typography type='title'>Fill out the Form</Typography>
        <ReduxForm form='becomeAGuru' onSubmit={() => update(user.id, selectedCourse, true)}>
          <DateField
            name='birthdate'
            label='Date of Birth'
            defaultMode='year'
            minDate={new Date(Date.UTC(minDate.getUTCFullYear() - 1, minDate.getUTCMonth(), minDate.getUTCDate()))}
            maxDate={new Date(Date.UTC(maxDate.getUTCFullYear() + 1, maxDate.getUTCMonth(), maxDate.getUTCDate()))}
            validate={[required`When were you born?`]}
            warn={[range(minDate, maxDate, [true, true], (value, bound) => {
              if (value) {
                return new Date(value).getTime() - bound;
              }
              else {
                return false;
              }
            })`You must be between 13 years and 18 years of age to participate at Peer Genius.`]}
          />
          {/*<SubjectFields />*/}
          <SelectField name='course' label='Area of Expertise' options={courses}/>
          <Flex direction='row-reverse'>
            <Button color='primary' type='submit'>Done</Button>
          </Flex>
        </ReduxForm>
      </Paper>
    );
  }
}
