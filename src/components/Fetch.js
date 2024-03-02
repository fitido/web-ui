const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://fitido-server.onrender.com' : ''

function fetchWithBaseUrl(url, options) {
  console.log(process.env.NODE_ENV);
  return fetch(BASE_URL + url, options);
}

export default fetchWithBaseUrl;