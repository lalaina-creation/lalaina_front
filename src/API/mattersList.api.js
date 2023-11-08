import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/mattersList`;

const mattersListAPI = {

    getMattersList: function() {
        return axios.get(API_URL + '/getMattersList')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

};

export default mattersListAPI;