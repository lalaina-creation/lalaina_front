import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/products`;

const productsAPI = {

    getProducts: function() {
       
        return axios.get(API_URL + '/getProducts')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

      addProduct: function(product) {
        const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      };
        return axios.post(API_URL + '/addProduct', product, config)
          .then(response =>  response)
          .catch(error => {
            console.log('Error: ', error);
          });
      },
};

export default productsAPI;