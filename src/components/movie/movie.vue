<template>
  <div class="movie">
    <div class="movie__content-img">
      <img class="movie__img" :src="imageUrl('w300',movie.poster_path)" />
      <div class="movie__content">
        <p class="movie__title">{{ movie.title }}</p>
        <button v-if="movieTarget === 'home'" @click="$emit('movie:addOrRemoveFavorite', movie)">{{ movie.favorite ? 'remove' : 'add'}}</button>
        <button v-else @click="$emit('movie:addOrRemoveFavorite', movie)">remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { imageUrl } from '@/helpers/image'

export default {
  name: 'Movie',
  props: ['movie','movieTarget'],
  methods: {
    imageUrl
  }
}
</script>