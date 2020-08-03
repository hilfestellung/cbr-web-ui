import { v4 as uuidV4 } from 'uuid';

import { getLocalItem, setLocalItem } from './utils/storage';

let clientId = getLocalItem('client_id');

if (clientId == null) {
  clientId = uuidV4();
  setLocalItem('client_id', clientId);
}
export default {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  isProduction: process.env.NODE_ENV === 'production',
  version: process.env.REACT_APP_VERSION,
  clientId,
  window: global.window,
  document: global.document,
};
