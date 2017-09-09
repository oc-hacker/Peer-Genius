import React from 'react';

const LinkedInIcon = props => (
  <svg viewBox="0 0 24 24" width={props.size} height={props.size} {...props}>
    <path
      fill={props.color}
      d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
    />
  </svg>
);

LinkedInIcon.displayName = 'LinkedInIcon';

LinkedInIcon.defaultProps = {
  size: 24
};

export default LinkedInIcon;
