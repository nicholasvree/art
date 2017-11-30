import axios from "axios";


// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  //
  getCollectionImages: function(collection) {
    return axios({
      method:'get',
      url:'https://www.brooklynmuseum.org/api/v2/collection/' + collection +'/object',
      headers:{api_key: 'gRQWiRBHmPfTBibPQSZKBZwANjcZqfHC'}
    })
  },

  getImageInfo: function(id){
    return axios({
      method:'get',
      url:'https://www.brooklynmuseum.org/api/v2/object/' +  id,
      headers:{api_key: 'gRQWiRBHmPfTBibPQSZKBZwANjcZqfHC'}
    })
  },

  getHunt: function(huntId){
    return axios.get('/api/hunt/' + huntId)
  },

  saveScore: function(userId, dataPack){
    return axios({
      method: 'post',
      url: '/api/scores/' + userId,
      data: dataPack
    });
  },

  login: function(loginInfo){

    console.log("login API")

    return axios({
      method: 'post',
      url: '/login',
      data: loginInfo
    })
  },

  signUp: function(signUpInfo){
    
        console.log("signUp API")
    
        return axios({
          method: 'post',
          url: '/signup',
          data: signUpInfo
        })
      },
  
  getCurrentUserId: function(){

    return axios({
      method: 'get',
      url: '/api/currentUserId'
    })
  }

};
