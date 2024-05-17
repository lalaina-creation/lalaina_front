import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/banner`;

const bannerAPI = {

    getBanner: function() {
        return axios.get(API_URL + '/')
          .then(response => response.data)
          .catch(error => error.response);
      },

      editBanner: function(token, data) {
        const config = {
          headers: {
            'auth-token': token
          }
        };
        return axios.put(API_URL + '/edit', data, config)
          .then(response => response.data)
          .catch(error => error.response);
      },

      uploadImage: function(token, data) {
        const config = {
          headers: {
            'auth-token': token
          }
        };
        return axios.post(API_URL + '/upload', data, config)
          .then(response => response.data)
          .catch(error => error.response);
      }

};

export default bannerAPI;