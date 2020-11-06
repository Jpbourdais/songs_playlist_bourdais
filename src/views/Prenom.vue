<template>
  <div class="prenom">
    <h1>Le prénom: {{ $route.params.prenom }}</h1>
    <v-btn @click="goComments">Charger les commentaires</v-btn>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Prenom',
  components: {
  },
  methods: {
    goComments() {
      if (this.$route.name != 'comments') {
        this.$router.push({name: 'comments',
        params: {prenom: this.$route.params.prenom}})
      }
    }
  }
}
</script>
