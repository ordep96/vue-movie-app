<template>
  <div>
    <div class="content-form">
      <h2 class="content-form__title">SIGN IN TO YOUR ACCOUNT</h2>
      <form class="form" @submit.prevent="loginUser">
        <input class="form__field" type="email" name="email" placeholder="email" v-model="user.email"/>
        <input class="form__field" type="password" name="password" placeholder="password" v-model="user.password"/>
        <button class="button button--full form__button" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { signIn } from '@/helpers/auth'
import { mapActions } from 'vuex'

export default {
  name: 'formLogin',
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions(['loginUser']),
    loginUser () {
      signIn(this.user.email,this.user.password)
        .then( snapshot => {
           if ( snapshot.user ) {
             this.$store.dispatch('fetchUser', snapshot.user )
             this.$router.replace({name: 'Home'})
           }
        })
    }
  }
}
</script>