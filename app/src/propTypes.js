import PropTypes from 'prop-types';

export const Children = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.func,
]);

export const SearchConfig = PropTypes.shape({
  location: { path: PropTypes.string, pattern: PropTypes.instanceOf(RegExp) },
});

export const SagaContext = PropTypes.shape({
  authentication: PropTypes.object,
});

export { default as PropTypes } from 'prop-types';
