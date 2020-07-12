<template>
  <div>
    <movieList :movies="favorites" movieTarget="favorite"/>
  </div>
</template>

<script>
import movieList from '@/components/movie/movieList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Favorites',
  components: {
    movieList
  },
  computed: {
    ...mapGetters(['favorites','user'])
  },
  methods: {
    ...mapActions(['fetchFavoritesMovies'])
  },
  mounted () {
    this.fetchFavoritesMovies(this.user.data.id)
    console.log('favorites', this.favorites)
  }
}
</script>