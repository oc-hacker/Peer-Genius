import React from 'react';

const FacebookIcon = props => (
  <a style={{display: "table-cell"}} href='https://facebook.com/peergenius' target='_blank' rel='noopener noreferrer'>
    <svg viewBox="0 0 24 24" width={props.size} height={props.size} {...props}>
      <path
        fill={props.color}
        d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"
      />
    </svg>
  </a>
);

FacebookIcon.displayName = 'FacebookIcon';

FacebookIcon.defaultProps = {
  size: 24
};

export default FacebookIcon;