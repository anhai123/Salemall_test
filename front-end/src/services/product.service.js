import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://salemall-test-ukno.vercel.app/api/v1/product";
const createProduct = (form) => {
  return axios
    .post(`${API_URL}/list`, form, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getProducts = () => {
  return axios.get(`${API_URL}/list`).then((response) => {
    return response.data;
  });
};

const deleteProduct = (id) => {
  return axios
    .delete(API_URL + `/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const putProduct = (form, id) => {
  return axios
    .put(API_URL + `/${id}`, form, {
      headers: authHeader(),
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      return response.data;
    });
};


const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  putProduct,
};
export default productService;
