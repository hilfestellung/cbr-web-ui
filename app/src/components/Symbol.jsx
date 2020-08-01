// eslint-disable-next-line no-unused-vars
import React from 'react';
import { PropTypes } from '../propTypes';
import { useTranslation } from 'react-i18next';

export function symbolToString(data, language) {
  return data &&
    data.properties &&
    data.properties[language] &&
    data.properties[language].language
    ? data.properties[language].langauge
    : data && data.id
    ? data.id
    : data
    ? data.toString()
    : '<empty>';
}

function Symbol({ data }) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  return symbolToString(data, language);
}
Symbol.propTypes = {
  data: PropTypes.any,
};

export default Symbol;
