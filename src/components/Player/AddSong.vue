<template>
    <v-form ref="form" v-model="valid">
        <v-text-field v-model="title" :counter="50" label="Titre" required></v-text-field>
        <v-select v-model="artist" :items="items" label="Artiste"></v-select>
        <v-text-field v-model="cover" :counter="250" label="Couverture (URL)" required></v-text-field>
        <v-text-field v-model="music" :counter="250" label="Musique (URL)" required></v-text-field>
        <v-text-field v-model="description" :counter="1000" label="Description" required></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Ajouter une musique</v-btn>
    </v-form>
</template>

<script>
    import axios from "axios";
    const MUSICS_API_ENDPOINT = 'https://playlistsongs-8c2e7.firebaseio.com/musics';
    
    export default {
        name: "AddSong",
        props: {
            artistTab: Array,
            musicTab: Array
        },
        data: function () {
            return {
                valid: false,
                title: '',
                artist: 0,
                cover: '',
                music: '',
                description: '',
                items: []
            };
        },
        methods: {
            async validate() {
                let newid = this.musicTab.length++;
                let body = {
                    title: this.title,
                    artist: this.artist,
                    cover: this.cover,
                    music: this.music,
                    favorite: false,
                    description: this.description,
                    id: newid,
                }
                await axios.put(`${MUSICS_API_ENDPOINT}/${newid}.json`, body)
                this.$emit("refreshMusic");
            }
        },
        created() {
            let items = [];
            this.artistTab.forEach(element => items.push({text: element.name, value: element.id}));
            this.items = items;
        }
    };
</script>

<style scoped>
    .image.cover {
        width: 50px !important;
        object-fit: cover;
    }
</style>