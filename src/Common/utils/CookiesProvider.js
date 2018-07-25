import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookiesProvider {
  static getTokenData = () => {
    const token_data = cookies.get("token_data");

    if (token_data) return token_data;
    else return null;
  };

  static getAccessToken = () => {
    const token_data = cookies.get("token_data");

    if (token_data) return token_data.access_token;
    else return null;
  };

  static getUserData = () => {
    const user_data = cookies.get("user_data");

    if (user_data) return user_data;
    else return null;
  };

  static getExpiryDate = () => {
    const expiry_date = cookies.get("expiry_date");

    if (expiry_date) return expiry_date;
    else return null;
  };

  static setCookies = (key, object, path, expires) => {
    cookies.set(key, object, {
      path,
      expires
    });
  };

  static getAllCookies = () => {
    const token_data = cookies.get("token_data");
    const user_data = cookies.get("user_data");

    if (token_data && user_data)
      return {
        token_data,
        user_data
      };
    else return null;

    // return cookies.getAll();
  };

  static removeAllCookies = () => {
    cookies.remove("token_data");
    cookies.remove("user_data");
  };
}

export default CookiesProvider;
