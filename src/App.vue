<template>
  <v-app>
    <v-content>
      <Contador/>
    </v-content>
  </v-app>
</template>

<script>
import Contador from './components/Contador'

export default {
  name: 'App',
  components: {
    Contador
  },
  data () {
    return {
      //
    }
  }
}
</script>
