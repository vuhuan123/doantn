import.meta.env
let apiRoot = ''
console.log('meta', import.meta.env)

if (import.meta.env.DEV) {
    apiRoot = 'http://localhost:5175'
}else {
    apiRoot = 'https://planify-api.onrender.com'
}
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12