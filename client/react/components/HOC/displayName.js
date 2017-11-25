export default Component =>
  Component.displayName
  || Component.name
  || (typeof Component === 'string' && Component)
  || 'Unknown';
