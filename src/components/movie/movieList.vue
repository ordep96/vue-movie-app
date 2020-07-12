<template>
  <div class="movies-list" v-if="movies">
    <Movie 
      v-for="movie in movies.data" 
      :key="movie.id" 
      :movie="movie" 
      :movieTarget="movieTarget"
      @movie:addOrRemoveFavorite="addOrRemoveFavorite"
    />
  </div>
  <div v-else>No hay peliculas</div>
</template>

<script>
import Movie from './movie';
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['movies','movieTarget'],
  name: 'movieList',
  components: {
    Movie
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['fetchMovies','saveFavoritesMovies']),
    addOrRemoveFavorite (movie) {
      if ( this.movieTarget === 'home' ) {
        this.saveFavoritesMovies({user:this.user.data,movie})
      }
    }
  }
}
</script>