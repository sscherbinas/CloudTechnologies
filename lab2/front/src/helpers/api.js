const BACKEND_URL = "https://shcherbyna-backend.appspot.com/";

export default {
  async get(url) {
    try {
      const res = await fetch(`${BACKEND_URL}${url}`);

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  },

  async post(url, body, params = {}) {
    try {
      const res = await fetch(`${BACKEND_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body),
        ...params
      });

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  },

  async postFile(url, body, params = {}) {
    try {
      const res = await fetch(`${BACKEND_URL}${url}`, {
        method: "POST",
        body,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        ...params
      });

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  },

  async delete(url, id) {
    try {
      const res = await fetch(`${BACKEND_URL}${url}/${id}`, {
        method: "DELETE"
      });

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }
};
