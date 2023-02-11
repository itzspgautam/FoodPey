const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const ApiConfig = {
  BASE_URL: `${BACKEND_BASE_URL}/api/v1`,
  REGISTER: '/register',
  LOGIN: '/login',
  TOKEN_VERIFY: '/verify',
  GET_NEARBY_STORE: '/stores/nearby',
  GET_ADDRESSES: '/addresses',
  CREATE_ADDRESSES: '/address/new',
};

export default ApiConfig;
