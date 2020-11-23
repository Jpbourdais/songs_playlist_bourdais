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
        }
    };
</script>

<style scoped>
    .img {
        transition: all .5s ease-in-out;
        filter: grayscale(0) brightness(60%);
    }
    .pause {
        filter: grayscale(1) brightness(80%);
    }
</style>