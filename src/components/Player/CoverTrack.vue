<template>
    <v-img height="100%" :class="isPlayed ? 'img' : 'img pause'" :alt="titleTrack" :src="coverTrack"></v-img>
</template>

<script>
    export default {
        name: "CoverTrack",
        props: {
            coverTrack: String,
            titleTrack: String,
            isPlayed: Boolean
        },
        data: function () {
            return {
            };
        },
        methods: {
        },
        components: {
        },
        computed: {
        },
        watch: {
        },
    };
</script>

<style scoped>
    .img {
        transition: all .5s ease-in-out;
    }
    .pause {
        filter: grayscale(1);
    }
</style>