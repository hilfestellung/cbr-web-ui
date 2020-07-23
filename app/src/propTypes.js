import PropTypes from 'prop-types';
import { Auth0Context } from '@auth0/auth0-react';

export const Children = PropTypes.oneOf(
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.func
);

export const SearchConfig = PropTypes.shape({
  location: { path: PropTypes.string, pattern: PropTypes.instanceOf(RegExp) },
});

export const SagaContext = PropTypes.shape({
  authentication: PropTypes.instanceOf(Auth0Context),
});

export { default as PropTypes } from 'prop-types';
