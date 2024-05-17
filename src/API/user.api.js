import axios from 'axios';


const API_URL = `${process.env.API_URL}/api/user`;

const userAPI = {

    signIn: function(email, password) {
        return axios.post(API_URL + '/sign-in', { email, password })
          .then(response => response.data)
          .catch(error => error.response);
      },

    getUser: function(token) {
        const config = {
            headers: {
                'auth-token': token
            },
        };
        return axios.get(API_URL + '/getUser', config)
        .then(response => response.data)
        .catch(error => error.response);
    },

};

export default userAPI;