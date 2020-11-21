<template>
    <v-form
        ref="form"
        v-model="valid"
    >
        <v-text-field
            v-model="title"
            :counter="50"
            label="Titre"
            required
        ></v-text-field>
        <v-text-field
            v-model="artist"
            :counter="30"
            label="Artiste"
            required
        ></v-text-field>
        <v-text-field
            v-model="cover"
            :counter="250"
            label="Couverture (URL)"
            required
        ></v-text-field>
        <v-text-field
            v-model="music"
            :counter="250"
            label="Musique (URL)"
            required
        ></v-text-field>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
            Ajouter une musique
        </v-btn>
    </v-form>
</template>

<script>
    import axios from "axios";
    const MUSICS_API_ENDPOINT = 'http://localhost:3000/musics/';

    export default {
        name: "AddSong",
        props: {
        },
        data: function () {
            return {
                valid: false,
                title: '',
                artist: '',
                cover: '',
                music: ''
            };
        },
        methods: {
            async validate() {
                let body = {
                    title: this.title,
                    artist: this.artist,
                    cover: this.cover,
                    music: this.music,
                    favorite: false,
                }
                await axios.post(`${MUSICS_API_ENDPOINT}`, body)
                this.$emit("refreshMusic");
            }
        },
        components: {
        },
        computed: {
        },
        created() {
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