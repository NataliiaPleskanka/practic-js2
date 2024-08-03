import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_key = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  #query = '';
  async getPopularPhotos(page) {
    const url = `${
      this.#BASE_URL
    }?query=popular&page=${page}&per_page=12&orientation=portrait&client_id=${
      this.#API_key
    }`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  set query(newQuery) {
    this.#query = newQuery;
  }
  async getPhotoByQuery(page) {
    const url = `${this.#BASE_URL}?query=${
      this.#query
    }&page=${page}&per_page=12&orientation=portrait&client_id=${this.#API_key}`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
