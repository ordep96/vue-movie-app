<template>
  <div class="content-form">
    <h2 class="content-form__title">SIGN UP</h2>
    <form class="form" @submit.prevent="signUpUser">
      <input class="form__field" type="email" name="email" placeholder="email" v-model="user.email"/>
      <input class="form__field" type="text" name="username" placeholder="username" v-model="user.username" />
      <input class="form__field" type="password" name="password" placeholder="password" v-model="user.password"/>
      <button class="button button--full form__button" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { signUp } from '@/helpers/auth'
import { avatarGenerate } from '@/helpers/image'
import { saveUserDatabase } from '@/helpers/database'

export default {
  name: 'formRegister',
  data: () => ({
    user: {
      email: '',
      username: '',
      password: ''
    }
  }),
  methods: {
    signUpUser () {
      signUp(this.user.email,this.user.password)
        .then(res => {
          res.user.updateProfile({
            displayName: this.user.username,
            photoURL: avatarGenerate()
          })
          saveUserDatabase(res.user, err => {
            if ( err ) {
              console.log(err)
            } else {
              this.$store.dispatch('fetchUser', res.user)
              this.$router.replace({name:'Home'})
            }
          })
        })
    }
  },
  mounted () {
    console.log(this.user)
  }
}
</script>