import React from 'react';

const shallowMerge = (inputProps, componentProps) => ({ ...inputProps, ...componentProps });

export default (inputProps = {}, merge = shallowMerge) => RawComponent => {
  return componentProps => (
    <RawComponent
      {...merge(inputProps, componentProps)}
    />
  );
};
