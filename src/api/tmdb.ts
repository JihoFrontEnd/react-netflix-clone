const baseURL = 'https://api.themoviedb.org/3';
const baseParams = {
  api_key: process.env.REACT_APP_TMDB_API_KEY as string,
  language: 'ko-KR',
};

/**
 * Request to themoviedb.org
 * @param url
 * @param params querystring
 * @returns Promise(json data)
 */
export const $fetch = async (url: string, params?: { [key: string]: string }) => {
  const targetURL = new URL(`${baseURL}${url}`);
  Object.entries({ ...params, ...baseParams }).forEach(([key, value]) =>
    targetURL.searchParams.append(key, value)
  );
  return fetch(targetURL).then((res) => res.json());
};
