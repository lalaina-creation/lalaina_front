import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/colsList`;

const colsListAPI = {

    getColsList: function() {
        return axios.get(API_URL + '/getColsList')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

};

export default colsListAPI;