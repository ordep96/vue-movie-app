import Vue from 'vue'
import Vuex from 'vuex'
import { getData } from '../helpers/api/getData'
import { getSaveFavorites, saveFavorites } from '../helpers/database'
import { isLoginUser } from '../helpers/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: ''
    },
    movies: {
      data: null,
      load: true
    },
    favorites: {
      data: null,
      load: true
    }
  },
  mutations: {
    SET_LOGGED_IN (state,value) {
      localStorage.setItem('userLogged', value)
      Vue.set(state.user, 'loggedIn', value)
    },
    SET_USER (state,user) {
      Vue.set(state.user, 'data', user)
    },
    SET_LOAD_MOVIES (state,value) {
      state.movies.load = value
    },
    SET_MOVIES (state, data) {
      if ( data.setFavorite ) {
        for ( let i=0; i < data.favorites.length; i++) {
          for ( let j=0; j < data.movies.length; j ++) {
            if ( data.movies[j].id === data.favorites[i].id) {
              console.log(data.movies[j])
              data.movies[j].favorite = true
            }
          }
        }
        Vue.set(state.movies, 'data', data.movies)
      } else {
        Vue.set(state.movies, 'data', data.movies)
      }
    },
    SET_FAVORITES_MOVIES_LOAD (state,value) {
      state.favorites.load = value
    },
    SET_FAVORITES_MOVIES (state,favorites) {
      state.favorites.data = favorites
    },
    SAVE_FAVORITES_MOVIES (state,payload) {
      let movie_index = state.movies.data.findIndex(item => item.id === payload.movie.id)
      if ( movie_index >= 0 ) {
        Vue.set(state.movies.data[movie_index], 'favorite', true)
      }
    }
  },
  actions: {
    fetchUser: ({commit}) => {
      isLoginUser ( user => {
        if ( user ) {
          commit('SET_LOGGED_IN', true)
          commit('SET_USER',{
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            id: user.uid
          })
        } else {
          commit('SET_LOGGED_IN', false)
          commit('SET_USER', null)
        }
      })
    },
    fetchMovies: async ({commit},val) => {
      let movies = await getData(val.url)
      commit('SET_LOAD_MOVIES', false)
      if ( val.setFavorites ) {
        let favorites = await getSaveFavorites(val.user.id)
        commit('SET_MOVIES', {movies: movies.data.results, setFavorite: val.setFavorites, favorites: Object.values(favorites)})
      } else {
        commit('SET_MOVIES', {movies: movies.data.results })
      }
    },
    fetchFavoritesMovies: async({commit},userId) => {
      let favorites = await getSaveFavorites(userId)
      commit('SET_FAVORITES_MOVIES_LOAD', false)
      commit('SET_FAVORITES_MOVIES', Object.values(favorites))
    },
    saveFavoritesMovies: ({commit},data) => {
      saveFavorites(data.user,data.movie, err => {
        if ( err ) {
          console.log(err)
        } else {
          commit('SAVE_FAVORITES_MOVIES', data)
        }
      })
    }
  },
  getters: {
    user: (state) => state.user,
    movies: (state) => state.movies,
    favorites: (state) => state.favorites
  }
})
