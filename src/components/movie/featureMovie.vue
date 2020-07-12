<template>
  <div>
    <span v-if="load">Cargando</span> 
    <div v-else class="feature-movie" :style="'background-image:url('+ posterBackground +')'">
      <div class="container">
        <div class="feature-movie__content">
          <h2 class="feature-movie__title">{{ movie.title }}</h2>
          <ul class="feature-movie__genres js-genre"></ul>
          <button class="feature-movie__button js-watch-video">Watch trailer</button>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { getData } from '@/helpers/api/getData'
import { imageUrl } from '@/helpers/image'

export default {
  name: 'featureMovie',
  data: () => ({
    movie: null,
    posterBackground: '',
    load: true
  }),
  methods: {
    imageUrl
  },
  async mounted () {
    let movies = await getData('movie/now_playing')
    if ( movies.data.results.length ) {
      this.movie = movies.data.results[Math.floor(Math.random() * 20)]
      this.posterBackground = this.imageUrl('original', this.movie.backdrop_path)
      this.load = false
    }
  }
}
</script>