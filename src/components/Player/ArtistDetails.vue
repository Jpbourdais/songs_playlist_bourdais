<template>
    <v-card :elevation="25" class="rounded-xl">
        <v-img class="img" :alt="artist.name" :src="artist.image"></v-img>
        <v-row class="justify-center">
            <v-col cols="12">
                <v-card-title>{{artist.name}}</v-card-title>
                <v-card-text>{{artist.description}}</v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import axios from "axios";
    const ARTISTS_API_ENDPOINT = 'http://localhost:3000/artists/';

    export default {
        name: "ArtistDetails",
        props: {
        },
        data: function () {
            return {
                artist: {},
            };
        },
        methods: {
        },
        components: {
        },
        computed: {
        },
        async created() {
            let artist = await axios.get(ARTISTS_API_ENDPOINT+this.$route.params.idArtist);
            let { data } = artist;
            this.artist = data;
        },
        watch: {
        },
    };
</script>

<style scoped>
    .image.cover {
        width: 50px !important;
        object-fit: cover;
    }
</style>