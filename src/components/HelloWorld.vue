<template>
  <v-container>
    <PlayerPlaylist></PlayerPlaylist>
  </v-container>
</template>
<script>
  import PlayerPlaylist from "./Player/PlayerPlaylist";
  export default {
    name: "HelloWorld",
    props: {
    },
    data: function () {
      return {
      };
    },
    methods: {
    },
    components: {
      PlayerPlaylist
    },
    computed: {
    },
    watch: {
    },
  };
</script>
