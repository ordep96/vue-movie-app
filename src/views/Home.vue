<template>
  <div class="home">
    <featureMovie />
    <div class="container">
      <div class="content-page">
        <movieList :movies="movies" movieTarget="home"/>
      </div>
    </div>
  </div>
</template>

<script>
import movieList from '@/components/movie/movieList'
import featureMovie from '@/components/movie/featureMovie'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    movieList,
    featureMovie
  },
  computed: {
    ...mapGetters(['movies','user'])
  },
  methods: {
    ...mapActions(['fetchMovies']),
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutation,state) => {
      if ( mutation.type === 'SET_USER' ) {
        if ( state.user.loggedIn ) {
          this.fetchMovies({url: 'discover/movie', user: this.user.data, setFavorites: true});
        } else {
          this.fetchMovies({url: 'discover/movie', user: this.user.data});
        }
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>
