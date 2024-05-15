import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/banner`;

const bannerAPI = {

    getBanner: function() {
        return axios.get(API_URL + '/')
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

      editBanner: function(data) {
        return axios.put(API_URL + '/edit', data)
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      },

      uploadImage: function(data) {
        return axios.post(API_URL + '/upload', data)
          .then(response => response.data)
          .catch(error => {
            console.log('Error: ', error);
          });
      }

};

export default bannerAPI;