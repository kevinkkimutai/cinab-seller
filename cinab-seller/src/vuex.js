import { createStore } from "vuex";


const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    dashboard: {
      loading: false,
      data: {}
    },

  },
  getters: {
    
  },
  actions: {

   
 
  },
  mutations: {
  
  },
  modules: {},
});

export default store;