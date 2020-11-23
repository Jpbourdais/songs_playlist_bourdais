<template>
    <v-list-item :value="music.id">
        <v-list-item-avatar>
            <v-img max-height="50px" max-width="50px" :alt="music.title" :src="music.cover" class="image cover"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{music.title}}</v-list-item-title>
            <v-list-item-subtitle>{{artist.name}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-icon :size="40" @click.stop="displayArtist(artist.id)">mdi mdi-information-outline</v-icon>
            <v-icon :size="40" @click.stop="addInQueue(music.id)">mdi mdi-skip-next-circle</v-icon>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import axios from "axios";
    const ARTISTS_API_ENDPOINT = 'http://localhost:3000/artists/';

    export default {
        name: "PlaylistItem",
        props: {
            music: Object,
        },
        data: function () {
            return {
                artist: {}
            };
        },
        methods: {
            displayArtist(idArtist) {
                this.$emit('changeSelectButton', 'information');
                this.$router.push({name: 'artist', params: { idArtist: idArtist }})
            },
            addInQueue(idMusic) {
                this.$emit('addInQueue', idMusic);
            }
        },
        async created() {
            let artist = await axios.get(ARTISTS_API_ENDPOINT+this.music.artist);
            let { data } = artist;
            this.artist = data;
        }
    };
</script>

<style scoped>
    .image.cover {
        width: 50px !important;
        object-fit: cover;
    }
    .v-list-item__action--stack {
        flex-direction: row;
    }
</style>