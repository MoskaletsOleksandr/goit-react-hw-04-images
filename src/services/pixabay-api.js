const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34991983-4beab49a12e957ed3014e2d55';

export const fetchPhotos = async (searchedWord, page = 1) => {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${searchedWord}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.hits.length !== 0) {
    return data;
  }

  throw new Error(`No pictures were found for the request "${searchedWord}"`);
};
