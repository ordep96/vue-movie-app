<template>
  <div>
    <formLogin />
  </div>
</template>

<script>
import formLogin from '@/components/forms/formLogin.vue'

export default {
  name: 'Login',
  components: {
    formLogin
  }
}
</script>