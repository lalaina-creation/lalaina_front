import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/attributes`;

const attributesAPI = {

    getAttributes: function() {
        return axios.get(API_URL + '/getAttributes')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

};

export default attributesAPI;