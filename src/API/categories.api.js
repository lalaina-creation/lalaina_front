import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/categories`;

const categoriesAPI = {

    getCategories: function() {
        return axios.get(API_URL + '/getCategories')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

};

export default categoriesAPI;