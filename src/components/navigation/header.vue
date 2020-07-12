<template>
  <div>
    <div class="header">
      <div class="header__search">
        <input class="header__search-field js-search" name="search" placeholder="search"/>
        <span class="icon-search flaticon-loupe"></span>
      </div>
      <div class="header__user" v-if="user.loggedIn">
        <img class="header__user-picture" :src="user.data.photoURL" :alt="user.data.displayName"/>
        <p class="header__user-name">{{ user.data.displayName }}</p>
      </div>
      <a v-else class="button button--small header__button" href="login">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['user'],
  mounted () {
    console.log(this.user)
  }
}
</script>