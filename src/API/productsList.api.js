import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/productsList`;

const productsListAPI = {

    getProductsList: function() {
        return axios.get(API_URL + '/getProductsList')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

};

export default productsListAPI;