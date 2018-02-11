import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import { connect } from 'react-redux';

import { selectCourses } from '../../../redux/selectors/config';
import CategoryListItem from './CategoryListItem';

@connect(state => ({
  subjects: selectCourses(state)
}))
export default class SubjectFields extends Component {
  // Tap into context provided by redux-form to determine the form name
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  _createClickHandler = category => () => {
    this.setState(state => ({
      [category]: !state[category]
    }));
  };

  render() {
    let { _reduxForm } = this.context;
    let { subjects } = this.props;

    return (
      <List>
        {Object.keys(subjects).map(category => (
          <CategoryListItem
            key={category} form={_reduxForm.form} category={category}
            open={this.state[category]} onClick={this._createClickHandler(category)}
          />
        ))}
      </List>
    );
  }
}