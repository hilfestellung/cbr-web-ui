import { PropTypes } from '../propTypes';
import { useTranslation } from 'react-i18next';

export function symbolToString(data, language) {
  if (Array.isArray(data)) {
    return data.map((entry) => symbolToString(entry, language)).join(', ');
  }
  if (
    data &&
    data.properties &&
    data.properties[language] &&
    data.properties[language].label
  ) {
    return data.properties[language].label;
  }
  if (data && data.id) {
    return data.id;
  }
  return data ? data.toString() : '<empty>';
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
