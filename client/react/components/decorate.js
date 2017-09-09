const decorate = (displayName, ...decorators) => component => {
  component.displayName = displayName;
  for (let decorator of decorators) {
    component = decorator(component);
  }
  component.displayName = `Decorated(${displayName})-${component.displayName}`;
  return component;
};

export default decorate;
