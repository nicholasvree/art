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

  getSavedImages: function(){
    return axios.get('/api/saveimage')
  },

  searchImages: function(searchTerm){
    return axios({
      method:'get',
      url:'https://www.brooklynmuseum.org/api/v2/object?has_images=1&limit=35&keyword=' + searchTerm,
      headers:{api_key: 'gRQWiRBHmPfTBibPQSZKBZwANjcZqfHC'}
    })
  },

  retrieveSavedImages: function(){
    return axios.get('/api/saveimage')
  },

  saveImage: function(imageInfo){
    return axios({
      method: 'post',
      url: '/api/saveimage',
      data: imageInfo
    })
  },

  getHuntList: function(){
    return axios.get('/api/hunt')
  },

  getHunt: function(huntId){
    return axios.get('/api/hunt/' + huntId)
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

    logout: function(){
      return axios({
        method: 'get',
        url: '/logout'
      })
    },
  
  getCurrentUserId: function(){

    return axios({
      method: 'get',
      url: '/api/currentUserId'
    })
  },

  saveScore: function(scoreData){

    return axios({
      method: 'post',
      url: '/api/saveScore',
      data: scoreData
    })
  }

};
