import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const myApiKey = '51482137-814db58508ed4552264af265d';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios(baseUrl, {
      params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
