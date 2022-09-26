class DB {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.data = {};
  }

  async sendRequest(method = 'GET', name = '', id = null, data = null) {
    const url = `${this.baseUrl}${name}${id !== null ? `/${id}` : ''}`;
    // console.log(method, url);
    const options = {
      method,
      mode: 'cors',
      headers: {},
    };
    if (data !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(url, options);
      if (response === '') {
        return null;
      }
      const resData = await response.json();
      // console.log(resData);
      return resData;
    } catch (err) {
      throw new Error(`Server error: ${err}`);
    }
  }

  async loadData(name = '', fields = []) {
    this.name = name;
    [this.idName] = fields;
    this.fields = fields;
    this.data = {};
    const id = this.idName;
    const res = await this.sendRequest('GET', this.name);
    res.forEach((row) => {
      this.data[row[id]] = row;
    });
  }

  async insert(row = {}) {
    try {
      const res = await this.sendRequest('POST', this.name, null, row);
      const id = res[this.idName];
      this.data[id] = res;
      return res;
    } catch (err) {
      throw new Error(`Can't add data ${row}: ${err}`);
    }
  }

  async update(row = {}) {
    try {
      const id = row[this.idName];
      const res = await this.sendRequest('PUT', this.name, id, row);
      this.data[id] = res;
      return res;
    } catch (err) {
      throw new Error(`Can't add data ${row}: ${err}`);
    }
  }

  async delete(id) {
    try {
      await this.sendRequest('DELETE', this.name, id);
      delete this.data[id];
      return true;
    } catch (err) {
      throw new Error(`Can't delete data ${id}: ${err}`);
    }
  }

  getData() {
    return this.data;
  }

  getOneData(id) {
    return this.data[id];
  }

  selectDataOrderByID() {
    return Object.values(this.data);
  }

  selectDataOrderByIDDesc() {
    return Object.values(this.data).reverse();
  }
}
export default DB;
