import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '39706088-eed53521a6a27e1b88370a6d4';

export const fetchImages = async (inputValue, pageNr) => {
  try {
    const response = await axios.get('/', {
      params: {
        q: inputValue,
        page: pageNr,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    const transformedData = response.data.hits.map(image => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
