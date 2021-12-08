import SERVER from './serverUrl';

const SERVER_URL = `${SERVER}/authors`;

class AuthorApi {
  static async getAllAuthors() {
    const res = await fetch(SERVER_URL);
    const jsonResponse = await res.json();
    return jsonResponse;

    // return await fetch(SERVER_URL).then(response => {
    //   console.log(response.json());
    //   return response.json();
    // });
  }
}

export default AuthorApi;
