<template>
  <div id="app">
    <div id="nav" v-if="$router.history.current.name !==  'Login' && $router.history.current.name !== 'Register'">
      <Header :user="user"/>
      <Navbar :user="user"/>
    </div>
    <div>
    <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/navigation/header'
import Navbar from '@/components/navigation/navbar';

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    Navbar
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['fetchUser'])
  },
  created () {
    this.fetchUser()
  }
}
</script>