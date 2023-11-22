import axios from 'axios';

// Ustawienie bazy URL dla wszystkich żądań axios
axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '39706088-eed53521a6a27e1b88370a6d4';

// Funkcja do pobierania obrazków z Pixabay API
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

    // Przekształcenie danych z odpowiedzi API
    const transformedData = response.data.hits.map(image => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    }));

    return transformedData;
  } catch (error) {
    // Obsługa błędów zapytania API
    console.error('Error fetching images:', error);
    throw error;
  }
};
