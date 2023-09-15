import axios from 'axios';


const API_URL = 'http://localhost:4000/api/products';

const productsAPI = {

    getProducts: function() {
       
        return axios.get(API_URL + '/getProducts')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },
};

export default productsAPI;