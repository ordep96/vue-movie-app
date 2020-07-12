<template>
  <nav class="navbar">
    <div class="navbar__content-logo">
      <img class="navbar__logo" src="@/assets/images/movie-icon.svg" alt="logo"/>
    </div>
    <ul class="navbar__menu">
      <li class="navbar__menu-item">
        <router-link class="navbar__menu-link" to="/">
          <span class="flaticon-video"></span>
          Movies
        </router-link>
      </li>
      <li class="navbar__menu-item">
        <router-link class="navbar__menu-link" to="/news">
          <span class="flaticon-television"></span>
          Tv series
        </router-link>
      </li>
      <li v-if="user.loggedIn" class="navbar__menu-item">
        <router-link class="navbar__menu-link" to="favorites">
          <span class="flaticon-ticket"></span>
          My favorites
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: ['user']
}
</script>