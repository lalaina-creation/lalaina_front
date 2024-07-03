import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/products`;

const productsAPI = {

    getProducts: function() {
       
        return axios.get(API_URL + '/getProducts')
          .then(response => response.data)
          .catch(error => error.response);
    },

    addProduct: function(token, product) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': token
          },
      };
        return axios.post(API_URL + '/addProduct', product, config)
          .then(response =>  response)
          .catch(error => error.reponse);
      },

    updateProduct: function(token, id, product) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': token
          },
      };
        return axios.put(API_URL + '/updateProduct/' + id, product, config)
          .then(response =>  response)
          .catch(error => error.reponse);
    },

    deleteProduct: function(token, id) {
        const config = {
          headers: {
            'auth-token': token
          },
      };
        return axios.delete(API_URL + '/deleteProduct/' + id, config)
          .then(response =>  response)
          .catch(error => error.reponse);
    },
};

export default productsAPI;