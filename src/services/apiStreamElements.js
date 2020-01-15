import axios from 'axios';

import jwt from 'jsonwebtoken';

class ApiStreamElements {
  token = localStorage.getItem('streamelementsconfig')
    ? JSON.parse(localStorage.getItem('streamelementsconfig')).token
    : null;

  tokenDecoded = jwt.decode(this.token);

  apiStreamElements = axios.create({
    baseURL: 'https://api.streamelements.com',
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  });

  reloadToken() {
    this.token = localStorage.getItem('streamelementsconfig')
      ? JSON.parse(localStorage.getItem('streamelementsconfig')).token
      : null;

    this.tokenDecoded = jwt.decode(this.token);

    this.apiStreamElements = axios.create({
      baseURL: 'https://api.streamelements.com',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  async getProfile() {
    this.reloadToken();
    return (await this.apiStreamElements.get('/kappa/v2/channels/me')).data;
  }

  async getLojaProdutos() {
    this.reloadToken();
    return (await this.apiStreamElements.get(
      `/kappa/v2/store/${this.tokenDecoded.channel}/items?source=all`
    )).data;
  }

  async getLojaProdutoVendas({ produto, limit, page }) {
    this.reloadToken();
    const offset = page * limit - limit;
    return (await this.apiStreamElements.get(
      `/kappa/v2/store/${this.tokenDecoded.channel}/redemptions/search?from=2019-01-01T20:00:00.000Z&limit=${limit}&offset=${offset}&page=${page}&pending=true&search=${produto}&searchBy=item.name&sort=%7B%22updatedAt%22:-1%7D&to=2099-12-30T00:00:00.000Z`
    )).data;
  }
}

const apiStreamElements = new ApiStreamElements();
export default apiStreamElements;
