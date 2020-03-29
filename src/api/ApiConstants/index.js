export const BASE_URL = (process.env.REACT_APP_API_URL !== undefined) ? process.env.REACT_APP_API_URL :  "http://localhost:3000"
export const V1_PREFIX = '/api/v1'
export const LOGIN_URL = '/oauth/token'
export const VISIBLE_WIDGETS_URL = '/widgets/visible'
export const REVOKE_TOKEN_URL = '/oauth/revoke'